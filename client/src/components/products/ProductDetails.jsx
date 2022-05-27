import * as React from 'react'
import { Container,Box } from '@mui/system'
import NavBar from '../NavBar'
import { Divider, Typography,Chip,Rating, IconButton,Paper,Button,CardMedia } from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/500.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import color from '../../styles'
import ProductCard from './ProductCard'
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



const ProductDetails=()=>{
    const product={
        productName:'Iphone 11',
        img:['https://www.macstation.com.ar/img/productos/small/1680-1111.jpg','https://buytek.net/wp-content/uploads/2021/10/Iphone-13-Pro.8.png','https://buytek.net/wp-content/uploads/2021/10/Iphone-13-Pro.11.png','https://res-5.cloudinary.com/grover/image/upload/e_trim/c_limit,f_auto,fl_png8.lossy,h_1280,q_auto,w_1280/v1632411274/etqcbwhzrg0verxuwgie.png'],
        productDescription:'Pantalla OLED 5G ultrarrápida en pantalla Capacidad de 128 GB Sistema de cámara Pro Hasta 28 horas de reproducción de vídeo Compatible con accesorios MagSafe Desbloqueado (desbloqueado)',
        productPrice:'$390000',
        productStock: 200
    }
    const typo=(texto)=>{
        return(
            <Typography sx={{m:1,p:1,ml:3}}>{texto}</Typography>
        )
    }
    const divider=()=>{
        return(
            <Divider sx={{marginX:3}}/>
        )
    }
    return (
        <Container sx={{mt:15}}>
            <NavBar/>
            <Box sx={{boxShadow:'rgba(0, 0, 0, 0.35) 0px 5px 15px;',display:'flex',justifyContent:'space-between',flexDirection:{xs:'column',md:'row'},borderRadius:3,alignItems:'center'}}>
             
                <Container sx={{width:'50%',height:'50%',display:'flex',alignItems:'center',marginY:3}}>
                <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={40}
                slidesPerView={1}
                navigation
                >
                {product.img.map(e=><SwiperSlide>
                    <CardMedia
                    component="img"
                    height="400"
                    image={e}
                    alt="gf"
                    sx={{objectFit:'contain'}}
                    />
                </SwiperSlide>)}
                </Swiper>
                </Container>

                <Box sx={{flexDirection:'column'}}>
                    <Box sx={{flexDirection:'column'}}>
                        <Box sx={{m:1,border:'1px solid lightgray',p:3,pt:1,borderRadius:5}}>
                            <Box sx={{display:'flex',justifyContent:'space-between'}}>
                                <Typography sx={{fontSize:{xs:30}}}>{product.productName}</Typography>
                                <IconButton sx={{bgcolor:color.color2,borderRadius:3,fontSize:{xs:10,sm:15},color:'black'}}>
                                    Agregar al carrito 
                                    <AddShoppingCartIcon sx={{ml:1}}/>
                                </IconButton>
                            </Box>
                            <Typography variant='h5' sx={{mt:1,fontWeight:12}}>{product.productPrice+' '} <Chip label="-10%" sx={{bgcolor:color.color2}}/></Typography>
                            <Typography variant='body1' sx={{mt:2}}>{product.productDescription}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{flexDirection:'column',p:0}}>
                        <Box sx={{m:1,border:'1px solid lightgray',borderRadius:5}}>
                            {typo('Marca: Apple')}
                            {divider()}
                            {typo('Modelo: 11')}
                            {divider()}
                            {typo('Color: Violeta')}
                            {divider()}
                            {typo(`Stock: ${product.productStock}`)}
                            {divider()}
                            <Box sx={{display:'flex',alignItems:'center'}}>
                            {typo('Valoracion: ')}
                            <Rating readOnly defaultValue={4}/>
                            </Box>

                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{boxShadow:'rgba(0, 0, 0, 0.35) 0px 5px 15px;',display:'flex',justifyContent:'space-between',flexDirection:'column',borderRadius:3,mt:4,mb:3}}>
                <Typography sx={{fontSize:{xs:15,md:30},m:2,ml:4}}>Productos Relacionados</Typography>
                {divider()}
                <Container sx={{mb:2}}>
                <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={40}
                slidesPerView={4}
                navigation
                >
                <SwiperSlide><ProductCard/></SwiperSlide>
                <SwiperSlide><ProductCard/></SwiperSlide>
                <SwiperSlide><ProductCard/></SwiperSlide>
                <SwiperSlide><ProductCard/></SwiperSlide>
                <SwiperSlide><ProductCard/></SwiperSlide>
                <SwiperSlide><ProductCard/></SwiperSlide>
                <SwiperSlide><ProductCard/></SwiperSlide>
                <SwiperSlide><ProductCard/></SwiperSlide>
                <SwiperSlide><ProductCard/></SwiperSlide>
                <SwiperSlide><ProductCard/></SwiperSlide>
            </Swiper>
                </Container>
            </Box>
            
        </Container>
    )
}

export default ProductDetails