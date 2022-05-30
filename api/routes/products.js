import { Router } from 'express';
import Product from '../models/Product.js';
import {verifyToken, isAdmin} from '../middlewares/authJwt.js';

const router = Router();


router.post('/', [verifyToken, isAdmin], async (req, res) => {
    try {
        const found = await Product.findOne({ name: req.body.name })

        if (found) {
            res.send('You can´t post the same product twice')
        }
        else {

            const newProduct = new Product(req.body)
            newProduct.category = [req.body.category]

            newProduct.setCreationDate();

            await newProduct.save()

            res.send(newProduct)
        }
    } catch (error) {
        next(err)
    }
});





router.get('/', async (req, res, next) => {
    try {
        const allProducts = await Product.find({}).populate(["category"]);
        res.send(allProducts)
    } catch (err) {
        console.log(err)
        next(err)
    }
});


router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const found = await Product.findById({ _id: id });
        res.send(found)
    } catch (err) {
        next(err)
    }
});


router.delete('/:id', [verifyToken, isAdmin], async (req, res, next) => {
    try {
        const { id } = req.params;
        const found = await Product.findByIdAndRemove({ _id: id })
        res.json({ message: `Product : ${found.productName} - ID : ${found._id} successfully deleted` })
    } catch (err) {
        next(err)
    }
});

router.put('/:id', [verifyToken, isAdmin], async (req, res, next) => {
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