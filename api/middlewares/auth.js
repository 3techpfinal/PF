import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import * as encrypter from '../helpers/encrypter.js'




export const signUp = async (req, res, next) => {
    const { name, lastName, email, password } = req.body

    try {
        const found = await User.find({ email });

        if (found.length > 0) {
            res.send('There is an account already created with this email')
        } else {

            const newUser = new User({name, lastName, email, password: await encrypter.encryptPassword(password) });

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
};



export const logIn = async (req, res) => {

    const { email, password } = req.body;

    const found = await User.findOne({ email })

    if (!found) return res.status(400).json({ message: 'Incorrect mail' });

    // ban => ver modelo User
    // if(found.suspendedAccount) return res.status(401).json({ message: 'Your account it´s temporary suspended.' })
    // if(!found.verified) return res.status(401).json({message : 'You need to verify your account first.'})

    const matchPassword = await encrypter.comparePasswords(password, found.password);

    if (!matchPassword) return res.status(401).json({ message: 'Incorrect password' })
    const token = jwt.sign({ id: found._id },  process.env.JWT_SECRET, { expiresIn: 86400 })

    // lo mando para que el Front lo capte y guarde, cookies, localStorage, reducer, donde sea más cómodo
    // https://rajaraodv.medium.com/securing-react-redux-apps-with-jwt-tokens-fcfe81356ea0
    res.json({ user : found, token });
}

