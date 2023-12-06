const nodemailer = require('nodemailer') ; 
//add asny and await 
const mailsender = () => { 

    try {

    const transporter  = nodemailer.createTransport ({
         
        host : process.env.Mail_host , 
        port : process.env.Mail_PORT ,
        auth : {
            user : process.env.mail_user ,
            pass : process.env.mail_password ,
        }
    })
 
    const info = transporter.sendMail ( {
        from : "studynotion" ,
        to : `${email}` ,
        html :  `${body}`, 
        text: `${text}` ,
        subject : `${title}`
    })

        
    } catch (error) {
        console.log(error) 
        console.log("error while sending mail")
    }

}

module.exports = mailsender 