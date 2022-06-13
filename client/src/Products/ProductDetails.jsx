import * as React from 'react'
import { Container,Box } from '@mui/system'
import NavBar from '../Components/NavBar'
import { Divider, Typography,Chip,Rating, IconButton,CardMedia } from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/500.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import color from '../styles'
import ProductCard from './CardProduct'
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { useState, useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import  CartContext from '../Cart/CartContext';
import ItemCounter from '../Cart/ItemCounter';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../Components/Loading'
import { GETDETAIL,GETRECOMMENDED } from '../actions';


const ProductDetails=()=>{

    const dispatch=useDispatch()
    const product=useSelector((state)=>state.rootReducer.detail)
    const recommended=useSelector((state)=>state.rootReducer.recommended)
    const [loaded,setLoaded]=React.useState(false)
    const {id}=useParams()
    const [tempCartProduct, setTempCartProduct] = useState({})

    React.useEffect(()=>{
        window.scrollTo(0, 0)
        dispatch(GETDETAIL(id)).then(()=>dispatch(GETRECOMMENDED(id))).then(()=>setLoaded(true))

    },[dispatch,id])

    
    React.useEffect(()=>setTempCartProduct(()=>({//cuando se llene prodcut (con GETDETAIL) setea el tempcardproduct
        _id: product._id,
        imageProduct: product.imageProduct,
        price: product.price,
        name: product.name,
        category: product.category,
        quantity: 1,
        envio: product.envio,
        rating: product.rating,
        review: product.review,
        description: product.description,
        stock: product.stock,
        hasReview:0
      })),[product])
      
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

    const { addProductToCart,cart} = useContext( CartContext )


    
      const onUpdateQuantity = ( cantidad ) => {
        setTempCartProduct( currentProduct => ({
          ...currentProduct,
          quantity: cantidad
        }));
      }

    const onAddProduct = () => {  
      //cuando uso addProductToCart me acttualiza tempCartProduct.quantity no se porque, 
      //entonces lo guardo en una variable y al final lo vuelvo a 
      //asignar con onUpdateQuantity(cant), esto me soluciona un bug del itemCounter      
        let cant = tempCartProduct.quantity 
        addProductToCart(tempCartProduct) //agrego el producto en el carrito
        cart.map( product => ( // mapeo todos los productos y si el stock es menor a la cantidad pedida lo aviso con alert y... 
            (product._id===tempCartProduct._id && product.quantity>=product.stock) && (product.quantity=product.stock,alert("no hay stock"))
        ))
        onUpdateQuantity(cant) //solamente dejo que hayan pedidos la cantidad de productos en stock, aca seteo el
   }


    return (
        loaded?<Container sx={{mt:15}}>
            <NavBar/>
            <Box sx={{boxShadow:'rgba(0, 0, 0, 0.35) 0px 5px 15px;',display:'flex',justifyContent:'space-between',flexDirection:{xs:'column',md:'row'},borderRadius:3,alignItems:'center'}}>
             
                <Container sx={{width:{xs:'100%',md:'50%'},height:'50%',display:'flex',alignItems:'center',marginY:3}}>
                <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={40}
                slidesPerView={1}
                navigation
                >
                {product.imageProduct.map(e=><SwiperSlide>
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
                                <Typography sx={{fontSize:{xs:20,sm:30},maxHeight:100}}>{product.name.length>40?product.name.slice(0,35)+'...':product.name}</Typography>
                                {product.isActive?<IconButton 
                                sx={{bgcolor:color.color2,borderRadius:3,fontSize:{xs:10,sm:15},color:'black',height:50}}
                                onClick={ onAddProduct }>
                                    Agregar al carrito 
                                    <AddShoppingCartIcon sx={{ml:1}}/>
                                </IconButton>:
                                <IconButton 
                                sx={{bgcolor:'red',borderRadius:3,fontSize:{xs:10,sm:15},color:'black',height:50}}
                                >
                                    Este producto no esta disponible 
                                </IconButton>
                                }
                                
                            </Box>

                            <Chip label={`${product.stock} En Stock`} sx={{bgcolor:color.color2}}></Chip>

                            <Box display='flex' flexDirection='row'>
                                <Box>
                                {product.priceOriginal && product.price!==product.priceOriginal ?
                                    <div>
                                        <Typography variant='h5' sx={{mt:1,fontWeight:12}}>{'$'+new Intl.NumberFormat().format(product.price)} </Typography>
                                        <Typography><del> ${new Intl.NumberFormat().format(product.priceOriginal)}</del></Typography>
                                    </div>
                                    :
                                    <Typography variant='h5' sx={{mt:1,fontWeight:12}}> {'$'+new Intl.NumberFormat().format(product.price)} </Typography>}                  
                                </Box>
                                <Box display='flex' justifyContent="end">
                                    {product.priceOriginal && product.price!==product.priceOriginal ? <Chip label={`-${(100-(product.price*100/product.priceOriginal)).toFixed(0)}%`} sx={{bgcolor:color.color2}}/>:<></>}
                                </Box>
                            </Box>

                                <Box sx={{my:2,display:'flex',alignItems:'center',justifyContent:'left'}}>
                                    <Typography variant='subtitle2'>Cantidad </Typography>
                                    <ItemCounter 
                                        currentValue={ tempCartProduct.quantity }
                                        maxValue={ product.stock }
                                        updatedQuantity={ (value)=>onUpdateQuantity(value)  } 
                                    />
                                </Box>
                            
                            <Typography overflow={'auto'} variant='body1' sx={{mt:2,maxHeight:200}}>{product.description}</Typography>


                            
                        </Box>
                    </Box>
                   

                    <Box sx={{flexDirection:'column',p:0}}>
                        <Box sx={{m:1,border:'1px solid lightgray',borderRadius:5}}>
                            {/* {typo('Marca: Apple')}
                            {divider()}
                            {typo('Modelo: 11')}
                            {divider()}
                            {typo('Color: Violeta')}
                            {divider()} */}
                            {typo(`Stock: ${product.stock}`)}
                            {divider()}
                            <Box sx={{display:'flex',alignItems:'center'}}>
                            {typo('Valoracion: ')}
                            <Rating readOnly defaultValue={product.rating}/>
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
                breakpoints= {{
                    300: {
                      slidesPerView: 2,
                      spaceBetween: 5,
                    },
                    900: {
                      slidesPerView: 3,
                      spaceBetween: 10,
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                      }
                }}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                navigation
                >
                {recommended.filter((e)=>e.isActive===true).map(e=><SwiperSlide><ProductCard product={e}/></SwiperSlide>)}
            </Swiper>
                </Container>
            </Box>
            
        </Container>:<Loading/>
    )
}

export default ProductDetails