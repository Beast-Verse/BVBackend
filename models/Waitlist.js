const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  discord: {
    type: String,
    required: true,
    unique: true,
  },
  socials: {
    type: Boolean,
    required: true,
  },
  sources: {
    type: String,
    required: true,
  },
  code: {
    type: String,
  },
  referral: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
},{
    collection: 'pre-registration'
});

const Waitlist = mongoose.model("pre-registration", UserSchema);
module.exports = Waitlist;
