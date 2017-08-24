//controller.js

const Joi           =   require('Joi');
const Boom          =   require('Boom');

const Component     =   require('../models/Component');
const TestData      =   require('../models/TestData');


exports.getTestData = {
    handler: function(request, reply) {
        TestData.find({}, function(err, testData) {
            if (!err) {
                reply(user);
            }
            else {
                reply(Boom.badImplementation(err));
            }
        });
    }
}
