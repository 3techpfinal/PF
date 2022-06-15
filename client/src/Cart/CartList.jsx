import { useContext, useEffect,useState } from 'react';
//import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography, Chip, Card } from '@mui/material';
import  ItemCounter  from './ItemCounter.jsx';
import  CartContext  from './CartContext.jsx';
import { NavLink, useParams } from 'react-router-dom';
import { CreditScoreOutlined } from '@mui/icons-material';
import {api} from '../actions'
import axios from 'axios'
import Cookie from 'js-cookie'
import colorStyles from '../styles'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


import { useDispatch, useSelector } from "react-redux";
import {GETDETAIL,GETPRODUCTS} from '../actions'




export const CartList = ({ editable = false,order=false,orderIsPaid=false }) => { //por defecto order es false, si le paso una orden enlista la orden

    const dispatch=useDispatch()
    const {id} = useParams()

    /*useEffect(()=>{
        //dispatch(GETDETAIL(id))
        dispatch(GETPRODUCTS())
      },[dispatch])*/


    const productsBDD=useSelector((State) => State.rootReducer.products);
    const [BDD,setBDD]=useState([])
    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);


    /*useEffect(()=>{
        setBDD(()=>productsBDD.map(e=>({
            _id:e._id,
            stock:e.stock
            })))
    },[productsBDD])*/

    const array=order.products || cart

    const onNewCartQuantityValue = (product, newQuantityValue) => {
        product.quantity = newQuantityValue;
        updateCartQuantity( product );
        //////////MODIFICAR BDD/////////////
        const token=Cookie.get('token')
        var totalPrice=0
        cart.forEach((e)=>{
            totalPrice=totalPrice+e.price*e.quantity
        })
        axios.put(`${api}/cart`,{cart:cart,totalPrice},{ //modifica la base de datos
               headers:{
                  'x-access-token':token
               }
        })
    }
/*
    const newOrderQuantityValue = (product1,newQuantityValue) =>{
        product1.quantity = newQuantityValue;
        if(Cookie.get('token')){
            const token=Cookie.get('token')
            var totalPrice=0
            order.products.map( product => {
               if ( product._id !== product1._id ) return product; //si es igual, no es el producto que quiero actualizar, lo retorno asi como esta
               return product1; //producto actualizado con la cantidad actualizada
            }).forEach(e=>{
               totalPrice=totalPrice+e.price*e.quantity
            })
            /*axios.put(`${api}/cart`,{order.products.map( product => {
               if ( product._id !== action.payload._id ) return product; //si es igual, no es el producto que quiero actualizar, lo retorno asi como esta
               return action.payload; //producto actualizado con la cantidad actualizada
            }),totalPrice},{
                  headers:{
                     'x-access-token':token
                  }
         }) 

         }
    }*/

    const [tempCartProduct, setTempCartProduct] = useState({
        quantity: 1
      })

    const onUpdateQuantity = ( quantity ) => {
        setTempCartProduct( currentProduct => ({
            ...currentProduct,
            quantity
          }));
      }


    const calcularStock = (product,productsBdd)=>{
        let stockBdd=0;
        productsBdd.map((productBdd)=>(
            (productBdd.sotck===product.stock)&& (stockBdd=productBdd)
        ))
        return stockBdd
    }


    console.log("order",order)
    console.log("cart",cart)

    return (
        <>
            {
                array.map( product => (//product es un elemento del array cart
                    <Grid container spacing={2} key={ product._id } sx={{ mb:1 }}>
                        <Grid item xs={3}>

                            {/* MUESTRA LAS FOTOS */}
                            <NavLink to={`/product/${ product._id }`} >
                               <Card >
                                    { <CardActionArea>
                                        <CardMedia
                                            image={product.imageProduct?product.imageProduct[0]:"https://res.cloudinary.com/dnlooxokf/image/upload/v1651532672/sample.jpg"}
                                            component='img'
                                            sx={{ borderRadius: '5px',width: 150, height: 200, objectFit:'contain'}}
                                        />
                                    </CardActionArea> }
                                </Card>
                            </NavLink>
                        </Grid>



                        <Grid item xs={7}>
                                <Box display='flex' flexDirection='column'>
                                    <Typography variant='body1' sx={{fontSize:20, fontWeight:20}}>{ product.name }</Typography>
                                    { editable ?
                                    (
                                        // ITEM COUNTER
                                        <ItemCounter
                                            currentValue={order?tempCartProduct.quantity: product.quantity }
                                            maxValue={order? calcularStock(product,productsBDD):product.stock  } //SI SE CARGA UNA ORDEN, EL STOCK TIENE QUE VENIR DE LA BDD  NO DE LA ORDEN
                                            updatedQuantity={order?onUpdateQuantity : ( value ) => onNewCartQuantityValue(product, value )}
                                        />
                                    )
                                    :
                                    ( //CANTIDAD DE PRODUCTOS QUE SE VA A COMPRAR SIN MOSTRAR ITEM COUNTER
                                        <Typography variant='h5'>{ product.quantity } { product.quantity > 1 ? 'productos':'producto' }</Typography>
                                    )
                                    }
                                </Box>
                                <Box display='flex' flexDirection='column' >
                                    <Typography variant='h6'>{productsBDD.filter(e=>product._id===e._id)[0]?.stock } {'Disponibles'}</Typography>


                                    {!orderIsPaid?
                                        (product.quantity <= productsBDD.filter(productBDD=>product._id===productBDD._id)[0]?.stock) ?
                                        <Chip
                                        sx={{my:1, width:200}}
                                        label="En stock"
                                        variant='outlined'
                                        color="success"
                                        icon={ <CreditScoreOutlined/>}
                                        />
                                        :
                                        <Chip
                                        sx={{my:1, width:200}}
                                        label="No hay stock"
                                        variant='outlined'
                                        color="error"
                                        icon={ <CreditScoreOutlined/>}
                                        />:<></>
                                    }
                                </Box>

                        </Grid>

                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                         {/*mustro el porcentaje de descuento??*/}
                        {product.priceOriginal && product.price!==product.priceOriginal ? <Chip label={`-${(100-(product.price*100/product.priceOriginal)).toFixed(0)}%`} sx={{bgcolor:colorStyles.color2}}/>:<></>}
                       
                        {/* muestro los dos precios, uno tachado*/}
                        {product.priceOriginal && product.price!==product.priceOriginal ?
                        <div>
                            {'$'+new Intl.NumberFormat().format(product.price)}
                            <Typography><del> ${new Intl.NumberFormat().format(product.priceOriginal)}</del></Typography>
                        </div>
                        :
                        new Intl.NumberFormat().format(product.price)}

                        {editable && //SI ES EDITABLE ESTA EL BOTON BORRAR EN CADA PRODUCTO
                            (
                                <Button
                                    variant='text'
                                    color='secondary'
                                    onClick={ () => removeCartProduct( product ) }
                                >
                                    Borrar
                                </Button>
                            )
                        }
                    </Grid>
                </Grid>
                ))
            }
        </>
    )
}