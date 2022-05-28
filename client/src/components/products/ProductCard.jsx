import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea,Chip, IconButton,Box,Container } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/500.css';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import{useMemo,useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useNavigate } from 'react-router-dom';


export default function ProductCard({product}) {
  const [isHovered, setIsHovered] = useState (false);
  const navigate=useNavigate()

    const productImage = useMemo(()=>{
        return product.imageProduct[1]?
        isHovered?
          `${product.imageProduct[1]}`
        : `${product.imageProduct[0]}`
        : `${product.imageProduct[0]}`
         
    },[isHovered,product.imageProduct])
  return (
    <Card sx={{ maxWidth: 250,mt:5 }}
    onMouseEnter={()=> setIsHovered(true)}
    onMouseLeave={()=> setIsHovered(false)}
    onClick={()=>navigate(`/product/${product._id}`)}>
      <CardActionArea>
       <CardMedia
            component="img"
            height="200"
            image={productImage}
            alt="gf"
            sx={{objectFit:'contain'}}
           />
        <CardContent sx={{bgcolor:'#3d3d3d'}}>
            <Box sx={{display:'flex',alignItems:'flex-start',justifyContent:'space-between'}}>
                <Typography gutterBottom variant="h5" sx={{color:'white',fontWeight:'200'}}>
                    {product.name}
                </Typography>
                <Chip label="-10%" sx={{bgcolor:'#9dff00'}}/>
            </Box>
            <Typography gutterBottom variant="h5" sx={{color:'white',fontWeight:'500'}}>
                    $ {product.price}
            </Typography>
          
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
