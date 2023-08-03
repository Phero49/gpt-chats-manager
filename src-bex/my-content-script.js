// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks


import { bexContent } from 'quasar/wrappers'



export default bexContent((bridge) => {





  const exportBtn = () => {

    setTimeout(async () => {
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

          // const myEvent = new CustomEvent('getc', { detail: elementString });
          //   window.postMessage({ type: 'extensionMessage', data: elementString }, "chrome-extension://egjakmceolbbhbmncmdldkaopgnieahm")
          //  await chrome.runtime.sendMessage(getExtensionId(), { data: elementString })
          chrome.runtime.connect()
          const sender = {
            origin: window.location.origin,
            url: window.location.href,
            title: document.title
          }
          bridge.send("ok", { sender: sender, messege: elementString })

        }





      }
    }, 1000)

  }


  const observer = new MutationObserver((mutations) => {




    const customBtn = document.body.querySelector('#exportchat')
    if (customBtn != null) {

      observer.disconnect()
      customBtn.addEventListener('click', () => {
        exportBtn()
      })
      //console.log(customBtn.click())

    }
    else {
      observer.observe(document.body, { childList: true, subtree: true, })
    }

    for (const mutation of mutations) {
      const { target } = mutation
      const getbtn = target.querySelector('.border-t')

      if (getbtn != null) {

        if (getbtn.parentElement != null || getbtn.parentElement != undefined) {
          if (customBtn === null) {
            let btn = `<button id="exportchat" style="
            color:white;
            background: #0052D4;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #6FB1FC, #4364F7, #0052D4);  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #6FB1FC, #4364F7, #0052D4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                        
            "              class="btn bg-primary ml-4 relative text-white btn-neutral border-0 md:border">
      Export chat
    </button>`
            const parser = new DOMParser()

            const parsedEl = parser.parseFromString(btn, 'text/html')



            getbtn.parentElement.appendChild(parsedEl.querySelector("button"))

            break
          }

        }

      }


    }



  })


  observer.observe(document.body, { childList: true, subtree: true, })
  // Hook into the bridge to listen for events sent from the client BEX.
  /*
  bridge.on('some.event', event => {
    if (event.data.yourProp) {
      // Access a DOM element from here.
      // Document in this instance is the underlying website the contentScript runs on
      const el = document.getElementById('some-id')
      if (el) {
        el.value = 'Quasar Rocks!'
      }
    }
  })
  */
})
