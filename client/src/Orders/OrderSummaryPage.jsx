import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { CartList, OrderSummary } from '../Cart';
import NavBar from '../Components/NavBar'
import {useContext,useEffect} from 'react'
import CartContext from '../Cart/CartContext'
import Cookie from 'js-cookie';
import axios from 'axios';
import {api} from '../actions'
import { useDispatch } from "react-redux";
//import { PayPalButtons } from "@paypal/react-paypal-js";
//import { useRouter } from 'next/router';

import {CREATEORDER, GETORDER} from '../actions'

export default function SummaryPage(){ // esta es la funcion principal

    const navegar = useNavigate()    
    const dispatch= useDispatch();
    const { cart,total,removeAllCartProduct } = useContext(CartContext);

    useEffect(()=>{ //si el carrito esta vacio no puede entrar a esta pagina
        if(!JSON.parse(Cookie.get('cart'))[0])navegar('/') //para refrescar la pagina, si esta vacio navega al home
    },[])

    const order = {products:cart, adress: "gandhi", isPaid: false, totalPrice: total }
    console.log('orden creada', order)

    const crearOrden = async ()=> {
     let ordenNueva = await dispatch(CREATEORDER(order))
     dispatch(GETORDER(ordenNueva.payload)).then(()=>
     navegar(`/orderpayment/${ordenNueva.payload}`))
     removeAllCartProduct()
    }

    return(
           <>
        <NavBar/>
        <Typography variant='h4'  sx={{mt:15,fontWeight:20}} display='flex' justifyContent='center'> Resumen de la orden</Typography>
        <Divider sx={{m:1,marginX:'10%'}}/>
            <Grid container sx={{mt:3}}>
                <Grid item xs={12} sm={7}>

                    <CartList editable={false}/>

                </Grid>

                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen</Typography>
                            <Divider sx={{my:1}}/>
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'> Dirección de entrega</Typography>
                                    <Link to="/modifyuser">
                                        Editar
                                    </Link>
                            </Box>

                            
                            {/* <Typography>{usuario?.name}</Typography>
                            <Typography>{usuario?.adress}</Typography>
                            <Typography>{usuario?.city}</Typography>
                            <Typography>{usuario?.phone}</Typography> */}

                            <Divider sx={{my:1}}/>

                            <Box display='flex' justifyContent='end'>
                                
                                <Link to="/cart">
                                    Editar
                                </Link>
                            </Box>

                            <OrderSummary/>

                            <Box sx={{mt:3}} >
            
                                    <Button color='secondary' className='circular-btn' fullWidth onClick={()=>crearOrden()}>
                                        Crear Orden
                                    </Button>                    

                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
               
            </Grid>

            </>
    )
}
