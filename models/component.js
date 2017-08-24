const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const ComponentSchema = new Schema({
    componentId: { type: String, unique: true, required: true },
    name: { type: String, unique: true, required: true },
    price: { type: Number, requred: true },
    type: { type: Number, required: true }, //is is a base component or is it composite
    typeString: { type: String, required: true },
    components: { type: [this] }
});


module.exports = Mongoose.model('component', ComponentSchema);
