import { useContext } from 'react';
import { Grid, Typography,Del } from '@mui/material';
import  CartContext  from './CartContext';



export const OrderSummary = ({order=false}) => {

    const {numberOfItems, total } = useContext( CartContext );

    const items=order?order.products.length:numberOfItems
    const amount=order?order.totalPrice:total
  return (
    <Grid container>
        
        <Grid item xs={6}>
            <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{items} { items > 1 ? 'productos': 'producto' }</Typography>
        </Grid>



        <Grid item xs={6} sx={{ mt:2 }}>
            <Typography variant="subtitle1">Total:</Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt:2 }} display='flex' justifyContent='end'>
          


          
            <Typography  variant="subtitle1">{ `$ ${amount}` }</Typography>
          
        </Grid>


    </Grid>
  )
}
