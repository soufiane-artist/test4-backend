const Notif = require("../DB/Schema/Notif")
const User = require("../DB/Schema/authS")
const Pull = require("../DB/Schema/pull")




module.exports.SkrillPull = async(req,res)=>{

    const user = await User.findById(req.body.userId)
    if(user.amount < req.body.amount){
        return res.json({message : 'Your balance is less'})
    }

    const pull = new Pull({
        useriD : req.body.userId,
        BankName : req.body.bankName,
        AmountPull : req.body.amount,
        emailBank : req.body.emailBank
    })
    await pull.save()

    const notif = new  Notif({
        username:user.username,
        userId : user._id ,
        imgProfile : user.profileImg.url ,
        clientId :"66605df575f2586f6911ef86",
        clientEmail: user.email,
        amount: req.body.amount,
        message : `You have withdrawn an amount Skrill"${req.body.amount} USD" `,
        operation : "Pull"
    })
    await notif.save()

    //update amount
    const UserUpdateAmount = await User.findByIdAndUpdate(req.body.userId,{
        $set:{
            amount : user.amount - req.body.amount,
        }
    },{new : true})
    await UserUpdateAmount.save()

    res.json(UserUpdateAmount)
}


module.exports.PaypalPullBank = async(req,res)=>{

    const user = await User.findById(req.body.userId)
    if(user.amount < req.body.amount){
        return res.json({message : 'Your balance is less'})
    }

    const pull = new Pull({
        useriD : req.body.userId,
        BankName : req.body.bankName,
        AmountPull : req.body.amount,
        emailBank : req.body.emailBank
    })
    await pull.save()

    const notif = new  Notif({
        username:user.username,
        userId : user._id ,
        imgProfile : user.profileImg.url ,
        clientId :"66605df575f2586f6911ef86",
        clientEmail: user.email,
        amount: req.body.amount,
        message : `You have withdrawn an amount Paypal"${req.body.amount} USD" `,
        operation : "Pull"
    })
    await notif.save()

    //update amount
    const UserUpdateAmount = await User.findByIdAndUpdate(req.body.userId,{
        $set:{
            amount : user.amount - req.body.amount,
        }
    },{new : true})
    await UserUpdateAmount.save()

    res.json(UserUpdateAmount)
}

