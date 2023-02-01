(async() => {
    //console.log('hello')
    const selectorTable = document.getElementById('selectorTable');
    chrome.runtime.onMessage.addListener((msg, sender, response) => {
        // if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
        //   // Collect the necessary data. 
        //   // (For your specific requirements `document.querySelectorAll(...)`
        //   //  should be equivalent to jquery's `$(...)`.)
        //   var domInfo = {
        //     total: document.querySelectorAll('*').length,
        //     inputs: document.querySelectorAll('input').length,
        //     buttons: document.querySelectorAll('button').length,
        //   };
      
        //   // Directly respond to the sender (popup), 
        //   // through the specified callback.
        //   response(domInfo);
        // }
        console.log(msg);
    });

    // const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    // const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
    //     // do something with response here, not outside the function
    // console.log(response);

    function addRow() {

    }
})();