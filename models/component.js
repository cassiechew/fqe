const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const Joi = require('Joi');
const Boom = require('Boom');

const BASECOMPONENT = 0;
const COMPOSITECOMPONENT = 1;

const KIND = [ BASECOMPONENT, COMPOSITECOMPONENT ];

const ComponentSchema = new Schema({
    componentId: { type: String, unique: true, required: true },
    name: { type: String, unique: true, required: true },
    price: { type: Number, requred: true },
    type: { type: KIND, required: true }, //is is a base component or is it composite
    components: { type: [this] }
});

const component = Mongoose.model('component', ComponentSchema);

showAPI = {
    handler: function(request, reply) {
        reply({
            'message': "Hi there!"
        })
    }
}

getAllComponents = {
    handler: function(request, reply) {
        component.find({}, function(err, component) {
            if (err) reply(Boom.badRequest(err));
            reply(component);
        });
    }
}

module.exports = {
    Component: component,
    showAPI,
    getAllComponents
}
