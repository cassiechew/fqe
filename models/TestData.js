const Mongoose    =   require('mongoose');
const Schema      =   Mongoose.Schema;

const Joi           =   require('Joi');
const Boom          =   require('Boom');



const TestDataSchema  =   new Schema({
  testId: { type: String, unique: true, required: true },
  randomString: { type: String, unique: false, required: true }
});

const TestData = Mongoose.model('testData', TestDataSchema);

showAPI = {
    handler: function(request, reply) {
        reply({
            'message': 'Hello API!'
        })
    }
};

getTestData = {
    handler: function(request, reply) {
        TestData.find({}, function(err, testData) {
            if (err) reply(Boom.badRequest(err));
            reply(testData);
        });
    }
}


getOneTestData =  {
    validate: {
        payload: {
            testId: Joi.string().required()
        }
    },
    handler: function(request, reply) {
        TestData.findOne({
            testId: request.payload.testId
        }, function(err, testData) {
            console.log(request.payload);
            if (err) reply(Boom.badRequest(err));
            console.log("Success!");
            reply(testData);

        });
    }
}


create = {
    validate: {
        payload: {
            testId: Joi.string().required(),
            randomString: Joi.string().required()
        }
    },
    handler: function(request, reply) {
        const testData = new TestData(request.payload);
        //testData._id = Mongoose.Types.ObjectId();
        TestData.findOne({
            testId: request.payload.testId
        }, function(err, exists) {
            console.log(request.payload);
            if (!exists) {
                testData.save(function(err, testData) {
                    if (!err) {
                        return reply(testData).created(); // HTTP 201
                    }
                    else {
                        if (11000 === err.code || 11001 === err.code) {
                            reply(Boom.forbidden("Failure"));
                        }
                        else reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                    }
                });
            }
            else {
                reply(Boom.badRequest());
            }
        })
    }
}

update = {
    validate: {
        payload: {
            testId: Joi.string().required(),
            randomString: Joi.string().required()
        }
    },
    handler: function(request, reply) {
        TestData.findOneAndUpdate(
            { testId: request.payload.testId },
            { randomString: request.payload.randomString },
            function(err, updatedTestData) {
                if (err) reply(Boom.badRequest());
                reply('Success');
            }
        )
    }
};
        /*TestData.findOne({
            testId: request.params.testId
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
            }
            reply(Boom.badRequest(err)); // 500 error

        });
    }*/


remove = {
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

//module.exports = Mongoose.model('TestData', TestDataSchema);


module.exports = {
    TestData,
    showAPI,
    getTestData,
    getOneTestData,
    create,
    update,
    remove
};
