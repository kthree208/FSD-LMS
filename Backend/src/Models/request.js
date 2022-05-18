const mongoose = require('mongoose');


const RequestedSchema = mongoose.Schema({
    BookName:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Pending"
    }
})


mongoose.model('RequestedBooks',RequestedSchema);