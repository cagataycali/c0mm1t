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
     console.log(value);
     E(`git add . && git commit -m "${message}" && git push origin "${value.trim()}"`)
       .then((value) => {resolve(value);})
       .catch((err) => {reject(err);})
   })
   .catch((err) => {reject(err);})
 });
}
