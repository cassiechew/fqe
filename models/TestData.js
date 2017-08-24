const Mongoose    =   require('mongoose');
const Schema      =   Mongoose.Schema;

const TestDataSchema  =   new Schema({
  testId: { type: String, unique: true, required: true },
  randomString: { type: String, unique: false, required: true }
});


//module.exports = Mongoose.model('TestData', TestDataSchema);
const testData = Mongoose.model('testData', TestDataSchema);

module.exports = {
    TestData: testData
};
