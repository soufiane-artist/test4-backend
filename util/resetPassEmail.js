const nodemailer = require("nodemailer");

module.exports = async (userEmail, subject, htmlTemplate) => {
  try {
    // إنشاء ناقل باستخدام بيانات اعتماد Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail", // استخدم الخدمة بدلاً من إعداد المضيف والمنفذ
      auth: {
        user: "mbank.globe@gmail.com",
        pass: "ducrppcpbtsddajm", // كلمة مرور التطبيق (app-specific password)
      },
    });

    // إعداد تفاصيل البريد الإلكتروني
    const mailOptions = {
      from: `"META2FX.com 💸" <mbank.globe@gmail.com>`, // عنوان المرسل
      to: userEmail, // عنوان المستلم
      subject: subject, // موضوع البريد
      html: htmlTemplate, // محتوى البريد
    };

    // إرسال البريد الإلكتروني
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error (Nodemailer)");
  }
};




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