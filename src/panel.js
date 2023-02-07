(() => {
    //console.log('hello')
    const selectorTable = document.getElementById('selectorTable');
    const tabID = chrome.devtools.inspectedWindow.tabId;
    let numberOfRows = 0;

    const backgroundPageConnection = chrome.runtime.connect({
        name: "devtools-page"
    });

    //Establishing connention with background.js
    sendMessageToBackground('init');

    // backgroundPageConnection.onMessage.addListener(function (message) {
    //     // Handle responses from the background page, if any
    // });

    chrome.runtime.onMessage.addListener((msg, sender, response) => {
        const {from, action, content} = msg;

        if (sender.tab.id === tabID && from === 'contentJS') {
            switch (action) {
                case 'selector':
                    addRow(content);
                    break;
            }
        }
    });

    document.querySelector('#exploreMode').addEventListener('click', function(e) {
        const checkBox = e.target;
        if (checkBox.checked){
            sendMessageToBackground('EXPLORE_MODE', true);
        } else {
            sendMessageToBackground('EXPLORE_MODE', false);
        }
    });

    function sendMessageToContentJS(action = null, content = null) {
        chrome.runtime.sendMessage({
            from: 'devtools',
            action: action,
            content: content
        });
    }

    function sendMessageToBackground(action = null, content = null) {
        backgroundPageConnection.postMessage({
            tabId: chrome.devtools.inspectedWindow.tabId,
            action: action,
            content: content
        });
        //chrome.runtime.sendMessage({'hello': 'hello'});

    }
    //Add row to table in panel.html
    function addRow(selector) {
        numberOfRows++;
        const id = `table-row`;
        const tbody = selectorTable.getElementsByTagName('tbody')[0];
        const newRow = tbody.insertRow(0);
        const timestamp = new Date().toLocaleString();
        
        const highlightButton = document.createElement('button');
        highlightButton.appendChild(document.createTextNode('Highlight'));
        highlightButton.addEventListener('click', clickOnHighlight);

        const copyButton = document.createElement('button');
        copyButton.appendChild(document.createTextNode('Copy'));
        copyButton.addEventListener('click', clickOnCopy);

        var newCell = newRow.insertCell();
        newCell.appendChild(document.createTextNode(selector));

        newCell = newRow.insertCell();
        newCell.appendChild(document.createTextNode(timestamp));

        newCell = newRow.insertCell();
        newCell.appendChild(highlightButton);
        newCell.appendChild(copyButton);
        
    }
    function getSelectorFromFirstCell(e) {
        const targetElement = e.target.parentElement.parentElement.firstElementChild;
        return targetElement.textContent;
    }

    function clickOnHighlight(e) {
        const selectorValue = getSelectorFromFirstCell(e);
        sendMessageToBackground('highlightSelector', selectorValue);
    }

    function clickOnCopy(e) {
        const selectorValue = getSelectorFromFirstCell(e);
        // TODO: clipboard API not working. Need to figure out other way to copy
        //sendMessageToBackground('copyToClipboard', selectorValue);
        //chrome.clipboard.writeText(selectorValue);
    }
})();