//routes.js

//controllers
const testController = require('./controllers/testController');


//endpoints
exports.endpoints = [
    { method: 'GET', path: '/api', config: testController.showAPI },
    { method: 'GET', path: '/api/testData', config: testController.getTestData },
    { method: 'GET', path: '/api/testData/{testId}', config: testController.getOneTestData },
    { method: 'POST', path: '/api/testData', config: testController.create },
    { method: 'PUT', path: '/api/testData/{testId}', config: testController.update },
    { method: 'DELETE', path: '/api/testData/{testId}', config: testController.remove }
]
