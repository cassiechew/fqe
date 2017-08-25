const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

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

module.exports = {
    Component: component,
    showAPI
}
