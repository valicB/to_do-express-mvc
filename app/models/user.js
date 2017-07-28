// class User
const bcrypt = require('bcrypt');

function User (opts) {
  if(!opts) opts = {};
  this.fullname = opts.fullname || '';
  this.password    = bcrypt.hashSync(opts.password    || '', 5);
  this.email = opts.email || '';
}

module.exports = User;
