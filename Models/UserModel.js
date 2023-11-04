const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    match: /^[a-zA-Z\s]*$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    match: /^(?=.*[A-Z])(?=.*\d).+$/,
  },
  dateOfBirth: {
    type: Date,
    required: true,
   
},
  phoneNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  address: {
    type: String,
    required: true,
    maxlength: 100,
  },
  city: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
   
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
    match: /^[0-9]{6}$/,
  },
  country: {
    type: String,
    required: true,
  },
  securityQuestion: {
    type: String,
    required: true,
  },
  securityAnswer: {
    type: String,
    required: true,
    maxlength: 100,
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports =  {UserModel} ;
