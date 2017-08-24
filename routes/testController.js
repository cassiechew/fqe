//testController.js

const Joi           =   require('Joi');
const Boom          =   require('Boom');

const Component     =   require('../models/Component');
const TestData      =   require('../models/TestData');


exports.getTestData = {
    handler: function(request, reply) {
        TestData.find({}, function(err, testData) {
            if (!err) {
                reply(testData);
            }
            else {
                reply(Boom.badImplementation(err));
            }
        });
    }
}


exports.getOneTestData =  {
    handler: function(request, reply) {
        TestData.findOne({
            'testId': request.params.testId
        }, function(err, user) {
            if (!err) {
                reply(user);
            } else {
                reply(Boom.badImplementation(err)); // 500 error
            }
        });
    }
}


exports.create = {
    validate: {
        payload: {
            testId: Joi.string().required(),
            randomString: Joi.string().required()
        }
    },
    handler: function(request, reply) {
        const newTestData = new TestData(request.payload);
        console.log("newTestData");
        newTestData.save(function(err, testData) {
            if (!err) {
                reply(testData).created('/api/testData/' + newTestData._id); // HTTP 201
            } else {
                if (11000 === err.code || 11001 === err.code) {
                    reply(Boom.forbidden("please provide another test id, it already exist"));
                } else reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
            }
        });
    }
}
