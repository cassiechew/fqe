//routes.js
const Component   =   require('../models/Component');
const TestData    =   require('../models/TestData');

const ServerRootRoute = {
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('You shouldn\'t be here! Please Leave.');
  }
}

const CreateRandomTestData = {
  method: ['PUT', 'POST'],
  path: '/api/testData/{name}',
  handler: function (request, reply) {
    const testData = new TestData({
      TestId: request.params.name,
      RandomString: request.params.name
    });
    testData.save(function(error, testData) {
      if (error) {
        console.error(error);
      }

      reply(testData.id);
    });
  }

}

const GetRandomData = {
    method: 'GET',
    path: '/api/testData/',
    handler: function (request, reply) {
        TestData.find({}, function(err, testDataList) {
            if (err) {
                reply(err);
                return;
            }

            reply(testDataList);
        });
    }
}

module.exports = [
  ServerRootRoute,
  CreateRandomTestData
];
