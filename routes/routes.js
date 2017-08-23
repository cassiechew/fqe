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

module.exports = [
  ServerRootRoute,
  CreateRandomTestData
];
