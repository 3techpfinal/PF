import { FC } from 'react';

import { Grid, Card, CardContent, Typography,Button } from '@mui/material';
import { NavLink,Link } from 'react-router-dom';
import { useState, useEffect,useMemo } from "react";




export default function SummaryTile ({ title, subTitle, icon,link})  {


    const [isHovered, setIsHovered] = useState (false);
/*
    const productImage = useMemo(()=>{
        return title?isHovered?
          `${product.imageProduct[1]}`
        : `${product.imageProduct[0]}`
        : `${product.imageProduct[0]}`
         
    },[isHovered,product.imageProduct])

*/

  return (
    
    <Grid  item xs={12} sm={4} md={3}>
          

            <NavLink  to={`/${link}`} className={link===undefined?'disabled-link':''}> 
                <Card className='botonDashboard' sx={{ display: 'flex', height:'200' }}>
                    <CardContent sx={{ width: 50, display:'flex', justifyContent: 'center', alignItems: 'center' }}>
                        { icon }
                    </CardContent>
                    <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='h3'>{ title }</Typography>
                        <Typography variant='caption'>{ subTitle }</Typography>
                    </CardContent> 
                </Card>
            </NavLink>   
          
        
    </Grid>

   
  )
}
