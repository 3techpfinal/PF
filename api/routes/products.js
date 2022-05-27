import { Router } from 'express';
import Product from '../models/Product.js';

const router = Router();


router.post('/', async (req, res) => {
// queda organizar como enlazar con las categorías 

    try {

        const newProduct = new Product(req.body)
        await newProduct.save()

        res.send(newProduct)
    } catch (error) {
        next(err)
    }
});





router.get('/', async (req, res, next) => {
    try {
        const allProducts = await Product.find({});
        res.send(allProducts)
    } catch (err) {
        next(err)
    }
});


router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const found = await Product.findById({_id:id});
        res.send(found)
    } catch (err) {
        next(err)
    }
});


router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const found = await Product.findByIdAndRemove({ _id: id })
        res.json({ message: `Product : ${found.productName} - ID : ${found._id} successfully deleted` })
    } catch (err) {
        next(err)
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndUpdate({ _id: id }, req.body);
        // le paso todo el body, el método compara y cambia todo automáticamente
        const updatedProduct = await Product.findById({ _id: id })
        res.send(updatedProduct)
    } catch (err) {
        next(err)
    }

});

export default router;