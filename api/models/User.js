import pkg from 'mongoose';
const { Schema, model } = pkg;
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

    role: {
        type: String,
        enum : ['user','admin','superadmin'],
        default: 'user'
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
        default: true,
        required: true
    },

    suspendedAccount: {
        type: Boolean,
        default: false,
        required: true
    },

    creationDate: {
        type: String
    }

});

userSchema.methods.setCreationDate = function () {
    const formatedDate = format(new Date(), 'dd/MM/yyyy')
    this.userCreationDate = formatedDate
    return
}





const User = model("User", userSchema)

export default User