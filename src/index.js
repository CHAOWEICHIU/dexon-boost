// require('es6-shim')
var DSolc = require('./browser-dsolc')

var domIsReady = (function(domIsReady) {
  var isBrowserIeOrNot = function() {
    return (!document.attachEvent || typeof document.attachEvent === 'undefined' ? 'not-ie' : 'ie')
  }

  domIsReady = function(callback) {
    if(callback && typeof callback === 'function'){
      if(isBrowserIeOrNot() !== 'ie') {
        document.addEventListener('DOMContentLoaded', function() {
          return callback()
        })
      } else {
        document.attachEvent('onreadystatechange', function() {
          if(document.readyState === 'complete') {
            return callback()
          }
        })
      }
    } else {
      console.error('The callback is not a function!')
    }
  }

  return domIsReady
})(domIsReady || {});

(function(document, window, domIsReady, undefined) {
  domIsReady(function() {
    window.BrowserDSolc = DSolc
  })
})(document, window, domIsReady)
