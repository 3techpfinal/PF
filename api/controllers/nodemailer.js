import nodemailer from 'nodemailer';
// import 'dotenv/config'
import credentials from '../credentials.js';


const config ={
  host: credentials.MAIL_HOST,
  port: credentials.MAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: credentials.MAIL_USER,
    pass: credentials.MAIL_PASS
  }
}



const mailer = nodemailer.createTransport(config)

export default mailer;
// If you´re having troubles, check this : https://stackoverflow.com/questions/51217785/i-get-a-error-error-invalid-login-535-5-7-8-username-and-password-not-accep