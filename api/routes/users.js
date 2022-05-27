import { Router } from 'express';
import User from '../models/User.js';
import * as encrypter from '../helpers/encrypter.js'
import * as auth from '../middlewares/auth.js'
const router = Router();


//A la espera del sigUp y logIn => JWT, la asignación y verificación de roles
// express-validator
router.post('/signup', auth.signUp); 

// router.post('/login', auth.login);


router.get("/", async (req, res, next) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        next(error)
    }

});


router.get("/:id", async (req,res,next) => {
    const { id } = req.params;
    try {
        const found = await User.findById(id)
        return res.send(found)
    } catch (error) {
        res.status(404).json({ error: "Error : User not found" })
    }

});


router.delete('/:id', async (req, res, next) => {

    // el ban se logra quitando acceso temporal a la cuenta, habría que hacer una copia en otro esquema inaccesible, cosa de guardar los datos
    // front pregunta si confirma x acción

    // esto es permaban, ojo
    try {
        const { id } = req.params;
        const found = await User.findByIdAndRemove({ _id: id })
        res.json({ message: `User : ${found.userEmail} - ID : ${found._id} successfully deleted` })
    } catch (err) {
        next(err)
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (req.body.password) {
            // defino si el valor es password para darle un tratamientoo específico
            const encryptedPassword = await encrypter.encryptPassword(req.body.password)
            await User.findByIdAndUpdate(id, { $set:{password : encryptedPassword}});
            const updatedUser = await User.findById({ _id: id })
            return res.send(updatedUser)
        }
            await User.findByIdAndUpdate({ _id: id }, req.body);
            // le paso todo el body, el método compara y cambia todo automáticamente
            const updatedUser = await User.findById({ _id: id })
            res.send(updatedUser)
    } catch (err) {
        next(err)
    }

});


export default router;