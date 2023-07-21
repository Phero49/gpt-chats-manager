import { bexBackground } from 'quasar/wrappers'
import * as cheerio from "cheerio"
import { db, myCollections } from "./db"
var tabId = null
chrome.runtime.onInstalled.addListener(() => {

})
chrome.action.onClicked.addListener((tab) => {
  // Opens our extension in a new browser window.
  // Only if a popup isn't defined in the manifest.
  chrome.tabs.create({
    url: chrome.runtime.getURL('www/index.html')
  }, (/* newTab */) => {
    tabId = tab.id
    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      func: () => {
        setTimeout(() => {
          const el = document.querySelector("body")
          const divGroup = document.querySelector('div.group')
          if (divGroup) {
            // Select the target node
            const targetNode = document.body;
            var chatLength = 0

            var chat = { "request": [], "response": [] }
            var currentEl = null


            const element = document.querySelector('div.group');
            if (element) {
              //

              const elements = document.querySelectorAll("div.flex.flex-col.items-start.gap-4")
              var elementString = []

              elements.forEach((el) => {
                elementString.push(el.innerHTML)
              })

              //     const myEvent = new CustomEvent('getc', { detail: elementString });
              window.postMessage({ type: "g", data: elementString }, "*")
              chrome.runtime.sendMessage({ data: elementString })

              // console.log(elementString, "sent")


            }


          }
        }, 1000)
      },
      //  injectImmediately: true
    })
    //  console.log("okk opened", tab.status)
    // Tab opened.
  })
})


export default bexBackground((bridge /* , allActiveConnections */) => {

  chrome.tabs.onUpdated.addListener((tabId, chanfe_info) => {
    bridge.send('has_updated')
    console.log('updated')
  })

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request, sender, "kkkkkkkpppp")
    if (sender.origin === "https://chat.openai.com" && sender.url.match("https://chat.openai.com/c/+").length > 0 && sender.url.includes('?model=text-davinci-002-render-sha') == false) {
      console.log("sender", sender.url)
      const title = sender.tab.title
      const chat_url = sender.tab.url
      const chat_data = request.data
      var req = []
      var groups = []
      var chatData = []
      for (let index = 0; index < chat_data.length; index++) {

        const element = chat_data[index];
        if ((index + 1) % 2 !== 0) {

          const headings = `<div class="itemCount-${index + 1}" style="font-weight:bold;font-size:18px;"> <p> ${element} <p> </div>`
          groups.push(headings)
          req.push(element)
        }
        else {
          groups.push(`<div class="itemCount-${index + 1}"> ${element} </div>`)

        }

        if (groups.length >= 2) {
          const group = `<div id="group-${index - 1}"> ${groups.join("")} </div>`
          chatData.push(group)
          groups = []
        }
      }

      bridge.send("get_chat", { req: req, chat: chatData, title: title, chat_url: chat_url })
      sendResponse()
    }
  });


  bridge.on('createCollection', async ({ data, respond }) => {
    const { collectionName } = data
    const database = new db(myCollections.folders)
    await database.createCollection()

    const res1 = await database.getOne(collectionName)
    if (res1 != null) {

      respond({ error: true, msg: "collection already exist" })

    }
    else {

      await database.InsertIntoCollection(collectionName, {})

      respond({ error: false, msg: "ok" })

    }

  })

  bridge.on('exportdb', async ({ data, respond }) => {
    const database = new db()
    const json = await database.exportdb()

    respond(json)

  })

  bridge.on('getCollections', async ({ data, respond }) => {
    const { all } = data
    const database = new db(myCollections.folders)
    const query = { all: true, object: true }
    const results = await database.getMany(query)
    if (all) {


      respond(Object.keys(results))

    }
    else {

      const first4 = Object.keys(results).slice(0, 4)
      respond(first4)

    }







  })

  bridge.on('getCollectionItems', async ({ data, respond }) => {
    const { key } = data
    const database = new db(myCollections.folders)
    const results = await database.getOne(key)
    console.log(results)
    respond(results)

  })


  bridge.on('addTocollection', async ({ data, respond }) => {
    const { collectionName } = data
    const { itemData } = data
    const { key } = itemData

    const database = new db(myCollections.folders)
    const folder = await database.getOne(collectionName)
    console.log(folder)
    delete itemData['key']
    folder[key] = itemData

    await database.InsertIntoCollection(collectionName, folder)
    console.log(folder, key)
    respond(true)

  })

  bridge.on('deleteCollection', async ({ data, respond }) => {
    const { key } = data
    const database = new db(myCollections.folders)
    await database.deletedITem(key)
    respond(true)

  })

  bridge.on("getSingleChat", async ({ data, respond }) => {
    const database = new db('my_chats')
    const { key } = data
    const results = await database.getOne(key)
    respond(results)

  })



  bridge.on("getChats", async ({ data, respond }) => {
    const { key, start, end, date } = data

    function groupData(dataArray) {
      // Create an empty object to hold the grouped chats
      const groupedChats = {};

      // Iterate over each chat in the dataArray
      for (const chat of dataArray) {
        // Extract the date from the chat object
        const { date } = chat;

        // Convert the date to a localized string representing only the date (without the time)
        const onlydate = new Date(date).toLocaleDateString();

        // Check if a group with the same date already exists in groupedChats
        if (groupedChats[onlydate] == undefined) {
          // If the group doesn't exist, create a new group with the chat
          groupedChats[onlydate] = [chat];
        } else {
          // If the group already exists, add the chat to the existing group
          groupedChats[onlydate].push(chat);
        }
      }

      // Return the object containing the grouped chats
      return groupedChats;
    }


    const database = new db('my_chats')
    await database.createCollection()
    const query = { limit: 100, all: true, start: 0 }
    //fetch raw chats
    const results = await database.getMany(query)
    //group chats
    const groupedData = groupData(results)

    const keys = Object.keys(groupedData).sort((a, b) => {
      const date1 = new Date(a).getTime();
      const date2 = new Date(b).getTime();

      return date2 - date2;
    });

    console.log(keys)


    respond(groupedData)

  })

  function removeFromCollection(date, url, colName) {
    chrome.storage.local.get("collections", (item) => {
      const collection = item['collections']
      if (collection != undefined) {
        for (const key of Object.keys(collection)) {
          const { date, cols } = collection[key]
          for (let index = 0; index < cols.length; index++) {
            const { item } = cols[index]
            const { url2 } = item
            if (url === url2) {
              collection[key]['cols'].splice(index, 1)



            }
          }

        }
        chrome.storage.local.set({ "collections": collection })

      }



    })
  }

  bridge.on("addToRecent", async ({ data, respond }) => {
    const { key, label } = data
    const database = new db(myCollections.recent)
    database.createCollection()
    await database.InsertIntoCollection(key, label, 20)

  })


  bridge.on("getRecent", async ({ data, respond }) => {

    const database = new db(myCollections.recent)
    const query = { all: true, object: true }
    const results = await database.getMany(query)
    respond(results)


  })


  bridge.on("removeFromcollection", ({ data, respond }) => {

  })
  bridge.on("removeChat", ({ data, respond }) => {
    const { date, url } = data
    chrome.storage.local.get("chats", async (items) => {
      var chats = items['chats'][date]
      const deleted = delete chats[url]
      if (deleted) {

        const chatsBydate = {}
        chatsBydate[date] = chats
        console.log(chatsBydate, { "chats": chatsBydate })
        await chrome.storage.local.set({ "chats": chatsBydate })
        respond(true)
        removeFromCollection(url)

      }
    })

  })
  bridge.on("saveChats", async ({ data, respond }) => {
    const { key, content } = data
    //geting key and date from the saved item

    const database = new db(myCollections.my_chats)


    if (key != undefined) {

      await database.InsertIntoCollection(key, content)

    }
    else {
      respond(false)
    }


  })
  // Usage:
  // await bridge.send('storage.set', { key: 'someKey', value: 'someValue' })



})
