var connections = {};

chrome.runtime.onConnect.addListener(function (port) {

    var extensionListener = function (message, sender, sendResponse) {
        // The original connection event doesn't include the tab ID of the
        // DevTools page, so we need to send it explicitly.
        if (message.action == "init") {
          connections[message.tabId] = port;
          return;
        }
        else {
            // Send all messages recieved from devtools to content js
            chrome.tabs.sendMessage(message.tabId, message, sendResponse);
        }
    }

    // Listen to messages sent from the DevTools page
    port.onMessage.addListener(extensionListener);
});