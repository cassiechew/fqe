'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const Good = require('good');

//create server with host and port
const server = new Hapi.Server();
const databaseUrl = 'localhost:27017';
const databaseOptions = {
  db: { native_parser: true,
  useMongoClient: true },

}

server.connection({
  host: 'localhost',
  port: 1337
});

//routes
server.route({
  method: 'GET',
  path:'/',
  handler: function (req, res) {

    return reply('You shouldn\'t be here!' );
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

      mongoose.connect(databaseUrl, databaseOptions, function(err) {
          if (err) server.log('error', err);

      });


      server.log('info', 'Server running at: ' + server.info.uri);
  });
});
