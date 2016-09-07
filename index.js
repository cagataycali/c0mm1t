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
  console.log(emoji.emojify(':zap:'), colors.red(message));
}

function add(message, callback) {
  E('git add .')
    .then((output) => {
      log('Git add');
      callback(null, message);
    }).catch((err) => {
      errorLog(err);
      callback(err, null);
    })
}

function checkRemote(message, callback) {
  E('git remote show origin')
    .then((origin) => {
      if (origin.indexOf('github.com') !== -1) {
        premoji = ':octocat: '
      }
      callback(null, {message: message, premoji: premoji});
    }).catch((err) => {errorLog(err);callback(err, null);});
}

function emoji(output, callback) {
  m4g1c(output.message, false)
    .then((emojis) => {
      callback(null, output.premoji + output.message + ' ' + emojis)
    }).catch((err) => {errorLog(err);callback(err, null);});
}

function commit(message, callback) {
  log(`Your awesome commit message ${emoji.emojify(message)}`)
  E(`git commit -m "${message}"`)
    .then((output) => {
      callback(null, message);
    }).catch((err) => {errorLog(err);callback(err, null);})
}

function getCurrentBranch(message, callback) {
  I()
  .then((branch) => {
     callback(null, branch)
  }).catch((err) => {errorLog(err);callback(err);})
}

function push(branch, callback) {
  log('You are pushing as', branch);
  E(`git push origin "${branch.trim()}"`)
    .then((output) => {callback(null, branch)})
    .catch((err) => {errorLog(err);callback(err, null);})
}

module.exports = function (message) {
 return new Promise(function(resolve, reject) {
   var remote = async.compose(push, getCurrentBranch, commit,add);
   remote(message, function (err, res) {
     if (err) {reject(err);process.exit()}
     resolve(res);
   })
 });
}
