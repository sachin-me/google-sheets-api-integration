const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const Schema = mongoose.Schema;
let userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  subscriptions: [{ type: Schema.Types.ObjectId, ref: 'Subscription' }],
})

userSchema.pre('save', function(next) {
  console.log(this.password, 'check password');
  if(this.password) {
    console.log('Inside pre save')
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
  } else {
    console.log('passed')
    next();
  }
});

module.exports = mongoose.model('User', userSchema);