const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
exports.sendMail = async function(item) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.MAIL_SENDER,
    to: item.mail,
    subject: item.name,
    text: item.content,
  });

  console.log("Message sent: %s", info.messageId);
  
}