import { Box, Button, Card, CardContent, Divider, Grid, Typography, Link, Chip } from '@mui/material';
import { CartList, OrderSummary } from '../Cart';
import CartContext from '../Cart/CartContext'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { PayPalButtons,usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { GETORDER, PAYORDER,GETDETAIL } from '../actions';


const amount = "2";
const currency = "USD";
const style = {"layout":"vertical"};
const OrderPage=()=>{

    const dispatch1=useDispatch()
    
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency]);

    
    
    const { cart,total } = useContext(CartContext);
    const {id} = useParams()

    useEffect(()=>{
        dispatch1(GETORDER(id))
    },[])

    const order=useSelector((State) => State.rootReducer.order);
    const [isPaid,setIsPaid]=useState(order.isPaid?true:false)
     //const detalle=useSelector((State) => State.rootReducer.detail);

    /* const producto=async(ide)=>{
         await dispatch(GETDETAIL(ide))
    }
*/
        useEffect(()=>{
            order.isPaid && setIsPaid(()=>true)
        },[order])

    const onOrderCompleted = async( details ) => {

        
        if ( details.status !== 'COMPLETED' ) {
            return alert('No hay pago en Paypal');
        }

        // order.products.forEach(async (product:any)=>{
        //     await producto(product._id)
        //     if(detalle.stock<product.quantity){
        //         return alert(`No hay stock suficiente de ${product.name}`);
        //     }
        // })
    
        //setIsPaying(true);
    
        try {
            console.log("verifico idOrden:", order._id)
        
            dispatch1(PAYORDER({transactionId: details.id, orderId: order._id}))

            setIsPaid(()=>true)
    
        } catch (error) {
            //setIsPaying(false);
            console.log(error);
            alert('Error');
        }
    
       //window.location.reload();
     
    }
  
    return(
        <>
            <Typography variant='h1' component='h1'> Orden: {order._id}</Typography>
            {isPaid===false?
                    <Chip
                        sx={{my:2}}
                        label="pendiente de pago"
                        variant='outlined'
                        color="error"
                        icon={ <CreditCardOffOutlined/>}
                    />

                    :<Chip
                        sx={{my:2}}
                        label="La orden ya fue pagada"
                        variant='outlined'
                        color="success"
                        icon={ <CreditScoreOutlined/>}
                    />
            }           

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
                               
                                    <Link underline='always'>
                                        Editar
                                    </Link>
       
                            </Box>

                            
                            {/*<Typography>{order.user.name}</Typography>
                            <Typography>{order.adress}</Typography>
                            <Typography>{order.user.country}</Typography>
                            <Typography>{order.user.phone}</Typography>*/}
                            {/* <Typography>{usuario.name}</Typography>
                            <Typography>{usuario.adress}</Typography>
                            <Typography>{usuario.city}</Typography>
                            <Typography>{usuario.phone}</Typography> */}

                            <Divider sx={{my:1}}/>

                            <Box display='flex' justifyContent='end'>
                                
                                    <Link underline='always'>
                                        Editar
                                    </Link>

                               
                            </Box>

                            <OrderSummary/>

                            <Box sx={{mt:3}}>
                                

                            {
                                isPaid?
                                <Chip
                                    sx={{my:2}}
                                    label="La orden ya fue pagada"
                                    variant='outlined'
                                    color="success"
                                    icon={ <CreditScoreOutlined/>}
                                />
                                :
                                <PayPalButtons
                                disabled={false}
                                forceReRender={[order.totalPrice]}
                                fundingSource={undefined}
                                createOrder={(data, actions) => {
                                    return actions.order
                                        .create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        currency_code: currency,
                                                        value: order.totalPrice,
                                                    },
                                                },
                                            ],
                                        })
                                        .then((orderId) => {
                                            // Your code here after create the order
                                            return orderId;
                                        });
                                }}
                                onApprove={function (data, actions) {
                                    return actions.order.capture().then(function (details) {
                                        // Your code here after capture the order
                                        onOrderCompleted( details );
                                    });
                                }}
                            />
                                }
                                       

                            </Box>                  
                        </CardContent>                   
                    </Card>
                </Grid> 
            </Grid>
            </>

    )
}

export default OrderPage;