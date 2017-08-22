//index.js
'use strict';

const Hapi      = require('hapi');
const database  = require('./plugins/database').db;

const Good      = require('good');

//create server with host and port
const server    = new Hapi.Server();


server.connection({
  host: 'localhost',
  port: 1337
});

//routes
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('You shouldn\'t be here!');
  }
});


server.register({
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}, (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start((err) => {

      if (err) {
          throw err;
      }



      server.log('info', 'Server running at: ' + server.info.uri);
  });
});
