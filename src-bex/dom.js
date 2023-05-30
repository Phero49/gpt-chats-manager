// Hooks added here have a bridge allowing communication between the Web Page and the BEX Content Script.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/dom-hooks
import { bexDom } from 'quasar/wrappers'

export default bexDom((bridge) => {

  bridge.on('has_updated', ({ data, respond }) => {
    console.log('hello world')

  })

  const observer = new MutationObserver((mutations, observe) => {

    for (const mutation of mutations) {
      const { target } = mutation
      const getbtn = target.querySelector('.border-t')
      console.log(getbtn)
      if (getbtn != null) {
        if (getbtn.parentElement != null || getbtn.parentElement != undefined) {
          observe.disconnect()
          let btn = `<button id="exportchat" class="btn ml-4 relative text-green btn-neutral border-0 md:border">
      Export chat
    </button>`
          const parser = new DOMParser()
          const parsedEl = parser.parseFromString(btn, 'text/html')
          getbtn.parentElement.appendChild(parsedEl.querySelector("button"))
          console.log(getbtn.parentElement)
          document.querySelector("#exportchat").addEventListener('click', () => {
            getChat()
            console.log('export')
          })

          break
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
