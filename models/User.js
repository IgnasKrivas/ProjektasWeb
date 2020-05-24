const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 5
    },    
    displayName: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model('User', UserSchema);