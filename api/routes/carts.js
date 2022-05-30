import { Router } from 'express';
import Cart from '../models/Cart.js';
import User from '../models/User.js';
import {verifyToken, isAdmin} from '../middlewares/authJwt.js';

const router = Router();

router.post('/', verifyToken, async(req,res,next)=>{
    try {
                
        const newCart = new Cart(req.body);
        newCart.user = [req.userId];
        newCart.setCreationDate();

        await newCart.save();

        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            {"cart": newCart._id},
            {upsert: true, new : true})
            console.log(updatedUser)

        res.send(newCart);
    } catch(err){
        next(err)
    }
}); 



router.get("/", verifyToken, async (req, res, next) => {
    try {
        const cart = await Cart.find()
        res.json(cart)
    } catch (error) {
        res.status(404).json({ error: "Error : Cart not found" })
    }

});


router.get("/:id", verifyToken, async (req,res,next) => {
    const { id } = req.params;
    try {
        const found = await Cart.findById(id)
        return res.send(found)
    } catch (error) {
        res.status(404).json({ error: "Error : Cart not found" })
    }

});


router.delete('/:id', verifyToken, async (req, res, next) => {
    try {
        const { id } = req.params;
        const found = await Cart.findByIdAndRemove({ _id: id })
        res.json({ message: `Cart - ID : ${found._id} successfully deleted` })
    } catch (err) {
        next(err)
    }
});

router.put('/:id', verifyToken, async (req, res, next) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndUpdate({ _id: id }, req.body);
        const updatedProduct = await Product.findById({ _id: id })
        res.send(updatedProduct)
    } catch (err) {
        next(err)
    }

});


export default router;