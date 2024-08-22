const mongoose = require('mongoose')

//vefyToken Schema 
const vefyTokenSchema = new mongoose.Schema ({
    // احضار صاحب البوسط من قاعدة البيانات
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "auth-fxProx",
        required : true
    },
    token : {
        type :String,
        required : true,
    },
    //احضار اسم صاحب التعريق بعد الاضافة
},{
    timestamps : true,
});

// verfy token Model

const verrfyTokenModel = mongoose.model("verfytoken-fx-prox" , vefyTokenSchema);



module.exports ={
    verrfyTokenModel
}