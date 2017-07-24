// class task


function Task (opts) {
  if(!opts) opts = {};
  this.title          = opts.title          || 'Task ' + parseInt(Math.random()*1000);
  this.description    = opts.description    || '';
  this.created        = opts.created        || new Date();
  this.updated        = opts.updated        || new Date();
  this.deadline       = opts.deadline       || '';
  this.status         = opts.status         || false;
  this.owner          = opts.owner          || '';
}

module.exports = Task;
