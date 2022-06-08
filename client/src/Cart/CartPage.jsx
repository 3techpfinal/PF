import {Box, Button, Card, CardContent, Divider, Grid,Typography} from '@mui/material';
import { NavLink } from 'react-router-dom';
import {  OrderSummary } from './OrderSummary';
import { CartList } from './CartList';
import NavBar from '../Components/NavBar'


const CartPage=()=>{



    return(
        <>
            <NavBar/>
            <Typography variant='h4'  sx={{mt:15,fontWeight:20}} display='flex' justifyContent='center'> Carrito</Typography>
            <Divider sx={{m:1,marginX:'10%'}}/>
            <Grid container sx={{mt:3}}>
                <Grid item xs={12} sm={7}>
                    <CartList editable/>
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Orden</Typography>
                            <Divider sx={{my:1}}/>

                            <OrderSummary/>
                            <Box sx={{mt:3}}>
                                <NavLink  to='/ordersummary'>
                                <Button color='secondary' className='circular-btn' fullWidth>
                                    Ir al checkout
                                </Button>
                                </NavLink>

                            </Box>

                            
                        </CardContent>
                        
                    </Card>
                </Grid>

            </Grid>

            

 
       </>
    )
}

export default CartPage;