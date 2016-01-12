'use strict';

console.log('\'Allo \'Allo! Content script');
var timer;

window.onscroll = function() {
    if(timer) {
        window.clearTimeout(timer);
    }

    timer = window.setTimeout(function() {
        // actual callback
        console.log( 'Firing!' );
    }, 3000);
};