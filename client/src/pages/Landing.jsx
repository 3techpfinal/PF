import { Grid,CardMedia } from '@mui/material'
import { Container } from '@mui/system'
import * as React from 'react'
import ProductCard from '../components/products/ProductCard'
import NavBar from '../components/NavBar'
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const categories=['https://cdn.forbes.pe/2022/05/CELULARES.jpg','https://www.lifeder.com/wp-content/uploads/2016/11/video-juegos-1.jpg']

const Landing=()=>{
    return(
        <Container>
            <NavBar/>
            <Container sx={{mt:10}}>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={40}
                slidesPerView={1}
                navigation
                >
                {categories.map(e=><SwiperSlide>
                    <CardMedia
                    component="img"
                    height="400"
                    image={e}
                    alt="gf"
                    sx={{objectFit:'cover'}}
                    />
                </SwiperSlide>)}
                </Swiper>
            </Container>
            <Grid container spacing={1} sx={{justifyContent:'center',mt:3}}>
                <Grid item xs={5} md={3}>
                    <ProductCard/>
                </Grid>
                <Grid item xs={5} md={3}>
                    <ProductCard/>
                </Grid>
                <Grid item xs={5} md={3}>
                    <ProductCard/>
                </Grid>
                <Grid item xs={5} md={3}>
                    <ProductCard/>
                </Grid>

                <Grid item xs={5} md={3}>
                    <ProductCard/>
                </Grid>
                <Grid item xs={5} md={3}>
                    <ProductCard/>
                </Grid>
                <Grid item xs={5} md={3}>
                    <ProductCard/>
                </Grid>
                <Grid item xs={5} md={3}>
                    <ProductCard/>
                </Grid>
                <Grid item xs={5} md={3}>
                    <ProductCard/>
                </Grid>
                <Grid item xs={5} md={3}>
                    <ProductCard/>
                </Grid>
                <Grid item xs={5} md={3}>
                    <ProductCard/>
                </Grid>
                <Grid item xs={5} md={3}>
                    <ProductCard/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Landing