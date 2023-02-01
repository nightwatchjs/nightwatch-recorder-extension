(() => {
    const nwTooltip = createTooltip();
    chrome.runtime.onMessage.addListener((msg, sender, response) => {
        console.log(msg);
    });
    document.addEventListener('mouseover', function (e) {
        var element = e.target;
        element.classList.add('nw-highlight');
        const selectorList = generateSelectors(element);
        updateTooltipPosition(element, selectorList);
    });

    document.addEventListener('mouseout', function (e) {
        var element = e.target;
        element.classList.remove('nw-highlight');
        updateTooltipPosition();
    });

    document.addEventListener('click', function(e) {
        disableClick(e);
        var element = e.target;
        const selectorList = generateSelectors(element);
        // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //     chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
        //       console.log(response.farewell);
        //     });
        //  });
        chrome.runtime.sendMessage({
            from: 'content.js',
            subject: 'selector',
            value: selectorList
        });

    });
    function disableClick(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function generateSelectors(element) {
        // For now, only generating class names
        const id = element.getAttribute('class');
        return id;
    }

    function createTooltip() {
        //const eleCoordinates = element.getBoundingClientRect();
        const tooltip = document.createElement('span');
        tooltip.id = 'nw-tooltip';
        document.body.appendChild(tooltip);
        return tooltip;
    }

    function updateTooltipPosition(element = null, selectorValue = '') {
        if (element === null) {
            nwTooltip.style.top = '0px';
            nwTooltip.style.left = '0px';
            nwTooltip.textContent = '';
            return;
        }

        // TODO: Should check if tootltip position is out of window
        const rect = element.getBoundingClientRect();
        nwTooltip.style.top = rect.top + window.pageYOffset + 'px';
        nwTooltip.style.left = rect.right + window.pageXOffset + 10 + 'px';
        // removing css class which is added to highlight the text
        selectorValue = selectorValue.replace('nw-highlight', '');
        nwTooltip.textContent = selectorValue;
        return;
    }
    
})();