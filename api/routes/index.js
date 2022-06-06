import {Router} from "express";
import user from "./users.js";
import verifyAccount from './verifyAccount.js';
import resetPassword from './resetPassword.js';
import product from "./products.js";
import category from "./categories.js";
import order from './orders.js';
import cart from './carts.js'


const router = Router();

router.use("/users", user) //CRUD de usuario - ADMIN lee y borra => implementar ban y permaban?
router.use('/verified/tokenConfirmed', verifyAccount) //GET http://localhost:3000/auth/tokenConfirmed/:tokenId
router.use('/resetPassword', resetPassword)

router.use("/products", product) //CRUD - User y Admin
router.use("/categories",category) // CRUD - Admin

// route.use("/products-cart", productCart) // CRUD - User y Admin
// route.use("/orders", order) 

router.use("/cart", cart) // CRUD - User y Admin
router.use("/orders", order) 




export default router