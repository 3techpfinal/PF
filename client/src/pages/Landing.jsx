import { Grid,CardMedia, Box } from '@mui/material'
import { Container } from '@mui/system'
import * as React from 'react'
import ProductCard from '../components/products/ProductCard'
import NavBar from '../components/NavBar'
import NavBar2 from '../components/NavBar2'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useDispatch, useSelector } from 'react-redux'
import { GETPRODUCTS } from '../actions'
import Loading from './Loading'
import OrderByPrice from '../components/OrderByPrice'

const categories=['https://cdn.forbes.pe/2022/05/CELULARES.jpg','https://www.lifeder.com/wp-content/uploads/2016/11/video-juegos-1.jpg']

const Landing=()=>{

    const dispatch=useDispatch()
    React.useEffect(()=>{
        dispatch(GETPRODUCTS())
    },[dispatch])
    let products=useSelector((state)=>state.rootReducer.products)
    console.log("productos", products)
    
    return(
        products[0]?
            <Container sx={{mt:15,width:{xs:'100%'},minWidth:'100%',p:{xs:0}}}>
                <NavBar/>


                <Box >
                <Swiper 
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={40}
                    slidesPerView={1}
                    navigation
                    height={50}
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
                </Box>
                
                <Box sx={{m:'auto',maxWidth:1000}}>
                    <OrderByPrice/>
                </Box>

                <Grid container spacing={1} sx={{justifyContent:'center',mt:2}}>
                {typeof products === "string" ? <div>No hay productos con este nombre</div> :
                    products.map(e=>
                        <Grid item xs={5} md={3}  sx={{justifyContent:'center',mt:2}}>
                            <ProductCard key={e._id} product={e}/>
                        </Grid>)}

                </Grid>

               
            </Container>

        :<Loading/> 
   
    )
}

export default Landing