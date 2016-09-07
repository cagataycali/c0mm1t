var async = require('async');
var E = require('3x3c');
var m4g1c = require('m4g1c');
var I = require('1n1t');
var colors = require('colors');
var updateNotifier = require('update-notifier');
var pkg = require('./package.json');
var emoji = require('node-emoji');
updateNotifier({pkg}).notify();

function log(message) {
  console.log(emoji.emojify(':zap:'), colors.cyan(message));
}

function errorLog(message) {
  console.log(emoji.emojify(':shit:'), colors.red(message));
}

function add(message, callback) {
  E('git add .')
    .then((output) => {
      callback(null, message);
    }).catch((err) => {
      errorLog(err);
      callback(err, null);
    })
}

function commit(message, callback) {
  m4g1c(message, false)
    .then((emojis) => {
      log(`Your awesome commit message: ${colors.green(message) + ' ' + emoji.emojify(emojis)}`)
      E(`git commit -m "${message}"`)
        .then((output) => {
          callback(null, message);
        })
        .catch((err) => {errorLog(err);callback(err, null);})
    })
    .catch((err) => {errorLog(err);callback(err, null);})
}

function getCurrentBranch(message, callback) {
  I()
  .then((branch) => {
     callback(null, branch)
  }).catch((err) => {errorLog(err);callback(err);})
}

function push(branch, callback) {
  log(`You are pushing as: ${colors.green(branch.trim())}`);
  E(`git push origin "${branch.trim()}"`)
    .then((output) => {callback(null, branch)})
    .catch((err) => {errorLog(err);callback(err, null);})
}

module.exports = function (message) {
 return new Promise(function(resolve, reject) {
   var remote = async.compose(push, getCurrentBranch, commit, add);
   remote(message, function (err, res) {
     if (err) {reject(err);process.exit()}
     resolve(res);
   })
 });
}
