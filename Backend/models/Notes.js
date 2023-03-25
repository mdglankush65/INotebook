const mongoose = require('mongoose')
const { Schema } = mongoose;

const NotesSchema = new Schema({
    // name:String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    }
});

module.exports = mongoose.model('notes', NotesSchema); 