const nodemailer = require('nodemailer');

const forgetPassword = async (data) => {
    var transport = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: 587,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        }
      });
    const {name, email, token} = data;
    const info = await transport.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reset your password',
        html: `
            <h1>Reset Password</h1>
            <h2>Hello ${name}</h2>
            <p>Click the following link to restablish your password</p>
            <a href='${process.env.USER_URL}/forget-password/${token}'> Reset password </a>
        `
    });
    console.log('Message sent: %s', info.messageId);
}

module.exports = forgetPassword;
