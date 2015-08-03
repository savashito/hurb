/**
 * @author Jake Hewitt
 * Last Edited: 05/29/2015
 * Description: Database model for users
 */

var mongoose = require('mongoose');
var encrypt = require('../utilities/encryption');
var ObjectId = mongoose.Schema.ObjectId;

var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: '{PATH} is required!'
    },
    username: {
        type: String,
        required: '{PATH} is required!',
        unique: true
    },
    salt: {
        type: String,
        required: '{PATH} is required!'
    },
    hashed_pwd: {
        type: String,
        required: '{PATH} is required!'
    },
    roles: [String],
    subscription: {
        type: String,
        default: "Free"
    },
    riskiness: {
        type: Number,
        default: 0
    },
    droneCollection: [ObjectId],
    abmCollection: [ObjectId],
    orderCollection: [ObjectId],
    mattCollection: [ObjectId],
    location: {
        longitude: Number,
        latitude: Number
    },
    signupDate: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: "acct_circle.svg",
    },
    phone: {
        type: String,
        required: '{PATH} is required!'
    },
    email: String,
    address: {
        type: String,
        required: '{PATH} is required!'
    },
    city: {
        type: String,
        required: '{PATH} is required!'
    },
    state: {
        type: String,
        required: '{PATH} is required!'
    },
    postalCode: {
        type: String,
        required: '{PATH} is required!'
    }

});

userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) == this.hashed_pwd;
    },
    hasRole: function (role) {
        return this.roles.indexOf(role) > -1;
    }
};

var User = mongoose.model('User', userSchema);

module.exports = {
    User: User
};

