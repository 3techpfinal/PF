import { useContext, useEffect } from 'react';
//import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography, Chip, Card } from '@mui/material';
import  ItemCounter  from './ItemCounter.jsx';
import  CartContext  from './CartContext.jsx';
import { NavLink, useParams } from 'react-router-dom';
import { CreditScoreOutlined } from '@mui/icons-material';
import {api} from '../../actions'
import axios from 'axios'
import Cookie from 'js-cookie'
import { useDispatch, useSelector } from "react-redux";
import {GETDETAIL} from '../../actions'




export const CartList = ({ editable = false }) => {

    /*const dispatch=useAppDispatch()
    const {id} = useParams()
    useEffect(()=>{
      dispatch(GETDETAIL(id))
    },[dispatch,id])
    const productDb=useSelector((State:RootState) => State.rootReducer.detail); 

*/

    const { cart, updateCartQuantity, removeCartProduct,total } = useContext(CartContext);

    const onNewCartQuantityValue = (product, newQuantityValue) => {
        product.quantity = newQuantityValue;
        updateCartQuantity( product );
        const token=Cookie.get('token')
        var totalPrice=0
        cart.forEach((e)=>{
            totalPrice=totalPrice+e.price*e.quantity
        })
        axios.put(`${api}/cart`,{cart:cart,totalPrice},{
               headers:{
                  'x-access-token':token
               }
        }) 
    }

    return (
        <>
            {
                cart.map( product => (//product es un elemento del array cart
                    <Grid container spacing={2} key={ product._id } sx={{ mb:1 }}>
                        <Grid item xs={3}>
                            
                            <NavLink to={`/product/${ product._id }`} >
                               <Card>
                                    <CardActionArea>
                                        <CardMedia 
                                            image={product.imageProduct[0]}
                                            component='img'
                                            sx={{ borderRadius: '5px' }}
                                        />
                                    </CardActionArea>
                                </Card>
                            </NavLink>
                        </Grid>



                        <Grid item xs={7}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant='body1'>{ product.name }</Typography>

                                {
                                    editable 
                                    ? ( <div>
                                        <ItemCounter 
                                            currentValue={ product.quantity }
                                            maxValue={ product.stock  } 
                                            updatedQuantity={ ( value ) => onNewCartQuantityValue(product, value )}
                                        />
                                        
                                        <Typography variant='h6'>{ product.stock } {'Disponibles'}</Typography>
                                        {
                                            (product.quantity <= product.stock) ?
                                            <Chip
                                            sx={{my:1}}
                                            label="En stock"
                                            variant='outlined'
                                            color="success"
                                            icon={ <CreditScoreOutlined/>}
                                            />
                                            :
                                            <Chip
                                            sx={{my:1}}
                                            label="No hay stock"
                                            variant='outlined'
                                            color="error"
                                            icon={ <CreditScoreOutlined/>}
                                            />
                                        }

                                        
                                        </div>
                                    )
                                    : (
                                        <Typography variant='h5'>{ product.quantity } { product.quantity > 1 ? 'productos':'producto' }</Typography>
                                    )
                                }
                                
                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>{ `$${ product.price }` }</Typography>
                            
                            {
                                editable && (
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