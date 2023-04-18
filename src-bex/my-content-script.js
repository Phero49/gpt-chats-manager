// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks


import { bexContent } from 'quasar/wrappers'
window.addEventListener("getchatgptDom", function (event) {
  // Check if the event is the one you're expecting
  console.log("oooooooo")
  if (event.data.type === "getchatgptDom") {
    // Access the data in the event
    const elements = event.data.data;
    // Do something with the elements
    console.log(elements);
  }
});
console.log("mycont")
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
