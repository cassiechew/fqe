//index.js

//basic server
'use strict';

const Hapi      =   require('hapi');
const Good      =   require('good');


const server    =   new Hapi.Server();
const config    =   require('./config');
const database  =   require('./plugins/database').db;
const routes    =   require('./routes/routes');

////////////////////////////////////////////////////////////////////////////////


server.connection({
  host: 'localhost',
  port: 1337,
  routes: {
      cors: true
  }
});

//server.auth.strategy('localhost', 'ip-whitelist', '127.0.0.1');




server.route(routes.endpoints);

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
