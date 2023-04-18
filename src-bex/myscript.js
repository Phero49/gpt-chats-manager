// Select the target node
const targetNode = document.body;

// Create an observer instance
const observer = new MutationObserver(function(mutationsList, observer) {
  // Iterate over the mutations
  for(let mutation of mutationsList) {
    // Check if the target element is now available
    const element = document.querySelector('#target-element');
    if(element) {
      console.log('Target element is now available');
      observer.disconnect();
      break;
    }
  }
});

// Options for the observer (which mutations to observe)
const config = { childList: true, subtree: true };

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
