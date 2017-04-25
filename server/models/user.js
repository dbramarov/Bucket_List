var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
 name: {type: String, required: "User name must be provided!"},
 lists: [{type: mongoose.Schema.Types.ObjectId, ref: "List"}],
 }, {timestamps: true})

var User = mongoose.model('User', UserSchema); 