import { Router } from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import {verifyToken, isAdmin} from '../middlewares/authJwt.js';
import User from "../models/User.js";
import axios from 'axios';
const router = Router()

 //import * as IPaypal from '../paypalInterface'

router.get("/", verifyToken, async (req, res, next) => {
    
    //const {name} = req.query //esto es por si quiero traer todos los productos de una orden
    /*if(name){
        try {
            const productInOrder = await Order.product.find({ name: {$regex: req.query.name, $options:'i'}}).populate(["category"])
            return productInOrder.length === 0 ? res.send("product not found") : res.json(productInOrder)
            } catch (error) {
            next(error)
        }

    }else{
    */
    
    try {

        const actualUser = await User.findById(req.userId);
        const allOrders = await Order.find().populate(['products', 'user']);
        console.log(allOrders) 
        if(actualUser.role.includes('admin')){
            return res.send(allOrders)
        } else {
            const userOrders = allOrders.filter(order => order?.user?._id.toString() === req?.userId.toString());
            return res.send(userOrders)
        }

    } catch (error) {
        next(error)
    }
}
//}
)
;


router.get("/:id",verifyToken,  async(req, res, next) => {
    const { id } = req.params
    try {
        const found=await Order.findById(id).populate({path: 'user', model : 'User'})
        res.send(found)
    } catch (error) {
        res.send({error: "Order not found"})
    }
 
});




router.post('/', verifyToken, async (req, res, next) => { //crear orden
    try {

    const newOrder = new Order(req.body); //adress, paymentId, totalPrice, products : [{},{}]
    newOrder.user = req.userId      
    newOrder.setCreationDate()
    await newOrder.save()
   
    const updatedUser = await User.findByIdAndUpdate(
        req.userId,
        {$push: {"orders": newOrder._id}},
        {upsert: true, new : true})

    console.log(updatedUser)
    
    return res.send(newOrder)
        
    } catch (err) {
        next(err)
    }
});


router.put('/:id', verifyToken, async (req, res, next) => {

    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate({_id: id}, req.body);
        const updatedOrder = await Order.findById({_id: id});
        res.send(updatedOrder);
    } catch(err){
        next(err)
    }

});

router.delete('/:id', [verifyToken, isAdmin], async (req, res, next) => {

    try {
        const { id } = req.params;
        const found = await Order.findByIdAndRemove({_id: id })
        res.json({ message: `Order successfully deleted` })
    } catch (err) {
        next(err)
    }
});

// `Order : ${found._id} successfully deleted


router.post('/pay',verifyToken, async(req, res) => {

    // Todo: validar sesión del usuario
    // TODO: validar mongoID
    const AllProducts=Product.find()
    const getPaypalBearerToken = async() => {
    
    const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

    const base64Token = Buffer.from(`${'AQ0xQs7KJfypFz2RqDQlSnT9qYlzBaGyXFsPaTVDQIbgpvD8n1TXUV5Qh-h6vzVdlzd4QjGDFdqOJrup'}:${'EKxV7dEu_rbAR5eJEaEGZnWxUcLTxy6VHTOUT27sYUI_3FzBzXbOBpMiAqRBq93epypbnlf2JqpbzHuI'}`, 'utf-8').toString('base64');
    const body = new URLSearchParams('grant_type=client_credentials');
    
    
        try {
            
            const { data} = await axios.post( 'https://api-m.sandbox.paypal.com/v1/oauth2/token' || '', body, {
                headers: {
                    'Authorization': `Basic ${ base64Token }`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
    
            return data.access_token;
    
    
        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                console.log(error.response?.data);
            } else {
                console.log(error);
            }
    
            return null;
        }
    
    
    }

     function verificarSiHayStock (order,productsBDD){
        let verificacion = true
        order?.products.map((product)=>{
            productsBDD?.map((productBDD)=>{
                if(product._id===productBDD._id){
                    if(product.stock<productBDD.stock){
                        verificacion=false
                    }
                }
            })
        })
        return verificacion
    }


    const paypalBearerToken = await getPaypalBearerToken();

    if ( !paypalBearerToken ) {
        return res.status(400).json({ message: 'No se pudo confirmar el token de paypal' })
    }

    const { transactionId = '', orderId = ''  } = req.body;


    const { data } = await axios.get( `https://api.sandbox.paypal.com/v2/checkout/orders/${ transactionId }`, {
        headers: {
            'Authorization': `Bearer ${ paypalBearerToken }`
        }
    });

    if ( data.status !== 'COMPLETED' ) {
        return res.status(401).json({ message: 'Orden no reconocida' });
    }


    //-+await db.connect();
    const dbOrder = await Order.findById(orderId);
    const allProducts = await Product.find({}).populate(["category"]);
    if ( !dbOrder ) {
        //await db.disconnect();
        return res.status(400).json({ message: 'Orden no existe en nuestra base de datos' });
    }
    

    if ( dbOrder.totalPrice !== Number(data.purchase_units[0].amount.value) ) {
        //await db.disconnect();
        return res.status(400).json({ message: 'Los montos de PayPal y nuestra orden no son iguales' });
    }
   /* if(verificarSiHayStock(dbOrder,allProducts)===false){
        return res.status(400).json({ message: 'uno de los productos no tiene stock' });
    }*/

    /*dbOrder.products.forEach(async (product)=>{
        const thisProduct=await Product.findById(product._id)
        console.log('thisProduct',thisProduct)
        console.log('quantity',product.quantity)
        console.log('if',thisProduct.stock<product.quantity)
        if(thisProduct.stock<product.quantity){return res.status(400).json({message:'No hay stock suficiente'})}
        else{
            await Product.findByIdAndUpdate(product._id,{stock:(thisProduct.stock-product.quantity)})
        }
    })*/

    dbOrder.paymentId = transactionId;
    dbOrder.isPaid = true;
    await dbOrder.save();
   // await db.disconnect();

    
    return res.status(200).json({ message: "Orden pagada con éxito" });
})

export default router;