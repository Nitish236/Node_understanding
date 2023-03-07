require("dotenv").config()

const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'faustino.schiller24@ethereal.email',
        pass: 'PY19xcQxBf53B9dg72'
    },
    tls:{
        rejectUnauthorized:false
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
    from: 'faustino.schiller24@ethereal.email',
    to: '', 
    subject: 'Welcome Mail!',
    template: 'email',
    context:{
        userName: "",
        userEmail: "",
        userPassword: ""
    }
};


const sendEmail = async (user) => {
      
      mailOptions.to = user.email
      mailOptions.context = user.context

      const date = new Date()
      mailOptions.context.sessionStart = date.getFullYear()
      mailOptions.context.sessionEnd = date.getFullYear() + 1 
      
      console.log(mailOptions) ;
      transporter.sendMail(mailOptions, (error) => {
          if(error){
             console.log(error) ;
          }
      })
}

module.exports = sendEmail