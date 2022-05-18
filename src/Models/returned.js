const mongoose = require('mongoose');

const ReturnedSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    Name:{
        type:String
    },
    author:{
        type:String
    },
    isbn:{
        type:String
    },
    IssuedOn:{
        type:String
    },
    returnedOn:{
        type:String
    },
    image:{
        type:String,
        
    },
    dueDate :{
        type : String
    },
    fine: {
        type : Number,
        default : 0
    }
})


mongoose.model('ReturnedBooks',ReturnedSchema);