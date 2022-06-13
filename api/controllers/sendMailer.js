import mailer from '../controllers/nodemailerConfig.js'
import Token from '../models/Token.js';
import crypto from "crypto";


export const verifyAccount = function (userId,userEmail){
    const token = new Token({user: userId, token: crypto.randomBytes(16).toString('hex')});
    token.save()
    console.log('Token: ', token.token)

    const emailOptions = {
            from: `${process.env.MAIL_USER}`,
            to: userEmail,
            subject: "3TECH - Verificación de correo electrónico",
            html: `Verifique su cuenta accediendo a <a href="${process.env.BASE_URL}/verified/tokenConfirmed/${token.token}">este</a> enlace.`
        };


    mailer.sendMail(emailOptions, (err)=>{
            if(err){return console.log(err.message)};
    
    console.log("A verification email has been sent to ", userEmail)
    
    })
};


export const resetPassword = function (userId,userEmail){
    const token = new Token({user: userId, token: crypto.randomBytes(16).toString('hex')});
    token.save()
    console.log('Token: ', token.token)

    const emailOptions = {
            from: `${process.env.MAIL_USER}`,
            to: userEmail,
            subject: "3TECH - Recuperar contraseña",
            html: `Para recuperar su contraseña ingrese a <a href="${process.env.BASE_URL}/resetPassword/${userId}/${token.token}">este</a> enlace.`
        };


    mailer.sendMail(emailOptions, (err)=>{
            if(err){return console.log(err.message)};
    
    console.log("A password recovery email has been sent to ", userEmail)
    
    })
};


export const orderReceipt = function (order,user){

    const emailOptions = {
            from: `${process.env.MAIL_USER}`,
            to: user.email,
            subject: "3TECH - Confirmación orden pagada, que la disfrutes!",
            // html: //función
        };


    mailer.sendMail(emailOptions, (err)=>{
            if(err){return console.log(err.message)};
    
    console.log("An order confirmation email has been sent to ", userEmail)
    
    })
};