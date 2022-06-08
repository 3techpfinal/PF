import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea,Chip, IconButton,Box,Tooltip } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/500.css';
// import Swiper core and required modules
//import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import{useMemo,useState,useContext} from 'react'
//import { Swiper, SwiperSlide } from 'swiper/react';
import colorStyles from '../styles'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import  CartContext from '../Cart/CartContext';


export default function ProductCard({product}) {
  const [isHovered, setIsHovered] = useState (false);
  const [colorHeart, setColorHeart] = useState ("black");
  const navigate=useNavigate()

    const productImage = useMemo(()=>{
        return product.imageProduct[1]?
        isHovered?
          `${product.imageProduct[1]}`
        : `${product.imageProduct[0]}`
        : `${product.imageProduct[0]}`
         
    },[isHovered,product.imageProduct])


    const { addProductToCart,cart} = useContext( CartContext )

    const [tempCartProduct, setTempCartProduct] = useState({
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
      priceOriginal: product.priceOriginal||product.price
    })

    const onUpdateQuantity = ( quantity ) => {
      setTempCartProduct( currentProduct => ({
        ...currentProduct,
        quantity
      }));
    }

    const addToWishList = () => { 
      colorHeart==="black"?setColorHeart("red"):setColorHeart("black")
    }


    const onAddProduct = () => {  
      //cuando uso addProductToCart me acttualiza tempCartProduct.quantity, 
      //entonces lo guardo en una variable cant y al final lo vuelvo a 
      //cargar con onUpdateQuantity(cant), esto me soluciona un bug del carrito, el cual me duplica la cantidad que 
      //coloca en el carrito cada vez que hago click      
       let cant = tempCartProduct.quantity 
       addProductToCart(tempCartProduct) //agrego el producto en el carrito
        cart.map( product => ( // mapeo todos los productos y si el stock es menor a la cantidad pedida lo aviso con alert y... 
          (product._id===tempCartProduct._id && product.quantity>=product.stock) && (product.quantity=product.stock,alert("Ese fue el último en Stock"))
        ))
        onUpdateQuantity(cant) //
   }


  return (
    <Card sx={{ width: 250,mt:5 }}
    onMouseEnter={()=> setIsHovered(true)}
    onMouseLeave={()=> setIsHovered(false)}
    >
        <Tooltip title="Agregar a favoritos" placement="top">
          <IconButton onClick={ addToWishList } style={{color: colorHeart}}>
            <FavoriteIcon />
          </IconButton>
        </Tooltip> 

        <Tooltip title="Agregar al carrito" placement="top">
          <IconButton  onClick={ onAddProduct } style={{color: "black"}}>
            <AddShoppingCartIcon  sx={{ml:1}}/>
          </IconButton>
        </Tooltip>

      <CardActionArea
      onClick={()=>navigate(`/product/${product._id}`)}
      >

       <CardMedia
            component="img"
            height="200"
            image={productImage}
            alt="gf"
            sx={{objectFit:'contain'}}
           />
        <CardContent sx={{bgcolor:colorStyles.color1,height:100}}>

            <Tooltip title={product.name} placement="top">  
                <Box sx={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',mb:1}}>
                  <Typography gutterBottom variant="h6" sx={{color:'white',fontWeight:'200'}}>
                  {product.name.slice(0,15)}
                  </Typography>
                  {product.priceOriginal && product.price!==product.priceOriginal ? <Chip label={`-${(100-(product.price*100/product.priceOriginal)).toFixed(0)}%`} sx={{bgcolor:colorStyles.color2}}/>:<></>}
                </Box>
            </Tooltip>

            

            <Box sx={{color:'white',fontWeight:'500',display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
              <Box>
                     {product.priceOriginal && product.price!==product.priceOriginal ?
                       <div>
                         <Typography>{'$'+new Intl.NumberFormat().format(product.price)}</Typography>
                         <Typography><del> ${new Intl.NumberFormat().format(product.priceOriginal)}</del></Typography>
                        </div>
                      :
                      <Typography>${new Intl.NumberFormat().format(product.price)}</Typography> }
            </Box>
            <Box sx={{display:'flex',justifyContent:'flex-end'}}>         
               <Chip label= {`${product.stock} en Stock`} sx={{bgcolor:colorStyles.color2}}/>
            </Box> 
              
            </Box> 


        </CardContent>
      </CardActionArea>
    </Card>
  );
}