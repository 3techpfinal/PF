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

const product={
  productName:'Iphone 11',
  img:['https://www.macstation.com.ar/img/productos/small/1680-1111.jpg','https://buytek.net/wp-content/uploads/2021/10/Iphone-13-Pro.8.png','https://buytek.net/wp-content/uploads/2021/10/Iphone-13-Pro.11.png','https://res-5.cloudinary.com/grover/image/upload/e_trim/c_limit,f_auto,fl_png8.lossy,h_1280,q_auto,w_1280/v1632411274/etqcbwhzrg0verxuwgie.png'],
  productDescription:'Pantalla OLED 5G ultrarrápida en pantalla Capacidad de 128 GB Sistema de cámara Pro Hasta 28 horas de reproducción de vídeo Compatible con accesorios MagSafe Desbloqueado (desbloqueado)',
  productPrice:'$390000',
  productStock: 200
}

export default function ProductCard() {
  const [isHovered, setIsHovered] = useState (false);

    const productImage = useMemo(()=>{
        return product.img[1]?
        isHovered?
          `${product.img[1]}`
        : `${product.img[0]}`
        : `${product.img[0]}`
         
    },[isHovered,product.imageProduct])
  return (
    <Card sx={{ maxWidth: 250,mt:5 }}
    onMouseEnter={()=> setIsHovered(true)}
    onMouseLeave={()=> setIsHovered(false)}>
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
                    Iphone 11
                </Typography>
                <Chip label="-10%" sx={{bgcolor:'#9dff00'}}/>
            </Box>
            <Typography gutterBottom variant="h5" sx={{color:'white',fontWeight:'500'}}>
                    $ 390000
            </Typography>
          
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
