import { bexBackground } from 'quasar/wrappers'
import * as cheerio from "cheerio"
import { async } from 'pdfmake/build/pdfmake'
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

class db {

  constructor(collection) {
    this.collection = collection
  }

  //this method write to local storage

  async write(data) {
    //takes data then insert it
    const collection = {}
    collection[this.collection] = data

    await chrome.storage.local.set(collection)

  }

  async hasCollection() {
    //check if collection exist
    const collection = new Promise((resolve, reject) => {
      chrome.storage.local.get(this.collection, item => {
        if (item !== null || item != {}) {

          resolve(true)
        }
        else {

          resolve(false)


        }
      })
    })


    return await collection
  }

  async createCollection() {
    //create collection

    if (await this.hasCollection() == false) {
      const collectionObject = {};
      collectionObject[this.collection] = {}
      await chrome.storage.local.set(collectionObject)

      return true
    }

  }

  async InsertIntoCollection(key, data) {

    if (data != undefined) {

      if (await this.hasCollection()) {

        chrome.storage.local.get(this.collection, async (item) => {
          const collection = item[this.collection]
          const ob = {}
          ob[key] = data
          const collection2 = { ...ob, ...collection }
          console.log(collection2, 'col')
          await this.write(collection2)
          return true

        })
      }
      else {
        console.error('collection does not exist')
      }


    }
    else {
      return false
    }
  }

  async getFromCollection({ where, filed, start, limit, all }) {

    const promise = new Promise((resolve, reject) => {
      chrome.storage.local.get(this.collection, (item) => {

        if (all == false) {
          const collection = item[this.collection]
          if (collection != null) {
            const values = Object.values(collection)

            if (values.length > 0) {

              const slice = values.reverse().slice(start, limit)
              resolve(slice)
            }
            else {
              resolve([])
            }
          }
          else {
            resolve([])

          }




        }
        else {


          resolve(item[this.collection])

        }


      })
    })



    return await promise

  }

  getCollection() {
    chrome.storage.local.get(this.collection, (item) => {
      console.log(Object.values(item[this.collection]))
    })
  }

  async deletedITem(key) {
    var success = undefined
    chrome.storage.local.get(this.collection, (item) => {

      const collection = item[this.collection]
      if (collection[key] != undefined) {

        if (delete collection[key]) {
          this.write(collection)

        }
        else {
          success = false
        }

        success = true
      }
      else {
        success = false
      }

    })

    return success
  }

  async insertOutIndex(data) {
    chrome.storage.local.get(this.collection, (item) => {
      const col = item[this.collection]
      col[Object.keys(col).length] = data
      this.write(col)
    })
  }

  async cleardb() {
    await chrome.storage.local.remove(this.collection)
  }

}

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


  bridge.on('log', ({ data, respond }) => {
    console.log(`[BEX] ${data.message}`, ...(data.data || []))
    respond()
  })

  bridge.on('createCollection', async ({ data, respond }) => {
    const { colName } = data
    const date = Date.now()
    //get collections
    var col = await chrome.storage.local.get('collections')
    const colls = col['collections']
    //check if it not empty

    console.log(colls, colName)
    if (Object.values(col).length > 0) {
      const getName = colls[colName]
      //check if name already exist
      if (getName == undefined) {

        colls[colName] = { date: date, cols: [] }
        await chrome.storage.local.set(col)

        respond({ error: false, msg: "ok" })
      }
      else {

        respond({ error: true, msg: "name already exist" })
      }


    }
    else {

      const collection = {}
      collection[colName] = { date: date, cols: [] }

      await chrome.storage.local.set({ ['collections']: collection })
      respond({ error: false, msg: "ok" })

    }
  })

  bridge.on('getCollections', async ({ data, respond }) => {
    const { all } = data
    var col = await chrome.storage.local.get('collections')

    if (Object.values(col).length > 0) {
      const colls = col['collections']
      if (!all) {
        const keys = Object.keys(colls).slice(0, 3)
        respond(keys)
      }
      else {

        const keys = Object.keys(colls)
        respond(keys)

      }
    }

  })

  bridge.on('getCollectionItems', async ({ data, respond }) => {
    const { key } = data
    const getCollection = await chrome.storage.local.get('collections')
    const collection = getCollection['collections'][key]['cols']

    chrome.storage.local.get("chats", (items) => {

      var chats = []

      for (const iterator of collection) {
        const { date, url } = iterator['item']
        const collItem = items['chats'][date][url]
        chats.unshift(collItem)
      }

      console.log(chats)
      respond(chats)

    })

  })

  bridge.on('addTocollection', async ({ data, respond }) => {
    const { colName } = data
    const { colItem } = data
    const date = Date.now()
    //chrome.storage.local.remove('collections')
    //get collections
    const col = await chrome.storage.local.get('collections')
    //check if it not empty
    const coll = col['collections']
    if (Object.keys(col).length > 0) {
      console.log(colName)
      const getName = coll[colName]
      //check if name already exist
      console.log("hello therei", getName,)

      if (getName != undefined) {
        const collectionItems = coll[colName]['cols']
        var hasITem = false
        for (const iterator of collectionItems) {
          console.log(iterator)
          const { date, item } = iterator
          if (item.url == colItem.url) {
            hasITem = true
            break
          }

        }


        console.log(coll[colName]['cols'], hasITem)
        if (!hasITem) {
          coll[colName]['cols'].unshift({ item: { ...colItem }, date: date })
          chrome.storage.local.set({ ["collections"]: coll })
          respond({ error: false, msg: "ok" })

        }
        else {
          respond({ error: true, msg: "item already exist" })

        }
      }
      else {

        respond({ error: true, msg: "collection does not  exist" })
      }


    }
    else {

      const collection = {}
      collection[colName] = [{ item: colName, date: date }]

      chrome.storage.local.set({ ['collection']: collection })

    }
  })

  bridge.on("getSingleChat", ({ data, respond }) => {
    console.log("oo")
    const { key, date } = data
    chrome.storage.local.get("chats", (items) => {
      const value = items['chats'][date][key]
      console.log(value)
      respond(value)
    })
  })



  bridge.on("getChats", async ({ data, respond }) => {
    const { key, start, end, date } = data

    //  chrome.storage.local.clear()

    function groupData(dataArray) {

      const groupedChats = {}

      for (const chat of dataArray) {
        const { date } = chat
        const onlydate = new Date(date).toLocaleDateString()

        if (groupedChats[onlydate] == undefined) {
          groupedChats[onlydate] = [chat]

        }
        else {
          groupedChats[onlydate].unshift(chat)
        }

      }

      return groupedChats

    }


    const database = new db('my_chats')
    await database.createCollection()
    const query = { limit: 20, all: false, start: start }
    const results = await database.getFromCollection(query)
    console.log(groupData(results))

    respond(groupData(results))



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
    const { chatString } = data
    await chrome.storage.local.remove("recent")
    if (chatString != null) {
      chrome.storage.local.get("recent", (items) => {
        const recent = items['recent']

        if (recent != undefined) {
          const indexOf = recent.indexOf(chatString)
          console.log(indexOf, "pppppp")
          if (indexOf < 0) {
            const length = recent.unshift(chatString)
            if (length > 15) {
              recent.pop()
            }
            chrome.storage.local.set({ "recent": recent })

          }
          else {
            const item = recent.splice(indexOf, 1)
            recent.unshift(item[0])
            chrome.storage.local.set({ "recent": recent })


          }

          respond()



        }
        else {

          chrome.storage.local.set({ " recent": [chatString] })
          respond()

        }

      })
    }
    else {
      respond([])
    }




  })


  bridge.on("getRecent", ({ data, respond }) => {
    //get recent opened chats
    //chrome.storage.local.remove("recent")
    chrome.storage.local.get("recent", (items) => {
      console.log(items)
      respond(items["recent"])


    })


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
  bridge.on("saveChats", ({ data, respond }) => {

    //geting key and date from the saved item
    var date1 = data.date
    const url = data.url

    const date = new Date(date1).toLocaleDateString()


    if (url != undefined) {
      chrome.storage.local.get("chats", items => {

        if (Object.values(items).length > 0) {
          //check if chats are empty  

          const getChatByDate = Object.keys(items['chats']).includes(date)
          console.log(getChatByDate, "has date")
          if (getChatByDate) {

            //check if there are chats for the dete
            console.log(url)
            items['chats'][date][url] = data
            console.log(items['chats'], "chats")
            // items['chats'][date] = { ...{ url: key, data: data }, ...items['chats'][date] }
            chrome.storage.local.set({ "chats": items['chats'] })

          }
          else {
            //if no chats for the date

            items['chats'][date] = {}
            items['chats'][date][url] = data

            chrome.storage.local.set(items)

          }


        }
        else {
          const chats = { "chats": {} };
          chats['chats'][date] = {};
          chats['chats'][date][url] = data
          chrome.storage.local.set(chats);
          console.log(chats, "no chtas")
        }
        respond(true)
      })
    }
    else {
      respond(false)
    }


  })
  // Usage:
  // await bridge.send('storage.set', { key: 'someKey', value: 'someValue' })



})
