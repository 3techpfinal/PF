import { Grid,CardMedia, Box, Typography, Divider } from '@mui/material'
import { Container } from '@mui/system'
import * as React from 'react'
import ProductCard from '../components/products/ProductCard'
import NavBar from '../components/NavBar'
import { Autoplay,Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useDispatch, useSelector } from 'react-redux'
import { GETPRODUCTS } from '../actions'
import Loading from './Loading'
import OrderByPrice from '../components/OrderByPrice'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/500.css';

const categories=['https://cdn.forbes.pe/2022/05/CELULARES.jpg','https://www.lifeder.com/wp-content/uploads/2016/11/video-juegos-1.jpg']

const Landing=()=>{


    const [nameCatg,setNameCatg]=React.useState('Productos')
    const dispatch=useDispatch()

    
    let products=useSelector((state)=>state.rootReducer.products)
    React.useEffect(()=>{
        if(!products[0])dispatch(GETPRODUCTS())
    },[dispatch])

    
    
    
    React.useEffect(()=>{      
            var inicial='Productos'
            if(typeof products === "string")return setNameCatg(()=>inicial)//si es string es porque el back tira error, no encontro producto por ej
            if(!products[0])return setNameCatg(()=>inicial)
            else{
                var ref=products[0].category.name
                products.forEach((e)=>{
                    setNameCatg(()=>e.category.name)
                    if(e.category.name!==ref)setNameCatg(()=>inicial)
                })
            }
    },[products])

    return(
        products[0]?
            <Container sx={{mt:12,width:{xs:'100%'},minWidth:'100%',p:{xs:0}}}>
                <NavBar/>


                <Box >
                <Swiper 
                    modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={40}
                    slidesPerView={1}
                    navigation
                    height={50}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: true,
                      }}
                >
                    {categories.map(e=>
                        <SwiperSlide key={e._id}>
                            <CardMedia
                            component="img"
                            height="300"
                            image={e}
                            alt="gf"
                            sx={{objectFit:'cover'}}
                            key={e._id}
                            />
                        </SwiperSlide>)}
                </Swiper>
                </Box>
                
                <Box sx={{marginX:4,mt:1,maxWidth:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Typography variant='h4' sx={{fontWeight:20}}>{nameCatg}</Typography>
                    <OrderByPrice/>
                </Box>
                        <Divider sx={{marginX:3}}/>

                {typeof products === "string" ? 
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center',mt:3}}>
                <Typography variant='h4' sx={{m:3}}>No hay productos con este nombre</Typography>
                </Box>
                :
                <Grid container spacing={1} sx={{justifyContent:{xs:'space-around',md:'flex-start'},mt:2}}>
                
                    {products.map(e=>
                        <Grid key={e._id} item xs={5} md={3}  sx={{display:'flex',justifyContent:'center',m:'auto',marginX:0}}>
                            <ProductCard key={e._id} product={e}/>
                        </Grid>)}

                </Grid>}

               
            </Container>

        :<Loading/> 
   
    )
}

export default Landing