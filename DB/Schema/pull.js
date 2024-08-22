const mongoose = require('mongoose')

const newWithraw = new mongoose.Schema({
    useriD:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'auth-fxProx',
        required:true
    },
    emailBank:{
        type:String,
        trim:true,
        required:true
    },
    BankName:{
        type:String,
        trim:true,
        required:true
    },
    AmountPull:{
        type:String,
        trim:true,
        required:true
    },

},{
    timestamps :true
})

const Pull = mongoose.model('fx-pull-Mony',newWithraw)
module.exports= Pull