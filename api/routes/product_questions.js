import { Router } from "express";
import Product_Question from "../models/Product_Question.js";
import Product from "../models/Product.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import Product_Reply from "../models/Product_Reply.js";

const router = Router();


// obtengo todas las preguntas y respuestas sobre el producto

router.get('/:productId/questions', async (req, res, next) => {

    try {
        const { productId } = req.params;
        const allQuestions = await Product_Question.find({ product : productId}).populate(['user', 'replies']);
        res.send(allQuestions)
    } catch (err) {
        next(err)
    }
});


//obtengo una pregunta en particular

router.get('/:productId/questions/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const question = await Product_Question.find({ _id : id }).populate(['user']);

        res.send(question);
    } catch (err) {
        next(err)
    }
});



// pregunta del user sobre el producto

router.post('/:productId/questions', verifyToken, async(req, res, next)=> {
    try{

        const { productId } = req.params;
        const { body } = req.body;

        const newQuestion = new Product_Question({
            body : body,
            user : req.userId,
            product : productId
        });        
        
        newQuestion.setCreationDate();
        await newQuestion.save();   
           
        const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {$push: {"questions": newQuestion._id}},
        {upsert: true, new : true});

        console.log(updatedProduct);       
        
        res.send(newQuestion);

    }catch(err) {
        next(err)
    }
});



// respuesta del admin a la pregunta del User

router.post('/:productId/questions/:questionId', [verifyToken,isAdmin], async(req, res, next)=> {
    try{

        const { productId, questionId } = req.params;
        const { body } = req.body;

        const repliedQuestion = await Product_Question.findById({_id:questionId})

        const newResponse = new Product_Reply({
            body : body,
            user : repliedQuestion.user,
            product : productId
        });        
        
        newResponse.setCreationDate();
        await newResponse.save();   
           
        const updatedQuestion = await Product_Question.findByIdAndUpdate(
        questionId,
        {$push: {"replies": newResponse._id}},
        {upsert: true, new : true});

        console.log(updatedQuestion);       
        
        res.send(newResponse);

    }catch(err) {
        next(err)
    }
});




// solo el user que creó la pregunta

router.put('/:productId/questions/:id', verifyToken, async (req, res, next) => {
    try {
        const { id } = req.params
        const found = await Product_Question.findById({ _id: id }).populate(['user']);
        if(found.user === req.userId){
            const updated = await Product_Question.findByIdAndUpdate({ _id: id }, req.body, { upsert: true, new: true });
            res.send(updated);
        } else {
            res.send(found);
        }
    } catch (err) {
        next(err)
    }
});



// solo el user que creó la pregunta

router.delete('/:productId/questions/:id', verifyToken, async (req, res, next) => {
    try {
        const { id } = req.params
        const found = await Product_Question.findById({ _id: id }).populate(['user']);
        if(found.user === req.userId){
            await Product_Question.findByIdAndDelete({ _id: id })
            res.send('Question deleted');
        } else {
            res.send(found)
        }
    } catch (err) {
        next(err)
    }
});

export default router;