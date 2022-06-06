import { useContext, useEffect } from 'react';
//import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography, Chip, Card } from '@mui/material';
import  ItemCounter  from './ItemCounter.jsx';
import  CartContext  from './CartContext.jsx';
import { NavLink, useParams } from 'react-router-dom';
import { CreditScoreOutlined } from '@mui/icons-material';
import colorStyles from '../styles'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


import { useDispatch, useSelector } from "react-redux";
import {GETDETAIL} from '../actions'




export const CartList = ({ editable = false }) => {

    const dispatch=useDispatch()
    const {id} = useParams()
    useEffect(()=>{
      dispatch(GETDETAIL(id))
    },[dispatch,id])
    const productDb=useSelector((State) => State.rootReducer.detail); 



    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

    const onNewCartQuantityValue = (product, newQuantityValue) => {
        product.quantity = newQuantityValue;
        updateCartQuantity( product );
    }

console.log("cartss",cart)
    return (
        <>
            {
                cart?.map( product => (//product es un elemento del array cart
                    <Grid container spacing={2} key={ product._id } sx={{ mb:1 }}>
                        <Grid item xs={3}>
                            
                            <NavLink to={`/product/${ product._id }`} >
                               <Card>
                                    { <CardActionArea>
                                        <CardMedia 
                                            image={product.imageProduct?product.imageProduct[0]:"https://res.cloudinary.com/dnlooxokf/image/upload/v1651532672/sample.jpg"}
                                            component='img'
                                            sx={{ borderRadius: '5px',width: 200, height: 200, objectFit:'contain'}}
                                            height="250"
                                        />
                                    </CardActionArea> }
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
                            
                            {product.discount?<Chip label={`-${product.discount}%`} sx={{bgcolor:colorStyles.color2}}/>:<></>}
                            {console.log("descuento",product.discount)}
                            
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