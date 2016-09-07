var C = require('./index');

C('Bug fixes')
  .then(function (value) {console.log(value);})
  .catch(function (err) {console.log(err);})
