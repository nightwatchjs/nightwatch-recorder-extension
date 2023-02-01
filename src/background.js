var ws = new WebSocket('ws://localhost:8088');

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status === "complete") {
//     ws.send(tab.url);
//   }
// });
chrome.runtime.onMessage.addListener((msg, sender) => {
    // First, validate the message's structure.
    console.log(msg);
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //         chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    //           console.log(response.farewell);
    //     });
    //  });
});
