require("dotenv").config()

const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path');
const { MailError } = require("../errors");


const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
       user: process.env.MAIL_USER,
       pass: process.env.MAIL_PASSWORD
    }
});

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))


let mailOptions = {
    from: process.env.SENDER_MAIL,
    to: '', 
    subject: 'Welcome Mail!',
    template: 'email',
    context:{
        userName: "",
        userEmail: "",
        userPassword: "",
        role: ""
    }
};


const sendEmail = async (user) => {
      
      mailOptions.to = user.email
      mailOptions.context = user.context

      const date = new Date()
      mailOptions.context.sessionStart = date.getFullYear()
      mailOptions.context.sessionEnd = date.getFullYear() + 1 
      
      //console.log(mailOptions) ;
      transporter.sendMail(mailOptions, (error) => {
          if(error){
             throw new MailError('Something wrong happened while sending mail')
          }
      }) 
}

module.exports = sendEmail