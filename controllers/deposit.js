const path = require("path")
const Notif = require("../DB/Schema/Notif")
const User = require("../DB/Schema/authS")
const { cloudinaryUploadeImage } = require("../clouidnary/cloudinary")


/// paypal
exports.depositPaypal = async(req,res)=>{
    const user = await User.findById(req.body.userId)
    if(!user){
        return res.json({message : 'your id not found'})
    }

    //notif user
    const notif = await Notif({
        username:'Meta Bank',
        userId : user._id ,
        imgProfile :'http://res.cloudinary.com/dvivzto6g/image/upload/v1717611412/b4rivxi8owylfnbsqxi8.png' ,
        clientId :"66605df575f2586f6911ef86",
        clientEmail: user.email,
        amount: req.body.amount,
        message : `I have charged your account ${req.body.amount}`,
        operation : "Dèposit"
    })
    await notif.save()

    //update user
     userUpdate = await User.findByIdAndUpdate(req.body.userId,{
        $set : {
            amount : user.amount + req.body.amount
        }
    },{new : true})
    await userUpdate.save()
    //admin notif
    const notifAmdin = await Notif({
        username:user._id,
        userId : "66605df575f2586f6911ef86" ,
        imgProfile :'http://res.cloudinary.com/dvivzto6g/image/upload/v1717611412/b4rivxi8owylfnbsqxi8.png' ,
        clientId :"66605df575f2586f6911ef86",
        clientEmail: user.email,
        amount: req.body.amount,
        message : `A new user has charged your account Via PayPal ${req.body.amount}`,
        operation : "Dèposit"
    })
    await notifAmdin.save()
    res.json(userUpdate)
}

// dèposit by skrill 
exports.depositSkrill = async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return res.json({message : 'your id not found'})
    }

    const pathImg = path.join(__dirname,`../images/${req.file.filename}`)
    const image = await cloudinaryUploadeImage(pathImg)

    const notif = new Notif({
        username:user.username,
        userId : user._id ,
        imgProfile : image?.url ,
        clientId :"66605df575f2586f6911ef86",
        clientEmail: user.email,
        amount: req.body.amount,
        message : `You have charged your account via Skrill. We will charge your account after verification in less than half an hour coupone "${req.body.amount}" `,
        operation : "Dèposit"
    })
    await notif.save()
    res.json(notif)
}
   


