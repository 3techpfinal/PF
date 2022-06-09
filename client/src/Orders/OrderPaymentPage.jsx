import { Box, Button, Card, CardContent, Divider, Grid, Typography, Link, Chip,Container, CardMedia } from '@mui/material';
import { CartList, OrderSummary } from '../Cart';
import CartContext from '../Cart/CartContext'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { PayPalButtons,usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { GETORDER, PAYORDER,GETDETAIL } from '../actions';
import NavBar from '../Components/NavBar'
import Swal from 'sweetalert2/src/sweetalert2.js'
import swal from 'sweetalert';
import Cookie from 'js-cookie'

const currency = "USD";



const OrderPage=()=>{

    const actualUser = JSON.parse(Cookie.get('user'))
    //console.log("usuario",actualUser)
    const dispatch1=useDispatch()
    
    const [{ options }, dispatch] = usePayPalScriptReducer();
    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency]);




    const {id} = useParams()

    useEffect(()=>{
        dispatch1(GETORDER(id))
    },[])

    const order=useSelector((State) => State.rootReducer.order);
    console.log("order",order)
    const [isPaid,setIsPaid]=useState(order.isPaid?true:false)
    const [isPaid2,setIsPaid2]=useState(false)


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

           

            swal({
                title:"Felicitaciones!!",
                text:"Haz realizado el pago exitosamente",
                icon:"success",
                button:"Aceptars"
              })

    
        } catch (error) {
            //setIsPaying(false);
            console.log(error);
            alert('Error');
        }
    
       //window.location.reload();
     
    }
  
    return(
        <>  
            <NavBar/>

      
            <Box sx={{display:'flex',mt:15,alignItems:'center',justifyContent:'space-between',marginX:3}}>
            <CardMedia
            component="img"
            height="200"
            image={'https://tuderechoasaber.com.do/wp-content/uploads/2020/07/fuego.gif'}
            alt="gf"
            sx={{objectFit:'contain'}}
           />
           
            <Typography variant='h4'  sx={{fontWeight:20}}> Orden: {order._id}</Typography>
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
            </Box>
            <Divider sx={{m:1,marginX:'10%'}}/>
                       

            <Grid container>


                <Grid item xs={12} sm={7}>
                    <CartList editable={false} order={order.products}/>
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

                            <OrderSummary order={order}/>

                            <Box sx={{mt:3}}>
                             { console.log("actual",actualUser)}
                                { console.log("user",order)}


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

                                (
                                 (actualUser?._id||0)!==order?.user?._id||0?
                                 <></>
                                 :
                                <PayPalButtons
                                disabled={false}
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
                            />)
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