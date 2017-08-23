const Mongoose    =   require('mongoose');
const Schema      =   Mongoose.Schema;

const TestDataSchema  =   new Schema({
  TestId: { type: String, unique: true, required: true },
  RandomString: { type: String, unique: true, required: true }
});


module.exports = Mongoose.model('TestData', TestDataSchema);
