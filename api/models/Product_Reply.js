import pkg from 'mongoose';
const { Schema, model } = pkg;
import { format } from 'date-fns';

const productReplySchema = new Schema({
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

    creationDate: {
        type: String
    }
});



productReplySchema.methods.setCreationDate = function () {
    const formatedDate = format(new Date(), 'yyyy/MM/dd')
    this.creationDate = formatedDate
    return
}

const Product_Reply = model("Product_Reply", productReplySchema)

export default Product_Reply;