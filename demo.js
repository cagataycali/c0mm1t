var C = require('./index');

C({message:'Bug fixes', new: true})
  .then(function (value) {console.log(value);})
  .catch(function (err) {console.log(err);})
// Done!
