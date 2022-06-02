import pkg from 'mongoose';
const { Schema, model } = pkg;
import Token from './Token.js'
import crypto from "crypto"
import mailer from '../controllers/nodemailer.js'
import { format } from 'date-fns';


const userSchema = new Schema({

    name: {
        type: String,
        // required : true
    },

    lastName: {
        type: String,
        // required : true
    },

    email: {
        type: String,
        // required : true
    },

    password: {
        type: String
        // required : true
    },

    avatar: {
        type: String
        // required : true

    },

    role: {
        type: String,
        enum : ['user','admin','superadmin'],
        default: 'admin'
    },


    cart: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Cart'
        }
    ],

    wishList: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],

    verifiedAccount: {
        type: Boolean,
        default: false,
        required: true
    },

    suspendedAccount: {
        type: Boolean,
        default: false,
        required: true
    },

    creationDate: {
        type: String
    },

    googleId:{
        type : String,
        default : null
    }

});

userSchema.methods.setCreationDate = function () {
    const formatedDate = format(new Date(), 'yyyy/MM/dd')
    this.creationDate = formatedDate
    return
};

userSchema.methods.verifyAccount = function (cb){
    const token = new Token({user: this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;
    token.save( (err)=>{
        if(err) { return console.log(err.message)}

        const emailOptions = {
            from: '3techpfinal@gmail.com',
            to: email_destination,
            subject: "Hello madafaka :D",
            // html: `<a href= "http://localhost:3000/auth/tokenConfirmed/${token.token}">verifique su cuenta aqui</a>`

            //'Bienvenido a  MUNDOMARKET \n\n' + 'Verifique su cuenta haciendo click aqui: \n'+ 'http://localhost:3000'+ '\/token/confirmation\/' + token.token 
        };
        mailer.sendMail(emailOptions, (err)=>{
            if(err){return console.log(err.message)};
            console.log("A verification email has been sent to ", email_destination)
        })
    })
 
}





const User = model("User", userSchema)

export default User