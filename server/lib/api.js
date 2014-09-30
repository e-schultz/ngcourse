/* global exports, require */

'use strict';

var koast = require('koast');
var koastRouter = koast.koastRouter;
var connection = koast.db.getConnectionNow();
var mapper = koast.mongoMapper.makeMapper(connection);

var defaults = {};

function isOwner(data, req) {
  // return data.owner === 'alice';
  //console.log(req.user.data.username,data.owner);
  return req.user && (data.owner === req.user.data.username);
}

function annotator(req, item, res) {
  item.meta.can = {
    edit: isOwner(item.data, req)
  };
}

defaults.authorization = function defaultAuthorization(req, res) {
  // var authHeader = req.headers.authorization;
  // if (authHeader) {
  //   return authHeader[0] === '3';
  // } else {
  //   return false;
  // }
  return true;
};

mapper.options = {
  useEnvelope: true,
  queryDecorator: function () {},
  filter: function () {
    return true
  },
  annotator: function () {}
};

var routes = [{
  method: ['get', 'put'],
  route: 'tasksx/:_id',
  handler: mapper.auto({
    model: 'tasks'
  })
}, {
  method: 'get',
  route: 'tasks',
  handler: mapper.get({
    model: 'tasks',
    useEnvelope: false
  })
}, {
  method: 'get',
  route: 'tasks/:_id',
  handler: mapper.get({
    model: 'tasks',
    useEnvelope: false
  })
}, {
  method: 'post',
  route: 'tasks',
  handler: mapper.post({
    model: 'tasks',
    useEnvelope: false
  })
}, {
  method: 'put',
  route: 'tasks/:_id',
  handler: mapper.put({
    model: 'tasks',
    useEnvelope: false
  })
}, {
  method: 'get',
  route: 'tasks-plus',
  handler: mapper.get({
    model: 'tasks',
    annotator: annotator
  })
}, {
  method: 'post',
  route: 'tasks-plus',
  handler: mapper.post({
    model: 'tasks',
    annotator: annotator
  })
}, {
  method: 'get',
  route: 'tasks-plus/:_id',
  handler: mapper.get({
    model: 'tasks',
    annotator: annotator
  })
}, {
  method: 'put',
  route: 'tasks-plus/:_id',
  handler: mapper.put({
    model: 'tasks',
    queryDecorator: function (query, req) {
      // query.owner = req.user.data.username;
    },
    annotator: annotator
  })
}];


//exports.defaults = defaults;
//exports.routes = routes;
module.exports = exports = {
  defaults: defaults,
  routes: routes,
}

module.exports = exports = {
  koastModule: {
    defaults: defaults,
    router: koastRouter(routes, defaults)
  }
}
