const nodemailer = require("nodemailer");

require('dotenv').config();


const mailSender=async(email,title,body)=>{
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user:  process.env.MAIL_USER,
        pass:  process.env.MAIL_APP_PASSWORD,
      },
    });
    const info = await transporter.sendMail({
      from: "Sachin || Greatest WebDeveloper Alive", // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      html: `Your OPT for gmail verification is <b> <h1>${body}</h1>`, // html body
    });
    console.log(info);
    return info;
  } catch (error) {
    console.log(error);
  }
}

module.exports=mailSender;