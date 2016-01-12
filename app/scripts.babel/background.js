'use strict';

var locationStack = [0],
    locationIndex = 0;

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.onClicked.addListener(function(tab) {
  var height = 0;
  locationIndex--;
  height = locationStack[Math.abs(locationIndex) % locationStack.length];
  console.log('going to: ' + height + ' locationindex: ' + locationIndex + ' modindex: ' + (Math.abs(locationIndex) % locationStack.length));
  console.log(locationStack);
  console.log(tab);
  chrome.tabs.executeScript({
    code: 'window.scroll(0,'+height+');'
  });
});

chrome.runtime.onMessage.addListener(
  function(request) {
    if (request.scrollY) {
        //commit to locationstack
        locationStack.push(request.scrollY);
        locationIndex = locationStack.length;
        chrome.browserAction.setBadgeText({text: '' + locationIndex});
    }
  });