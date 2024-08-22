const mongoose = require('mongoose')


const newDeal = new mongoose.Schema({
    openPrice : {
        type:Number,
        require:true,
        trim:true
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    closePrice:{
        type:Number,
        required: true,
        trim:true
    },
    totale:{
        type:Number,
        required:true,
        trim:true
    },
    useriD:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'auth-fxProx',
        required:true
    },
    buy:{
        type:Boolean,
        default :false ,
        required:true,
        trim:true
    },
    volume:{
        type:Number,
        required:true,
        trim:true
    },
    sell:{
        type:Boolean,
        default :false ,
        required:true,
        trim:true
    }
    ,
    close:{
      type:Boolean,
        default:false,
        trim:true
    }
},{
    timestamps : true
})

const Deal = mongoose.model('newDeal-test1-app2',newDeal)

module.exports = Deal