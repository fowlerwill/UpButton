'use strict';

var timer,
    pause = 5000;

// The main program loop
window.onscroll = function () {

    if (timer) {
        window.clearTimeout(timer);
    }

    timer = window.setTimeout(function () {
        chrome.runtime.sendMessage({ scrollY: window.scrollY, url: window.location.href });
    }, pause);
};
//# sourceMappingURL=contentscript.js.map
