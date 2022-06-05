import Cookie from 'js-cookie'; 
import axios from 'axios'
import {api} from '../../actions'
import { useAuth0 } from '@auth0/auth0-react';

export const cartReducer = ( state, action) => {
   

   switch (action.type) {
      case '[Cart] - LoadCart from cookies | storage':
         return {
            ...state,
            cart: [...action.payload]
          }


      case '[Cart] - Add Product':
         return {
            ...state,
            cart: [ ...state.cart,...action.payload ]
         }


         case '[Cart] - Update products in cart':
            if(Cookie.get('token')){
               const token=Cookie.get('token')
               var totalPrice=0
               action.payload.forEach(e=>{
                  totalPrice=totalPrice+e.price*e.quantity
               })
               axios.put(`${api}/cart`,{cart:action.payload,totalPrice},{
                     headers:{
                        'x-access-token':token
                     }
             }) 
   
            }
            return {
               ...state,
               cart: [ ...action.payload ]
            }


      case '[Cart] - Change cart quantity': //se genera al presionar los + - del componentes itemCounter
         return {
            

            ...state,
            cart: state.cart.map( product => {
               if ( product._id !== action.payload._id ) return product; //si es igual, no es el producto que quiero actualizar, lo retorno asi como esta
               return action.payload; //producto actualizado con la cantidad actualizada
            })
         }


      case '[Cart] - Remove product in cart':
         if(state.cart.length===1)Cookie.set('cart', JSON.stringify([]));
         return {
            ...state,
            cart: state.cart.filter( product => !(product._id === action.payload._id  ))
         }

         case '[Cart] - Remove all product in cart':
            Cookie.set('cart', JSON.stringify([]));
            // const token3=Cookie.get('token')
            // axios.put(`${api}/cart`,{cart:[],totalPrice:0},{
            //       headers:{
            //          'x-access-token':token3
            //       }
            // }) 
            return {
               ...state,
               cart: []
            }

      case '[Cart] - Update order summary':
         return {
            ...state,
            ...action.payload
         }

       default:
          return state;
   }

}