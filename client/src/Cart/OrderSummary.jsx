import { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { GETORDER } from '../actions';
import { useParams } from 'react-router-dom';



export const OrderSummary = () => {
    const {id}=useParams()
    const dispatch=useDispatch()

    const order=useSelector((state)=>state.rootReducer.order)

    useEffect(()=>{
        dispatch(GETORDER(id))
    },[dispatch,id])

    // const items=order?order.products.length:numberOfItems
    // const amount=order?order.totalPrice:total
  return (
    order.products?
    
    <Grid container>
        
        <Grid item xs={6}>
            <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{order.products.length} { order.products.length > 1 ? 'productos': 'producto' }</Typography>
        </Grid>



        <Grid item xs={6} sx={{ mt:2 }}>
            <Typography variant="subtitle1">Total:</Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt:2 }} display='flex' justifyContent='end'>
          


          
            <Typography  variant="subtitle1">{ `$ ${order.totalPrice}` }</Typography>
          
        </Grid>


    </Grid>:<></>
  )
}
