var I = require('1n1t');
var E = require('3x3c');
var async = require('async');
var updateNotifier = require('update-notifier');
var pkg = require('./package.json');
updateNotifier({pkg}).notify();

module.exports = function (message, branch) {
 return new Promise(function(resolve, reject) {
   I()
   .then((value) => {
     console.log(value);
     var commitBranch;
     if (branch) {
       commitBranch = branch;
     } else {
       commitBranch = value.trim();
     }
     E(`git add . && git commit -m "${message}" && git push origin "${commitBranch}"`)
       .then((value) => {resolve(value);})
       .catch((err) => {reject(err);})
   })
   .catch((err) => {reject(err);})
 });
}
