const Mongoose    =   require('mongoose');
const Schema      =   Mongoose.Schema;

const TestDataSchema  =   new Schema({
  testId: { type: String, unique: true, required: true },
  randomString: { type: String, unique: true, required: true }
});


module.exports = Mongoose.model('TestData', TestDataSchema);
