//routes.js

//controllers
const testController = require('../models/testData');
const componentController = require('../models/component');
//'./controllers/testController');


//endpoints
exports.endpoints = [
    //testing
    { method: 'GET', path: '/api/v1.0/', config: testController.showAPI },
    { method: 'GET', path: '/api/v1.0/testData/', config: testController.getTestData },
    { method: 'POST', path: '/api/v1.0/testData/getOne/', config: testController.getOneTestData },
    { method: 'POST', path: '/api/v1.0/testData/create/', config: testController.create },
    { method: 'PUT', path: '/api/v1.0/testData/update/', config: testController.update },
    { method: 'DELETE', path: '/api/v1.0/testData/{testId}', config: testController.remove },

    //components
    { method: 'GET', path: '/api/v1.1/', config: componentController.showAPI },
    { method: 'GET', path: '/api/v1.1/components/', config: componentController.getAllComponents }
]
