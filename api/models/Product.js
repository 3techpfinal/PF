import mongoose from 'mongoose';
import { format } from 'date-fns';
const { Schema, model } = mongoose;


const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true

    },

    price: {
        type: Number,
        required: true,
        default: 0
    },

    description: {
        type: String,
        required: true,
        maxLength: 1000
    },

    stock: {
        type: Number,
        required: true,
        default: 0
    },

    imageProduct: {
        type: Array
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    
    category: {
        type: String,
        ref: "Category",
        required: true
    },

    inCart: {
        type: Boolean,
        default: false
    },

    shipping: {
        type: String,
        required: false
    },

    isActive: {
        type: Boolean,
        default: true
    },

    creationDate: {
        type: String
    }

})


productSchema.method.setCreationDate = function () {
    const formatedDate = format(date.now, 'dd/MM/yyyy')
    this.productCreationDate = formatedDate
    return
}



export default model('Product', productSchema);