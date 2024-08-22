const mongoose = require('mongoose')

const newNotif = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        trim:true
    },
    imgProfile:{
        trim: true,
        type:String,
        required:true
    },
    amount:{
    type:Number,
    requred:true,
    trim:true
   },
   clientEmail :{
    type:String,
    required:true,
    trim:true
   },
   clientId :{
    type:String,
    required:true,
    trim:true
   },
   message : {
    type:String,
    required:true,
    trim:true
   },
   operation : {
    type:String,
    required:true,
    trim:true
   },
   userId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'auth-fxProx',
    required:true
   }
},{
    timestamps:true
})

const Notif = mongoose.model('FXprox-Notification',newNotif)
module.exports= Notif