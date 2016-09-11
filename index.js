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

function add(obj, callback) {
  E('git add .')
    .then((output) => {
      callback(null, obj);
    }).catch((err) => {
      errorLog(err);
      callback(err, null);
    })
}

function commit(obj, callback) {
  m4g1c(obj.message, false)
    .then((emojis) => {
      log(`Your awesome commit message: ${colors.green(obj.message) + ' ' + emoji.emojify(emojis)}`)
      E(`git commit -m "${emoji.emojify(obj.message)} ${emoji.emojify(emojis)}"`)
        .then((output) => {
          callback(null, obj);
        })
        .catch((err) => {errorLog(err);callback(err, null);})
    })
    .catch((err) => {errorLog(err);callback(err, null);})
}

function getCurrentBranch(obj, callback) {
  console.log('current',obj);
  I()
  .then((branch) => {
     var objWithBranch = {
       obj : obj,
       branch: branch
     }
     callback(null, objWithBranch)
  }).catch((err) => {errorLog(err);callback(err);})
}

function push(obj, callback) {
  log(`You are pushing as: ${colors.green(obj.branch.trim())}`);
  var cmd = `git push origin ${obj.obj.new ? '-u': ' '} "${branch.trim()}"`;
  E(cmd)
    .then((output) => {callback(null, branch)})
    .catch((err) => {errorLog(err);callback(err, null);})
}

module.exports = function (obj) {
 return new Promise(function(resolve, reject) {
   var remote = async.compose(push, getCurrentBranch, commit, add);
   remote(obj, function (err, res) {
     if (err) {reject(err);process.exit()}
     resolve(res);
   })
 });
}
