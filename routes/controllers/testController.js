//testController.js

const Joi           =   require('Joi');
const Boom          =   require('Boom');
const Mongoose      =   require('Mongoose');

const Component     =   require('../../models/Component').Component;
const TestData      =   require('../../models/TestData').TestData;


exports.showAPI = {
    handler: function(request, reply) {
        reply({
            'message': 'Hello API!'
        })
    }
};

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
        const testData = new TestData(request.payload);
        testData._id = Mongoose.Types.ObjectId();
        TestData.findOne({
          'testId': request.params.testId
        }, function(err1, testId) {
          if(!err1) {
            reply('This DataID has been taken');
          }
          else {
            testData.save(function(err, testData) {
                console.log(err);
                if (!err) {
                    reply(testData).created('/api/testData/' + testData._id); // HTTP 201
                }
                else {
                    if (11000 === err.code || 11001 === err.code) {
                        reply(Boom.forbidden("please provide another test id, it already exist"));
                    }
                    else reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                }
            });
          }
        })
    }
}

exports.update = {
    validate: {
        payload: {
            testId: Joi.string().required(),
            randomString: Joi.string().required()
        }
    },
    handler: function(request, reply) {
        TestData.findOne({
            'testId': request.params.testId
        }, function(err, testData) {
            if (!err) {
                testData.randomString = request.payload.randomString;
                testData.save(function(err, testData) {
                    if (!err) {
                        reply(testData).updated('/api/testData/' + testData._id); // HTTP 201
                    }
                    else {
                        if (11000 === err.code || 11001 === err.code) {
                            reply(Boom.forbidden("please provide another user id, it already exist"));
                        }
                        else reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                    }
                });
            } else {
                reply(Boom.badImplementation(err)); // 500 error
            }
        });
    }
};

exports.remove = {
    handler: function(request, reply) {
        TestData.findOne({
            'testId': request.params.testId
        }, function(err, testId) {
            if (!err && testId) {
                testId.remove();
                reply({
                    message: "User deleted successfully"
                });
            }
            else if (!err) {
                // Couldn't find the object.
                reply(Boom.notFound());
            }
            else {
                reply(Boom.badRequest("Could not delete user"));
            }
        });
    }
};
