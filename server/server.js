'use strict';

const path = require('path');
const Hapi = require('hapi');
const apod = require('nasa-apod');
const moment = require('moment');

const server = new Hapi.Server({
  connections: {
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
      }
    }
  }
});

server.connection({
  port: 3000,
  host: 'localhost'
});

server.route({
  method: 'GET',
  path: '/data/pictures',
  config: {
    handler(request, reply) {
      var d = moment();
      var params = request.query;

      // Get apod data for a specific date
      if(params && params.date) {
        d = moment(params.date);
      }

      apod(d).then(function (data) {
        reply({
          data: data
        });
      });
    }
  }
});

server.start((err) => {

  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
