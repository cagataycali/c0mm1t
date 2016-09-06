var I = require('1n1t');
var E = require('3x3c');
var async = require('async');
var updateNotifier = require('update-notifier');
var pkg = require('./package.json');
updateNotifier({pkg}).notify();

module.exports = function (message) {
 return new Promise(function(resolve, reject) {
   I()
   .then((value) => {
     var premoji = '';
      E('git remote show origin')
        .then((value) => {
          if (value.indexOf('github.com') !== -1) {
            premoji = ':octocat: '
          }
          m4g1c(program.message, false)
            .then((emojis) => {
              E(`git add . && git commit -m "${premoji} ${message} ${emojis}" && git push origin "${value.trim()}"`)
                .then((value) => {resolve(value);})
                .catch((err) => {reject(err);})
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
