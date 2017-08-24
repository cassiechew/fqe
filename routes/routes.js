//routes.js

//controllers
const testController = require('./testController');


//endpoints
exports.endpoints = [
    { method: 'GET', path: '/api/testData', config: testController.getTestData },
    { method: 'GET', path: '/api/testData/{testId}', config: testController.getOneTestData },
    { method: 'POST', path: '/api/testData', config: testController.create }
]
