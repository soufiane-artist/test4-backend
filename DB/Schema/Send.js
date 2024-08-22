const mongoose = require('mongoose')

const newWithraw = new mongoose.Schema({
    ment:{
        type:Number,
        trim:true,
        required:true
    },
    users:Array,
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"auth-fxProx",
        trim:true,
        required:true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"auth-fxProx",
        trim:true,
        required:true
    }
},{
    timestamps :true
})

const Mony = mongoose.model('fx-Send-Mony',newWithraw)
module.exports= Mony