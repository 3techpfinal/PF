import { Router } from 'express';
import Category from '../models/Category.js';

const router = Router();


router.post('/', async(req,res,next)=>{
    const { name } = req.body;

    try {
        const newCategory = new Category({name});
        await newCategory.save();
        res.send(newCategory);
    } catch(err){
        next(err)
    }
}); 



router.get("/", async (req, res, next) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (error) {
        res.status(404).json({ error: "Error : Products not found" })
    }

});


router.get("/:id", async (req,res,next) => {
    const { id } = req.params;
    try {
        const found = await Category.findById(id)
        return res.send(found)
    } catch (error) {
        res.status(404).json({ error: "Error : Category not found" })
    }

});


router.delete('/:id', async (req, res, next) => {

    // el ban se logra quitando acceso temporal a la cuenta, habría que hacer una copia en otro esquema inaccesible, cosa de guardar los datos
    // front pregunta si confirma x acción

    // esto es permaban, ojo
    try {
        const { id } = req.params;
        const found = await Category.findByIdAndRemove({ _id: id })
        res.json({ message: `Category : ${found.name} - ID : ${found._id} successfully deleted` })
    } catch (err) {
        next(err)
    }
});

router.put('/:id', async (req, res, next) => {
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