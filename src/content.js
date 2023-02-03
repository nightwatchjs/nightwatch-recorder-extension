(() => {
    const nwTooltip = createTooltip();
    //Explore mode is not the default mode
    var EXPLORE_MODE = false;
    //const tabID = getCurrentTabId();

    chrome.runtime.onMessage.addListener((msg, sender, response) => {
        const {from, action, content} = msg;

        switch (action) {
            case 'EXPLORE_MODE':
                setExploreMode(content);
                break;
        }
    });

    document.addEventListener('mouseover', function (e) {
        if (!EXPLORE_MODE) {
            return;
        }

        const element = e.target;
        highlightElement(element);
        const selectorList = generateSelectors(element);
        updateTooltipPosition(element, selectorList);
    });

    document.addEventListener('mouseout', function (e) {
        if (!EXPLORE_MODE) {
            return;
        }

        const element = e.target;
        clearHighlight(element);
        updateTooltipPosition();
    });

    document.addEventListener('click', function(e) {
        if (!EXPLORE_MODE) {
            return;
        }
        
        disableClick(e);
        var element = e.target;
        const selectorList = generateSelectors(element);

        chrome.runtime.sendMessage({
            from: 'contentJS',
            action: 'selector',
            content: selectorList
        });

    });

    function setExploreMode(value) {
        EXPLORE_MODE = value;
    }

    async function getCurrentTabId() {
        let queryOptions = { active: true, lastFocusedWindow: true };
        // `tab` will either be a `tabs.Tab` instance or `undefined`.
        let [tab] = await chrome.tabs.query(queryOptions);
        return tab;
    }

    function highlightElement(element) {
        // Adding css class to highlight the element
        element.classList.add('nw-highlight');
    }

    function clearHighlight(element) {
        element.classList.remove('nw-highlight');
    }

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