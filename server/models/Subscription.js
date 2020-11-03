const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let subsriptionSchema = new Schema({
  email: {type: String},
  provider: String,
  google: {
    name: String, 
    photo: String
  },
});

module.exports = mongoose.model('Subscription', subsriptionSchema);