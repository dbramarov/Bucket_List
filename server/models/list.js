var mongoose = require("mongoose");
var ListSchema = new mongoose.Schema({

    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    tageduser: {type: mongoose.Schema.Types.ObjectId, ref: "User", required:"Choose a taged user!"},
    tagname: {type:String},
    title: {type: String, required: "Title is required!", minlength: [5, "Title must be more than 5 characters."]},
    description: {type: String, required:"Description is required!", minlength: [10, "Description must be more than 10 characters."]},
    checked: {type: Boolean, default: false},

}, {timestamps: true});

var List = mongoose.model("List", ListSchema);