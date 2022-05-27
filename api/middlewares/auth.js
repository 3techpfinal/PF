import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import * as encrypter from '../helpers/encrypter.js'



export const signUp = async (req, res, next) => {
    const { userFirstName, userLastName, userEmail, userPassword } = req.body

    try {
        const found = await User.find({ userEmail });

        if (found.length > 0) {
            res.send('There is an account already created with this email')
        } else {

            const newUser = new User({ userFirstName, userLastName, userEmail, userPassword: await encrypter.encryptPassword(userPassword) });

            newUser.setCreationDate();

            // verificación cuenta vía mail 

            //aunque se haya guardado, necesita confirmar la cuenta para poder logearse
            await newUser.save();

            // no creo token para esperar la confirmación del mail y luego logeo manual
            // const token = jwt.sign({ id: newUser._id }, config.SECRET_JWT, { expiresIn: 86400 /*24hs*/ })

            // https://rajaraodv.medium.com/securing-react-redux-apps-with-jwt-tokens-fcfe81356ea0
            res.json({ user: newUser.name })
        }

    } catch (err) {
        next(err)
    }
}


