const nodemailer = require("nodemailer");

require('dotenv').config();


// const mailSender=async(email,title,body)=>{
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,
//       auth: {
//         user:  process.env.MAIL_USER,
//         pass:  process.env.MAIL_APP_PASSWORD,
//       },
//     });
//     let info = await transporter.sendMail({
//       from: "Sachin || Greatest WebDeveloper Alive", // sender address
//       to: `${email}`, // list of receivers
//       subject: `${title}`, // Subject line
//       html: `Your OPT for gmail verification is <b> <h1>${body}</h1>`, // html body
//     });
//     console.log("Male Sent Successfully (mailSender)")
//     console.log(info);
//     return info;
//   } catch (error) {
//     console.log("Error while sending mail",error);
//   }
// }

// const nodemailer = require("nodemailer");
// require('dotenv').config();

const mailSender = async (email, title, body) => {
  try {
    // Create transporter with correct Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,  
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_APP_PASSWORD,
      },
    });

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: "Sachin || Greatest WebDeveloper Alive", // sender Name
      to: `${email}`, // list of receivers
      subject: `${title}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <h2 style="color: #333;">Email Verification</h2>
          <p>Your OTP for email verification is:</p>
          <h1 style="color: #4CAF50; font-size: 32px; padding: 10px; background-color: #fff; border-radius: 5px; display: inline-block;">
            ${body}
          </h1>
          <p style="color: #666; margin-top: 20px;">
            This OTP will expire in 2 minutes. Please do not share this with anyone.
          </p>
        </div>
      `, // html body
    });

    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error while sending mail:", error.message);
    throw error; // Rethrow to handle it in the calling function
  }
};

// module.exports = mailSender;

module.exports=mailSender;



////vbdqwpndjhkmozzb  trza hsdl ltva gvnd