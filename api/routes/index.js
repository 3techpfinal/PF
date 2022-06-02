import {Router} from "express";
import user from "./users.js";
import product from "./products.js";
import category from "./categories.js";
import google from './googleLoginhtml.js'
// import token_confirmed from "./Token_confirm";
// import order from './Orders';
// import conversation from "./Conversations";
// import message from "./Messages";


const router = Router();

router.use("/users", user) //CRUD de usuario - ADMIN lee y borra => implementar ban y permaban?
// route.use('/auth/tokenConfirmed', token_confirmed)   //GET http://localhost:3000/auth/tokenConfirmed/:tokenId

router.use("/products", product) //CRUD - User y Admin
router.use("/categories",category) // CRUD - Admin
router.use("/google",google) 
// route.use("/products-cart", productCart) // CRUD - User y Admin
// route.use("/orders", order) 

// route.use('/conversations', conversation)
// route.use('/messages', message)





export default router