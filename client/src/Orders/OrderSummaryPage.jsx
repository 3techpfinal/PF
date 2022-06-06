import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { CartList, OrderSummary } from '../Cart';
import NavBar from '../Components/NavBar'
import {useContext} from 'react'
import CartContext from '../Cart/CartContext'

//import { PayPalButtons } from "@paypal/react-paypal-js";
//import { useRouter } from 'next/router';

import { AppDispatch,RootState } from '../store/index';
import { useDispatch, useSelector } from "react-redux";

import {CREATEORDER, GETORDER} from '../actions'

import { CartState } from '../Cart';
import { cartReducer } from '../Cart';
import { createDraftSafeSelector } from '@reduxjs/toolkit';


export default function SummaryPage(){ // esta es la funcion principal

    const usuario=useSelector((State)=>State.rootReducer.user)

    const navegar = useNavigate()    
    const dispatch= useDispatch();
    const { cart,total } = useContext(CartContext);

    const order = {products:cart, adress: "gandhi", isPaid: false, totalPrice: total }
    console.log('orden creada', order)

    const crearOrden = async ()=> {
     let ordenNueva = await dispatch(CREATEORDER(order))
     await dispatch(GETORDER(ordenNueva.payload))
     navegar(`/orderpayment/${ordenNueva.payload}`)
    }

    return(
           <>
        <NavBar/>
        <Typography variant='h1' component='h1' sx={{mt:15}} display='flex' justifyContent='center'> Resumen de la orden</Typography>

            <Grid container>
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