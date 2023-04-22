import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.EMAIL_SENDER, // generated ethereal user
    pass: process.env.EMAIL_SENDER_PASSWORD, // generated ethereal password
  },
});

export const sendEmailActivation = (userLogin, role) => {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(userLogin, process.env.EMAIL_ACTIVATION_TOKEN, {
      expiresIn: '1m',
    });

    console.log(userLogin);
    const details = {
      from: process.env.EMAIL_SENDER, // sender address
      to: userLogin.email, // list of receivers
      subject: 'Email Activation!', // Subject line
      html: `<p>${process.env.ORIGIN_DOMAIN}/email-activation?token=${token}&role=${role}</p>`,
    };

    transporter.sendMail(details, (err) => {
      if (err) {
        reject({ message: 'Cannot sending to activation code!' });
      } else {
        resolve({ message: 'Check your email fot activation!' });
      }
    });
  });
};
