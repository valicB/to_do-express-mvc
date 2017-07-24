// class User


function User (opts) {
  if(!opts) opts = {};
  this.fullname = opts.fullname || '';
  this.email    = opts.email    || '';
  this.password = opts.password || '';
}

module.exports = User;
