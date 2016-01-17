'use strict';

var upButton = (function () {
	var btn = {},
		warehouse = {};
    
    /**
     * initialize recording of url in warehouse
     */
    function _addToWarehouse(url) {
        if (warehouse[url] === undefined) {
            warehouse[url] = { stack: [0], index: 0 };
        }
        return;
    }
    
    /**
     * detect if height is too close to existing values in stack
     */
    function _isAlreadyInStack(height, url) {
        for (var i = 0; i < warehouse[url].stack.length; i++) {
            if (height > warehouse[url].stack[i] - 100 && height < warehouse[url].stack[i] + 100) {
                return true;
            }
        }
        return false;
    }

    /**
     * Add the height at url to the location stack
     */
    btn.addLocation = function (height, url) {
        _addToWarehouse(url);
        if (!_isAlreadyInStack(height, url)) {
            warehouse[url].stack.push(height);
            warehouse[url].index = warehouse[url].stack.length - 1;
            return true;
        }
        return false;
    };
    
    /**
     * log the warehouse
     */
    btn.log = function() {
        console.table(warehouse);
    };
    
    /**
     * Returns the last height from the stack at the url
     */
    btn.getPrevHeight = function(url) {
        _addToWarehouse(url);
        warehouse[url].index--;
        var scrollTo = warehouse[url].stack[Math.abs(warehouse[url].index) % warehouse[url].stack.length];
        return scrollTo;
    };

	return btn;
}());

/**
 * log the version
 */
chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

/**
 * add click listener to the button click
 */
chrome.browserAction.onClicked.addListener(function(tab) {
    var height = upButton.getPrevHeight(tab.url);
    chrome.tabs.executeScript({
        code: 'window.scroll(0,'+height+');'
    });
});

/**
 * listen for messages from content script
 */
chrome.runtime.onMessage.addListener(
  function(request) {
    if (request.scrollY) {
        if (upButton.addLocation(request.scrollY, request.url)) {
            chrome.browserAction.setBadgeText({text: '+'});
            window.setTimeout(function(){
                chrome.browserAction.setBadgeText({text: ''});
            }, 750);
        }
    }
  });
