import React from "react";
import NavBar from '../components/NavBar'
import { useState } from 'react';
import {Box, Button, Card, CardContent, Divider, Grid,Typography} from '@mui/material';
import { NavLink } from 'react-router-dom';
export default function CartPage() {


return(
    <div>
        <NavBar/>
        <Typography variant='h1' component='h1'> Carrito</Typography>

            <Grid container>
                <Grid item xs={12} sm={7}>
                    {/* <CartList editable/> */}
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Orden</Typography>
                            <Divider sx={{my:1}}/>

                            {/* <OrderSummary/> */}
                            <Box sx={{mt:3}}>
                                <NavLink  to='/summary'>
                                <Button color='secondary' className='circular-btn' fullWidth>
                                    Ir al checkout
                                </Button>
                                </NavLink>

                            </Box>

                            
                        </CardContent>
                        
                    </Card>
                </Grid>

            </Grid>
    </div>
)
}