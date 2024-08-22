const Send = require("../DB/Schema/Send")
const User = require("../DB/Schema/authS")
const Notif = require("../DB/Schema/Notif")
const Mony = require("../DB/Schema/Send")


//___send money
module.exports.sendMoney =(async(req,res)=>{

    const {from,to,ment} = req.body

    if(ment > 500) {
       return res.json({ message :'ment is fast please get < 500 $'})
    }

    //get user sender
    const userSender = await User.findById(from)
    if(!userSender){
        return res.json({message : "userSender not found"})
    }
    if(userSender.mony  < 0){
        return res.json({message :'The wallet is empty'})
    }
    if( userSender.mony < ment){
        return res.json({message :'المبلغ غير متوفر'})
    }
    // $ للتأكيد على أن البحث ينتهي بنهاية السلسلة
    if(ment < 2){
        return res.json({message : 'please gat amount > 1 $'})
    }
    
    //get user Client
    const userClient = await User.findById(to)
    if(!userClient){
        return res.json({message : "userClient not found"})
    }

    const sendMony = new Mony({
        users:[from,to],
        from:from,
        to:to,
        ment: ment
    })
    await sendMony.save()

    //get user Client and update compte
    const userClientUpdate = await User.findByIdAndUpdate(to,{
        $set:{
            amount: userClient.amount + ment - 1
        }
    },{
        new:true
    })

    //get user send and update compte
    const userSenderUpdate = await User.findByIdAndUpdate(from,{
        $set:{
            amount: userSender.amount - ment
        }
    },{
        new:true
    })
    //___admin
    //getadmin
    const adminUser = await User.findById('669fe48bf7d964d67db73ce9')
    if(!adminUser){
        return res.json({message  : 'admin nout found'})
    }
    const admin = await User.findByIdAndUpdate('669fe48bf7d964d67db73ce9',{
        $set:{
            mony : adminUser.amount + 1
        }
    },{new:true})
    await admin.save()
    //from
    const notif = await Notif({
        username:userClient.username,
        userId : from,
        imgProfile :userClient.profileImg.url ,
        clientId : to ,
        clientEmail:userClient.email,
        amount: ment,
        message : `you send ${ment} USD to my employer, id ${userClient._id}`,
        operation : "send"
    })
    await notif.save()
    //to
    const notifTo = await Notif({
        username : userSender.username,
        userId : to,
        imgProfile :userSender.profileImg.url,
        clientId:from,
        clientEmail:userSender.email,
        amount: ment,
        message : `you received a payment of ${ment} USD from my id : ${userSender._id}`,
        operation : "recieve"
    })
    await notif.save()
    await notifTo.save()
    await userSenderUpdate.save()
    await userClientUpdate.save()
    res.json({ userSender : userSenderUpdate , sendMony ,userClient : userClientUpdate})
})

//get--Allwithdraw
module.exports.getAllsender =(async(req,res)=>{
    const {amount,from,to}= req.body
   const allSender = await Send.find({
    users : {
        $all:[from,to]
    }
   })

   const project = allSender.map(send =>{
    return {
        amount: send.amount,
        users: send.users
        ,sender : send.sender.toString() === from
    }
   })

   res.json(project)
})


//delete all notif
module.exports.deleteAllNotif = async(req,res)=>{

    await Notif.deleteMany()
    res.json({message: 'Notification hasbeen delected'})


}

//delete all sender

module.exports.deleteAllsender = async(req,res)=>{

    await Send.deleteMany()
    res.json({message: 'sends hasbeen delected'})
}