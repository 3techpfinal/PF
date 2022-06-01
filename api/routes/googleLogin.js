import { json, Router } from 'express';
import  { check } from 'express-validator';
import User from '../models/User.js'

import { OAuth2Client } from 'google-auth-library';
const router = Router();





const googleSignIn =async(req,res=response)=>{
    
    const {id_token}=req.body;

    try {

        //const usuario=await googleVerify(id_token);
        const {name, email, img}=await googleVerify(id_token);
        //console.log(googleUser)

        let usuario =  await User.findOne({email});

    
         if ( !usuario ) {
            // Tengo que crearlo
            const data = {
                name,
                email,
                password: ':P',
                //img,
                google: true
            };

            usuario = new User( data );
            await usuario.save();
        }

        // Si el usuario en DB
        if ( !usuario.suspendedAccount ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }
/*
        // Generar el JWT
        const token = await generarJWT( usuario.id );

        */


        res.json({
            usuario,
            msd: 'Todo bien!',
            id_token
        })
        
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'Token de Google no es válido'
        })
    }


}



router.post('/', [
    check('id_token','Token de google necesario').not().isEmpty()
],googleSignIn); 



const client = new OAuth2Client( '715638807647-7hjrrq0c7iqu0imiku0hc9nnmbo762h2.apps.googleusercontent.com' );

 async function googleVerify(idToken='') {
  const ticket = await client.verifyIdToken({
      idToken,
      audience: '715638807647-7hjrrq0c7iqu0imiku0hc9nnmbo762h2.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });

  const payload = ticket.getPayload();

  //console.log(payload);

   const { name: name, 
           picture: img, 
           email: email
         } = ticket.getPayload();
  
   return { name, img, email };

}



export default router;