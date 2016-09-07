var async = require('async');
var E = require('3x3c');
var m4g1c = require('m4g1c');
var I = require('1n1t');

function add(message, callback) {
  E('git add .')
    .then((output) => {
      callback(null, message);
    }).catch((err) => {callback(err, null);})
}

function checkRemote(message, callback) {
  E('git remote show origin')
    .then((origin) => {
      if (origin.indexOf('github.com') !== -1) {
        premoji = ':octocat: '
      }
      callback(null, {message: message, premoji: premoji});
    }).catch((err) => {callback(err, null);});
}

function emoji(output, callback) {
  m4g1c(output.message, false)
    .then((emojis) => {
      callback(null, output.premoji + output.message + ' ' + emojis)
    }).catch((err) => {callback(err, null);});
}

function commit(message, callback) {
  E(`git commit -m "${message}"`)
    .then((output) => {
      callback(null, message);
    }).catch((err) => {callback(err, null);})
}

function getCurrentBranch(message, callback) {
  I()
  .then((branch) => {
     console.log(' current branch is',branch);
     callback(branch)
  }).catch((err) => {callback(err);})
}

function push(branch, callback) {
  console.log('push', branch);
  E(`git push origin "${branch}"`)
    .then((output) => {console.log('push worked');callback(null, branch)})
    .catch((err) => {callback(err, null);})
}

var remote = async.compose(push, getCurrentBranch, commit, emoji, checkRemote, add);
remote('init', function (err, res) {
  if (err) {console.log('Error', err);process.exit(1)}
  console.log(res);
})


// function carp(sayi, callback) {
//   console.log('carp');
//   callback(null, sayi * 5)
// }
//
// function topla(sayi, callback) {
//   console.log('topla');
//   callback(null, sayi + 1);
// }
//
// var islem = async.compose(carp, topla);
// islem(5, function(err, result) {
//   console.log(err, result);
// })
