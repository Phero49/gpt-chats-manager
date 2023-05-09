// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks


import { bexContent } from 'quasar/wrappers'


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // Check if the request is the one you're expecting
  console.log("fhbhjhbcjhchjcshgh")
  if (request.type === "getchatgptDom") {
    // Access the data in the request
    const elements = request.data;
    // Do something with the elements
    console.log(elements);
  }
});

export default bexContent((bridge) => {
  bridge.on('i', ({ data, respond }) => {
    console.log('recived')
    const observer = new MutationObserver((mutations, observe) => {

      for (const mutation of mutations) {
        const { target } = mutation
        const getbtn = target.querySelector('div>.justify-center>button.relative')
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
    // observer.observe(document.body, { childList: true, subtree: true, })

  }

  )

  window.addEventListener("getchatgptDom", function (event) {
    // Check if the event is the one you're expecting
    console.log("oooooooo")
    if (event.data.type === "getchatgptDom") {
      // Access the data in the event
      const elements = event.data.data;
      // Do something with the elements
      console.log(elements);
    }
  })
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // Check if the request is the one you're expecting
    if (request.type === "getchatgptDom") {
      // Access the data in the request
      const elements = request.data;
      // Do something with the elements
      console.log(elements);
    }
  });








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
