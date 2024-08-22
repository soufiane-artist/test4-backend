const mongoose= require('mongoose')
const jwt = require('jsonwebtoken')
const newUser = new mongoose.Schema({
    username :{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    city:{
        type:String,
        default :" ",
        required :true,
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    amount:{
        type:Number,
        default:5000,
        trim:true
    },
    profileImg:{
        type:Object,
        default:{
            url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7vB-49_BT-dirwttYZaeE_VByjlQ3raVJZg&s",
            publicId:null
        },
        required:true
    },
    sexy : {
        type:String,
        default:false,
        required:true
    },
    adress : {
        type:String,
        required:false,
        trim:true
    },
    country:{
        type:String,
        trim:true,
        required:false,
        default : null
    },
    verfyEmail:{
        type:Boolean,
        default:false,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:true
    },
    verfyEmail:{
        type:Boolean,
        default:false,
        required:true
    },
    onlineUser :{
        type:Boolean,
        default:false,
        required:true
    },
    codepostale:{
        type:Number,
        required : true,
        default : false,
        trim:true
    },
    accountBlock:{
        type:Boolean,
        default:false,
        required:true
    },
    blockChat:{
        type:Boolean,
        default:false,
        required:true
    },
    phoneNumber:{
        type:Number,
        trim:true,
        default : false,
        required:true
    },
    AccountBlocked:{
        type:Boolean,
        required:true,
        default:false
    },
    coupone:{
        type: String,
        default:false,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        default:false,
        required:true,
        trim:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:true
    }
},{
    timestamps:true,
    toJSON :{virtuals : true},
    toObject :{virtuals : true}
})
newUser.virtual('notification',{
    ref:'FXprox-Notification',
    foreignField:'userId',
    localField :'_id'
})
newUser.virtual('deals',{
    foreignField:'useriD',
    ref:'newDeal-test1-app2',
    localField:'_id'
})

/*
newUser.virtual('metaMessages',{
    ref:'user-meta-message',
    foreignField:'userId',
    localField :'_id'
})
*/


newUser.methods.generateAuthToken = function(){
    return jwt.sign({_id:this._id,isAdmin:this.isAdmin},process.env.JWT_Scrite)
}

const User = mongoose.model('auth-fxProx',newUser)
module.exports = User