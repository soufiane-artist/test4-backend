const Notif = require("../DB/Schema/Notif")


exports.getAllNoti = async(req,res)=>{
    const notifs = await Notif.find().sort({ createdAt: -1 })
    res.json(notifs)
}