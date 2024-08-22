const User = require("../DB/Schema/authS")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const path = require('path')
const fs = require('fs')
const { cloudinaryUploadeImage, cloudinaryRemoveImage } = require("../clouidnary/cloudinary")
const Notif = require("../DB/Schema/Notif")
const { verrfyTokenModel } = require("../DB/Schema/verficationAccount")
const  setEmail  = require('../util/resetPassEmail');


//register
exports.Register = async(req,res)=>{
    const {username,email,password} = req.body
    const hashpass = await bcrypt.hash(password , 10)
    
    if(username.length > 30){
        return res.json({message : 'Please enter your real name'})
    }
    if(email.length > 35){
        return res.json({message : 'Please enter your real email'})
    }
    if(password.length > 35){
        return res.json({message : 'Please enter another code'})
    }


    const userEmail = await User.findOne({
        email: email
    })
    if(userEmail){
        return res.json({message : 'This account already exists'})
    }


     // coupone 
     const num1 = Math.floor(Math.random() * 90) + 10;
     const num2 = Math.floor(Math.random() * 90) + 10;
 
     // توليد ثلاثة أحرف عشوائية
     const randomChars = crypto.randomBytes(3).toString('hex').slice(0, 3);
 
     // دمج الأرقام والأحرف لتكوين الكود
     const code = `${num1}${randomChars}${num2}`;


    const user = new User({
        username:  username,       
        email:  email,       
        password: hashpass, 
        coupone :code,
    })
    await user.save()
    /*1*///verfy email
    //creating new verfication & save it toDB
        const verifytoken = new verrfyTokenModel({
            userId : user._id,
            //يكتب كتابة عشوائية
            token : crypto.randomBytes(32).toString("hex"),
        });
        await verifytoken.save()
        //انشاء لينك
        const link = `${process.env.CLIENT_DOMAIN}/${user._id}/verify/${verifytoken.token}`;
        //انشاءاتشتيميل لتكون احلى
        const htmlTemplate = `
            <div>
                <p>  click on the Link below to verify your email  </p>
                <a href="${link}">  Verify  </a>
            </div>
        `
        //ارسال البيانات الى قسم سيند ايمايل حسب الترتيب
        await setEmail(user.email, "Verify your email", htmlTemplate);
        //res
        res.status(201).json({messageV : 'We send to you an email,please verfy email address'})
    }
//Update_Img_Profile
exports.UpdateImageProfile = (async(req,res)=>{

    const user = await User.findById(req.params.id)
    if(!user){
        return res.json({message : 'user not found'})
    }

    const pathImg = path.join(__dirname,`../images/${req.file.filename}`)
    const image = await cloudinaryUploadeImage(pathImg)
    
    if (user?.profileImg?.publicId !== null) {
        await cloudinaryRemoveImage(user?.profileImg?.publicId);
    }
    const userPhoto = await User.findByIdAndUpdate(req.params.id,{
    $set:{
        profileImg : {
            url : image.url,
            publicId : image.public_id,
        }
    }
    },{new : true})

    await userPhoto.save()

    res.json(userPhoto)
    fs.unlinkSync(pathImg)
})

//login
exports.Login = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email: email });
    if (!user) { // التحقق من وجود المستخدم بدلاً من البريد الإلكتروني
        return res.json({ message: 'Your email is not found' });
    }

    const comparePass = await bcrypt.compare(password, user.password); // استخدام await مع bcrypt.compare
    if (!comparePass) {
        return res.json({ message: 'Please check your password' }); // تصحيح الرسالة
    }


    //ادا كلن حساب المستخدم ليت فيريفي لا تسمح بستجيل الدخول
   if(!user.verfyEmail){
       let verficationToken = await verrfyTokenModel.findOne({
           userId  : user._id
        })
        // ارسال رسالة لليوزر ليدخل عبر الايمايل الخاص به
        if(!verficationToken){
            verficationToken = new verrfyTokenModel({
                userId : user._id,
                token : crypto.randomBytes(32).toString("hex")
            })
            await verficationToken.save()
        }
        //انشاء لينك
        const link = `${process.env.CLIENT_DOMAIN}/${user._id}/verify/${verficationToken.token}`;
        //انشاءاتشتيميل لتكون احلى
        const htmlTemplate = `
        <div>
        <p>  click on the Link below to verify your email  </p>
        <a href="${link}">  Verify  </a>
        </div>
        `
        //ارسال البيانات الى قسم سيند ايمايل حسب الترتيب
        await setEmail(user.email, "Verify your email", htmlTemplate);
        return  res.json({message : 'Please check your email'})
    }

    const token = await user.generateAuthToken(); // تأكد من وجود هذه الدالة في نموذج المستخدم
    res.json({
        _id:user._id,
        amount:user.amount,
        profileImg : user.profileImg,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin, // إذا كان هذا الحقل موجودًا في النموذج
        token: token,
        createdAt: user.createdAt,
        coupone : user.coupone,
        accountBlock : user.accountBlock,
        codepostale : user.codepostale,
        age : user.age,
        city : user.city,
        adress : user.adress,
        verfyEmail : user.verfyEmail,
        verfyAccount : user.verfyAccount,
        sexy : user.sexy,
        phoneNumber : user.phoneNumber,
    });
};

// edit - all - profile
exports.updateAllprofile =(async(req,res)=>{
    const {username,adress,country,sexy,age,phoneNumber,city,codepostale} = req.body
    const user = await User.findByIdAndUpdate(req.params.id , {
        $set:{
            username : username,
            adress : adress,
            sexy : sexy ? sexy : " ",
            age : age,
            phoneNumber : phoneNumber ? phoneNumber : 0,
            city : city,
            codepostale : codepostale,
        }
    },{new:true})
    await user.save()
    if(adress !== null ,country !== null ,sexy !== false ,age !== false ,phoneNumber !== false ,city !== " " ,codepostale !== false ){
        const userVerfyAcount = await User.findByIdAndUpdate(req.params.id , {
            $set:{
                verfyAccount : true
            }
        },{new:true})
        await userVerfyAcount.save()
    }
    res.json(user)
})

//get-By-user
exports.getUserById = async(req,res)=>{
    const user = await User.findById(req.params.id).populate({
        path: 'notification',
        options: { sort: { createdAt: -1 } } // الترتيب بالعكس باستخدام createdAt
    }).sort('-password').populate('deals');
    res.json(user)
}
//get-All-users
exports.getAllUsers = async(req,res)=>{
    const users = await User.find().populate('notification', '-__v', '-userId').sort({ createdAt: -1 });
    res.json(users)
}

//edit amount of admin dash
exports.updateAmount = async(req,res)=>{

    const userId = await User.findById(req.params.id)
    if(!userId){
        return res.json({message : 'user not found'})
    }

   const user = await User.findByIdAndUpdate(req.params.id,{
        $set:{
            amount:userId.amount + req.body.amount
        }
    },{new:true})
    await user.save()
    res.json(user)

    const notif = await Notif({
        username:'Meta Bank',
        userId : user._id,
        imgProfile :'http://res.cloudinary.com/dvivzto6g/image/upload/v1717611412/b4rivxi8owylfnbsqxi8.png' ,
        clientId : user._id ,
        clientEmail:'Meta-Bank',
        amount: req.body.amount,
        message : `I have charged your account ${req.body.amount} USD`,
        operation : "Dèposit"
    })
    await notif.save()

}

//update user by copone
exports.updateUserBycoupone = async(req,res)=>{ 
    
    const userCoupone =await User.findById(req.params.id)
  
    const userId = await User.findByIdAndUpdate(req.params.id,{
    $set:{
        amount : userCoupone.amount +  req.body.amount
    }
    },{new:true})
    await userId.save()
    res.json(userId)

    
    const notif = await Notif({
        username:'Meta Bank',
        userId : userCoupone._id,
        imgProfile :'http://res.cloudinary.com/dvivzto6g/image/upload/v1717611412/b4rivxi8owylfnbsqxi8.png' ,
        clientId : userCoupone._id ,
        clientEmail: "Meta-Bank",
        amount: req.body.amount,
        message : `You have received funds via your coupon code`,
        operation : "Dèposit"
    })
    await notif.save()

}


//get user byy copone
exports.coponeUser = async(req,res)=>{
    const userCopone = await User.find({coupone : req.params.coupone})
    res.json(userCopone)
}

//block user 
exports.BlockUser = (async(req,res)=>{
    const user =  await User.findByIdAndUpdate(req.params.id,{
         $set:{
             accountBlock: true
         }
     },{new:true})
     res.json(user)
 })

 //block chat
exports.blockChat = (async(req,res)=>{
    const user = await User.findByIdAndUpdate(req.params.id,{
        $set:{
            blockChat:true
        }
    },{new:true})
    res.json(user)
})

module.exports.verfyUserAccountCtrl = (async (req, res) => {
    //من الرابط جلب اليوزر
    const user = await User.findById(req.params.userId);
    if (!user) {
        return res.json({ message: "invalid link" });
    }
    //التاكد من التوكن هل هو صحيح جلب التوكن من الرابط
    const verifycationToken = await verrfyTokenModel.findOne({
        userId: user._id,
        token: req.params.token
    });
    //ادا لم يكن لدينا
    if (!verifycationToken) {
        return res.json({ message: 'invalid Link' });
    }
    // تعديل الفيريفيكايشن 
    user.verfyEmail = true;
    await user.save();
    //حدف الفيريفيكايشن لليزير لتكون صلاحيتها مدة واحدة    
    res.json({ message: 'your account verify' });
});