const nodemailer = require("nodemailer");


module.exports = async(userEmail,subject,htmlTemplate)=>{
  try {
    
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "mbank.globe@gmail.com",
        pass: "ducrppcpbtsddajm",
      },
    })

    const mailOption ={
      from: `"META2FX.com 💸"<mbank.globe@gmail.com>`, // sender address
      to: userEmail, // list of receivers
      subject: subject, // Subject line
      html: htmlTemplate, // html body
    }

    const info = await transporter.sendMail(mailOption)
    console.log('Email sent : ' + info.response)
  } catch (error) {
    console.log(error);
    throw new Error('internale Server Error (nodeMailer) ')
  }
}



/*const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "nwigashop@gmail.com",
    pass: "ptfktzptqiqwnlun",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Elfanane.com 👻" <maddison53@ethereal.email>', // sender address
    to: "solakari233@gmail.com", // list of receivers
    subject: "Verify your email", // Subject line
    text: "Hello world?", // plain text body
    html: "<h1>Test</h1>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);*/