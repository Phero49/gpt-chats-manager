// Hooks added here have a bridge allowing communication between the Web Page and the BEX Content Script.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/dom-hooks
import { bexDom } from 'quasar/wrappers'

export default bexDom((bridge) => {

  //this function exports the chat
  const exportBtn = () => {
    const divGroup = document.querySelector('div.group')
    if (divGroup) {
      // Select the target node


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
        chrome.runtime.sendMessage('gptchatsmanager', { data: elementString })



      }


    }

  }

  const observer = new MutationObserver((mutations, observe) => {





    for (const mutation of mutations) {
      const { target } = mutation
      const getbtn = target.querySelector('.border-t')
      const customBtn = document.body.querySelector('#exportchat')
      if (getbtn != null) {
        if (getbtn.parentElement != null || getbtn.parentElement != undefined) {
          if (customBtn === null) {
            let btn = `<button id="exportchat" class="btn ml-4 relative text-green btn-neutral border-0 md:border">
      Export chat
    </button>`
            const parser = new DOMParser()
            const parsedEl = parser.parseFromString(btn, 'text/html')
            parsedEl.addEventListener('click', () => {
              //func()
            })
            getbtn.parentElement.appendChild(parsedEl.querySelector("button"))


            break
          }

        }

      }


    }



  })


  observer.observe(document.body, { childList: true, subtree: true, })
  /*
  bridge.send('message.to.quasar', {
    worked: true
  })
  */
})
