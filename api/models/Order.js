import mongoose from 'mongoose';
import { format } from 'date-fns';
const { Schema, model } = mongoose;
// sujeta a cambios de acuerdo a la info que llega desde PayPal.


const orderSchema = new Schema({

    user : {
         type : Schema.Types.ObjectId,
         ref : 'User'
    },

    products : [],
    
    // date : {
    //     type : Date,
    //     // default : Date.now()
    // },

    adress : {
        type : String,
        // required : true
    },

    isPaid : {
        type : Boolean,
        default : false
    },

    paymentId: { //ver como puedo sacarlo de PayPal
        type : String,
        // required : true
    },

    totalPrice : {
        type : Number,
        // required : true
    },

    creationDate: {
        type: String
    }
});




orderSchema.method.setCreationDate = function () {
    const formatedDate = format(date.now, 'dd/MM/yyyy')
    this.productCreationDate = formatedDate
    return
}

const Order=model("Order",orderSchema)

export default Order;