'use strict';

console.log('\'Allo \'Allo! Content script');
var timer;

window.onscroll = function () {
    if (timer) {
        window.clearTimeout(timer);
        console.log('clearing!');
    }

    timer = window.setTimeout(function () {
        // actual callback
        console.log('Firing!');
    }, 1000);
};
//# sourceMappingURL=contentscript.js.map
