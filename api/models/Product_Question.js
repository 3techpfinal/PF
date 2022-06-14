import pkg from 'mongoose';
const { Schema, model } = pkg;
import { format } from 'date-fns';

const productQuestionSchema = new Schema({
    body: {
        type: String,
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    replies: [
        {
            type : Schema.Types.ObjectId,
            ref: 'Product_Reply'
        }

    ],

    creationDate: {
        type: String
    }
});



productQuestionSchema.methods.setCreationDate = function () {
    const formatedDate = format(new Date(), 'yyyy/MM/dd')
    this.creationDate = formatedDate
    return
}

const Product_Question = model("Product_Question", productQuestionSchema)

export default Product_Question;