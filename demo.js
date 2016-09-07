var I = require('1n1t');
var E = require('3x3c');
var async = require('async');
var m4g1c = require('m4g1c');
var updateNotifier = require('update-notifier');
var pkg = require('./package.json');
updateNotifier({pkg}).notify();

module.exports = function (message) {
 return new Promise(function(resolve, reject) {
   I()
   .then((value) => {
     var premoji = '';
      E('git remote show origin')
        .then((origin) => {
          if (origin.indexOf('github.com') !== -1) {
            premoji = ':octocat: '
          }
          m4g1c(message, false)
            .then((emojis) => {
              
            })
            .catch((err) => {
              reject(err);
            })
        })
        .catch((err) => {
          reject(err);
        });
   })
   .catch((err) => {reject(err);})
 });
}
