import { bexBackground } from 'quasar/wrappers'
import * as cheerio from "cheerio"
import { db, myCollections } from "./db"


chrome.runtime.onInstalled.addListener(() => {
  //creating all needed collections  for the extension
  const keys = Object.keys(myCollections)
  keys.forEach(async (key) => {
    const database = new db(myCollections[key])
    await database.createCollection()

  })

})
chrome.action.onClicked.addListener((tab) => {
  // Opens our extension in a new browser window.
  // Only if a popup isn't defined in the manifest.
  chrome.tabs.create({
    url: chrome.runtime.getURL('www/index.html')
  }, (/* newTab */) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      func: () => {
        //dont remove the time out i dont know what it does but  the code breaks without  it 
        setTimeout(() => {
          const divGroup = document.querySelector('div.group')
          if (divGroup) {


            const element = document.querySelector('div.group');
            if (element) {
              //

              const elements = document.querySelectorAll(".flex-grow.flex-col.gap-3")
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


  chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    try {
      const regex = new RegExp("https://chat\\.openai\\.com/c/[a-zA-Z0-9-]+");



      if (
        sender.origin === "https://chat.openai.com" &&
        regex.test(sender.url) &&
        sender.url.includes("?model=text-davinci-002-render-sha") === false
      ) {
        const title = sender.tab.title
        const chat_url = sender.tab.url
        const chat_data = request.data
        var askedQuestions = []
        var groups = []
        var chatData = []
        for (let index = 0; index < chat_data.length; index++) {

          const chatgptResponse = chat_data[index];

          if ((index + 1) % 2 !== 0) {
            var $ = cheerio.load(chatgptResponse)
            var text = $.root().text()
            const quation = `<div class="question itemCount-${index + 1}" style="font-weight:bold;font-size:18px;"> <p> ${text} <p> </div>`
            groups.push(quation)
            askedQuestions.push(text)
          }

          else {
            groups.push(`<div class="response  itemCount-${index + 1}"> ${chatgptResponse} </div>`)

          }

          if (groups.length >= 2) {
            const group = `<div id="group-${index - 1}"> ${groups.join("")} </div>`

            chatData.push(group)
            groups = []
          }
        }

        await bridge.send("get_chat", { askedQuestions: askedQuestions, chat: chatData, title: title, chat_url: chat_url })
        sendResponse(true)
      }
      else {
        await bridge.send("get_chat", null)
      }
    } catch (error) {
      await bridge.send("get_chat", null)

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

  bridge.on('exportdb', async ({ respond }) => {
    const database = new db()
    const json = await database.exportdb()

    respond(json)

  })

  bridge.on('getCollections', async ({ data, respond }) => {
    const { all } = data
    const database = new db(myCollections.folders)
    const query = { all: true, object: true }
    const results = await database.getMany(query)
    // console.log(results, 'jjjj')
    if (all) {


      respond(Object.keys(results))

    }
    else {

      if (results != null) {
        const first4 = Object.keys(results).slice(0, 4)
        respond(first4)
      }
      else {
        respond([])
      }

    }







  })

  bridge.on('getCollectionItems', async ({ data, respond }) => {
    const { key } = data
    const database = new db(myCollections.folders)
    const results = await database.getOne(key)
    respond(results)

  })


  bridge.on('addTocollection', async ({ data, respond }) => {
    const { collectionName } = data
    const { itemData } = data
    const { key } = itemData

    const database = new db(myCollections.folders)
    const folder = await database.getOne(collectionName)

    delete itemData['key']
    folder[key] = itemData

    await database.InsertIntoCollection(collectionName, folder)

    respond(true)

  })

  bridge.on('deleteCollection', async ({ data, respond }) => {
    const { key } = data
    const database = new db(myCollections.folders)
    await database.deletedITem(key)
    respond(true)

  })
  bridge.on('deletedb', async ({ respond }) => {

    await db.clear()
    respond(true)
  })

  bridge.on("getSingleChat", async ({ data, respond }) => {

    const database = new db('my_chats')
    const { key } = data
    const results = await database.getOne(key)
    respond(results)

  })



  bridge.on("getChats", async ({ respond }) => {

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
    //console.log(results, 'jjjjd')
    const groupedData = groupData(results)





    respond(groupedData)

  })

  // eslint-disable-next-line no-unused-vars
  function removeFromCollection(date, url) {


  }

  bridge.on("removeFromCollection", async ({ data, respond }) => {
    const { collectionName, url } = data
    const database = new db(myCollections.folders)
    const collection = await database.getOne(collectionName)
    if (collection != null) {
      delete collection[url]
      await database.InsertIntoCollection(collectionName, collection)
      respond(true)
    }
    respond(false)

  })

  bridge.on("addToRecent", async ({ data, respond }) => {
    const { key, label } = data
    const database = new db(myCollections.recent)
    database.createCollection()
    await database.InsertIntoCollection(key, label, 20)
    respond(true)

  })


  bridge.on("getRecent", async ({ respond }) => {

    const database = new db(myCollections.recent)
    const query = { all: true, object: true }
    const results = await database.getMany(query)
    respond(results)


  })



  bridge.on("removeChat", async ({ data, respond }) => {
    const { url } = data
    const database = new db(myCollections.my_chats)
    const item = await database.getOne(url)

    const associatedCollections = item["associatedCollections"]
    Array.from(associatedCollections).forEach(async (value) => {
      await bridge.send("removeFromCollection", { collectionName: value, url: item['url'] })

    })

    const results = await database.deletedITem(url)

    if (results) {
      respond(results)
    }
    else {
      respond(false)
    }

  })
  bridge.on("saveChats", async ({ data, respond }) => {
    const { key, content } = data
    //geting key and date from the saved item

    const database = new db(myCollections.my_chats)


    if (key != undefined) {

      await database.InsertIntoCollection(key, content)
      respond(true)

    }
    else {
      respond(false)
    }


  })
  // Usage:
  // await bridge.send('storage.set', { key: 'someKey', value: 'someValue' })



})
