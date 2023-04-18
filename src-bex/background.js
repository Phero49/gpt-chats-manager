import { bexBackground } from 'quasar/wrappers'
import * as cheerio from "cheerio"
var tabId = null
chrome.runtime.onInstalled.addListener(() => {
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
              /*            // Create an observer instance
                          const observer = new MutationObserver(function (mutationsList, observer) {
              
                            // Iterate over the mutations
                            for (let mutation of mutationsList) {
                              console.log(mutation)
                              // Check if the target element is now available
                          
              
                            }
                          });
              
              */

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





              // Options for the observer (which mutations to observe)
              //  const config = { childList: true, subtree: true };

              // Start observing the target node for configured mutations
              //  observer.observe(targetNode, config);


            }
          }, 1000)
        },
        //  injectImmediately: true
      })
      //  console.log("okk opened", tab.status)
      // Tab opened.
    })
  })
})




export default bexBackground((bridge /* , allActiveConnections */) => {


  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request)
    if (sender.origin === "https://chat.openai.com") {
      console.log("all good")
      const title = sender.tab.title
      const chat_url = sender.url
      const chat_data = request.data
      var req = []
      var groups = []
      var chatData = []
      for (let index = 0; index < chat_data.length; index++) {

        const element = chat_data[index];
        if ((index + 1) % 2 !== 0) {

          const headings = `<div class="itemCount-${index + 1}" style="font-weight:bold;"> <br/> ${element} </br><br/> </div>`
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



  bridge.on('getTime', ({ respond }) => {
    respond(Date.now())
  })

  bridge.on('storage.get', ({ data, respond }) => {
    const { key, all, date } = data

    if (key === null) {
      chrome.storage.local.get(null, items => {
        // Group the values up into an array to take advantage of the bridge's chunk splitting.
        console.log(items, "item")
        const today = new Date().getDate()
        var chats = []

        for (const chat of Object.values(items)) {
          const chatDate = new Date(chat.date).getDate()
          console.log(date,)
          if (date === chatDate) {
            chats.push(chat)
          }
        }

        respond(chats)
      })
    } else {
      chrome.storage.local.get([key], items => {
        respond(items[key])
      })
    }
  })



  // Usage:
  // const { data } = await bridge.send('storage.get', { key: 'someKey' })

  bridge.on('storage.set', ({ data, respond }) => {
    console.log(data)
    chrome.storage.local.set({ [data.key]: data.value }, () => {
      respond()
      console.log("saved")
    })
  })
  // Usage:
  // await bridge.send('storage.set', { key: 'someKey', value: 'someValue' })

  bridge.on('storage.remove', ({ data, respond }) => {
    console.log(data, "delete")
    chrome.storage.local.remove(data.key, () => {
      respond(true)
    })
  })
  // Usage: 
  // await bridge.send('storage.remove', { key: 'someKey' })

  /*
  // EXAMPLES
  // Listen to a message from the client
  bridge.on('test', d => {
    console.log(d)
  })

  // Send a message to the client based on something happening.
  chrome.tabs.onCreated.addListener(tab => {
    bridge.send('browserTabCreated', { tab })
  })

  // Send a message to the client based on something happening.
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      bridge.send('browserTabUpdated', { tab, changeInfo })
    }
  })
   */
})
