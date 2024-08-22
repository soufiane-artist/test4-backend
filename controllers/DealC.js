const User = require("../DB/Schema/authS")
const Deal = require("../DB/Schema/deal")


module.exports.CreateDeal = async(req,res)=>{

    const {open,close,totale,userId,buy,sell,volume,name} = req.body
    const newDeal = new Deal({
        openPrice : open,
        name:name,
        closePrice:close,
        totale:totale,
        useriD:userId,
        sell : sell,
        volume:volume,
        buy:buy
    })
    await newDeal.save()
    res.json(newDeal)
}

module.exports.getAllDeals =async(req,res)=>{
    const deals = await Deal.find()
    res.json(deals)
}



module.exports.updateDeal = async(req,res)=>{
    const {close, closePrice,totale} = req.body
    const deal = await Deal.findByIdAndUpdate(req.params.id ,{
        $set:{
            closePrice : closePrice,
            close: close,
            totale: totale
        }
    },{new : true})
    await deal.save()
    res.json(deal)
}
module.exports.UpdateUserDeal = async(req,res)=>{
    const update = await User.findByIdAndUpdate(req.params.id,{
        $set : {
            amount :req.body.amount
        }
    },{new:true}).populate('deals')
    await update.save()
    res.json(update)
}

module.exports.updateUserDeals = async (req, res) => {
    try {
        const userId = req.params.id; // الحصول على معرف المستخدم من المعاملات (parameters)
        const deals = await Deal.updateMany(
            { useriD: userId }, // فلتر التحديث، يتم استخدام معرف المستخدم لتحديد الصفقات
            { 
                $set: { 
                    close: true,
                    closePrice : req.body.closePrice,
                 } // تعيين قيمة close لتكون true
            }
        );
        res.json(deals);
    } catch (error) {
        res.status(500).json({ error: error.message }); // إرجاع رسالة الخطأ
    }
};