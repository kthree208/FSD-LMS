const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    book_depository_stars:{
        type:Number,
        
    },
    isbn:{
        type:Number,
        required:true,
        unique : true
    },
    pages:{
        type:Number,
        default:1
    },
    image:{
        type:String,
        
    },
    category:{
        type:String,
        required:true
    },
    
    copies:{
        type:Number,
        default:3
    }
})

mongoose.model('Books',BookSchema);