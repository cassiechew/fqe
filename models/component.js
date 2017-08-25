const Mongoose              = require('mongoose');
const Schema                = Mongoose.Schema;

const Joi                   = require('Joi');
const Boom                  = require('Boom');

const BASECOMPONENT         = 0;
const COMPOSITECOMPONENT    = 1;

const KIND                  = [ BASECOMPONENT, COMPOSITECOMPONENT ];

const ComponentSchema       = new Schema({
    componentId:    { type: String, unique: true, required: true },
    name:           { type: String, unique: true, required: true },
    price:          { type: Number, requred: true },
    type:           { type: KIND, required: true }, //is is a base component or is it composite
    components:     { type: [this] }
});

const componentModel = Mongoose.model('component', ComponentSchema);

showAPI = {
    handler: function(request, reply) {
        reply({
            'message': "Hi there!"
        })
    }
}

getAllComponents = {
    handler: function(request, reply) {
        componentModel.find({}, function(err, component) {
            if (err) reply(Boom.badRequest(err));
            reply(component);
        });
    }
}


createComponent = {
    validate: {
        payload: {
            componentId:    Joi.string().required(),
            name:           Joi.string().required(),
            price:          Joi.number().required(),
            type:           Joi.required()
            //testId: Joi.string().required(),
            //randomString: Joi.string().required()
        }
    },
    handler: function(request, reply) {
        const newComponent = new componentModel(request.payload);
        componentModel.findOne({
            componentId: request.payload.componentId
        }, function(err, exists) {
            
            if (!exists) {
                newComponent.save(function(err, component) {
                    if (!err) {
                        return reply(component).created(); // HTTP 201
                    }
                    else {
                        if (11000 === err.code || 11001 === err.code) {
                            reply(Boom.forbidden("Component is probably already entered"));
                        }
                        else reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                    }
                });
            }
            else {
                reply(Boom.badRequest("Component already exists"));
            }
        })
    }
}

module.exports = {
    Component: componentModel,
    showAPI,
    getAllComponents,
    createComponent
}
