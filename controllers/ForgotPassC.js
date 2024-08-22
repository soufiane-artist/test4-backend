const User = require("../DB/Schema/authS")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const  setEmail  = require('../util/senEmail');


module.exports.ForgotPass = async(req,res)=>{
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.json({message : 'user not found'})
    }
    const secret = process.env.JWT_Scrite + user.password
    const token = jwt.sign({email : user.email,id:user._id},secret,{
        expiresIn : '10m'
    })

    const link = `${process.env.CLIENT_DOMAIN}/reset-password/${user._id}/${token}`
     //انشاءاتشتيميل لتكون احلى
     const htmlTemplate = `
         <div>
             <p> click on the Link below to verify your email  </p>
             <a href="${link}">  Verify  </a>
         </div>
     `
     //ارسال البيانات الى قسم سيند ايمايل حسب الترتيب
     await setEmail(user.email, "Verify your email", htmlTemplate);
     res.status(201).json({messageV : 'We send to you an email,please verfy email address'})
    }

// get reset link

module.exports.getResetLink = async(req,res)=>{
    const user = await User.findById(req.params.userId)
    if(!user){
        return res.json({message : 'user not found Id'})
    }

    const secret = process.env.JWT_Scrite + user.password
    try{
        jwt.verify(req.params.token,secret)
        res.render('reset-password',{email : user.email})
    }catch (err) {
        res.json(err)
    }
}


// post reset link

module.exports.resetPass = async(req,res)=>{
    const user = await User.findById(req.params.userId)
    if(!user){
        return res.json({message : 'user not found'})
    }

   if(req.body.password.length > 35){
    return res.json({message : 'Please type the password'})
   }

     const secret = process.env.JWT_Scrite + user.password
    try{
        jwt.verify(req.params.token,secret)
        const salt  =await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password,salt)
        user.password = req.body.password
       await user.save()
        res.render('reset-password',{email : user.email})
    }catch (err) {
        res.json(err)
    }





}

