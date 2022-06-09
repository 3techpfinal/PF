import React from "react";
import NavBar from "../Components/NavBar"
import { useState,useRef,useEffect } from 'react';
import {   useNavigate } from "react-router-dom"
//import { Link } from "react-router-dom";
import { TextField,Select,Container, CardMedia,Link, Box, UploadOulined,InputLabel, OutlinedInput, InputAdornment, MenuItem, Typography, Button, FormLabel, FormControlLabel } from '@mui/material';
import {GETCATEGORIES,GETDETAIL,MODIFYPRODUCT,GETPRODUCTS} from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import { UploadOutlined } from '@ant-design/icons';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

//var cloudinary = require('cloudinary').v2;
//import { v2 as cloudinary } from 'cloudinary';
//cloudinary.config( process.env.CLOUDINARY_URL || '' );
//cloudinary.config( 'cloudinary://194456155422281:5zFQO4yzRgVJZvpI557kVlR_XP4@dnlooxokf' );

//const regex=/^[0-9]+$/


export default function EditarPublicacion() {
  const dispatch=useDispatch()

  const {id}=useParams()
  const product=useSelector((state)=>state.rootReducer.detail)

  useEffect(()=>{
    dispatch(GETDETAIL(id))
},[dispatch])

useEffect(()=>{
  dispatch(GETCATEGORIES())
},[dispatch])

 


  const fileInputRef=useRef(null) //para esconder el boton feo de input
  const fileInputRef2=useRef(null) //para esconder el boton feo de input


  const categories=useSelector((state)=>state.rootReducer.categories)
  const[input,setInput]=useState({name:'' ,price:0, priceOriginal:0,category:'',description:'',stock:1,imageProduct:[""],rating:0})
  const[images,setImages]=useState([]);//array de strings de url de imagenes 
  const[upLoading,setUpLoading]=useState(false) //estado que sirve para mostrar "cargando foto"
  const navegar = useNavigate()  //para navegar al home luego de postear el formulario

  console.log('productos',product)
  console.log('input',input)


  useEffect(()=>(setInput({
    _id: product._id,
    imageProduct: product.imageProduct,
    price: product.price,
    name: product.name,
    category: product.category,
    description: product.description,
    stock: product.stock,
    priceOriginal: product.priceOriginal||product.price
  })),[product]
  )
  //React.useEffect(setImages(product?.imageProduct))
  




  const handleUpload=  (e)=>{
    const pics = e.target.files;
    if (pics[0]===undefined)  return  0

    setUpLoading(true); //marcador de loading...
   
    for(const pic of pics){
      let formData=new FormData();
      formData.append('file',pic);
      formData.append('upload_preset','images');
       fetch('https://api.cloudinary.com/v1_1/dnlooxokf/upload',{
        method: 'POST',
        body: formData,
      })
        .then((res)=>res.json())
        .then((res)=> {
          setInput({imageProduct:[...input.imageProduct,res.url]});
          setUpLoading(false);
        })
        .catch(error=>console.log(error));
      }
  };

  const handleDelete=(e,image)=>{
    e.preventDefault()
  //   images.forEach( async(image) => {
  //     if ( images.includes(image) ){
  //         // Borrar de cloudinary
  //         const [ fileId, extension ] = image.substring( image.lastIndexOf('/') + 1 ).split('.')
  //         console.log({ image, fileId, extension });
  //         //await cloudinary.uploader.destroy( fileId );
  //     }
  // });
  
  setInput(input.imageProduct.filter(element=>element!==image))//deja afuera el elemento que tenga la url a eliminar

  }


  const validate=(ev)=>{
    
    if(ev.target.name==='title'){
      setInput((input)=>({...input,name:ev.target.value}))
    }

   // else if(ev.target.name==='precio' && ev.target.value>-1 && (/\d/.test(ev.target.value))||( ev.target.name==='precio' && ev.target.value==='.') ){
    else if ((ev.target.name==='precio' )&& ((/\d/.test(ev.target.value)) || (ev.target.value==='')) ) {  
      console.log("precio:", typeof ev.target.value)
      setInput((input)=>({...input,price:(ev.target.value)}))
    }

    else if ((ev.target.name==='precioOriginal' )&& ((/\d/.test(ev.target.value)) || (ev.target.value==='')) ) {  
      setInput((input)=>({...input,priceOriginal:(ev.target.value)}))
    }

    else if(ev.target.name==='stock' && ev.target.value>-1 && (/\d/.test(ev.target.value)) ){
        setInput((input)=>({...input,stock:parseInt(ev.target.value)}))
    }

    else if(ev.target.name==='description'){
      setInput((input)=>({...input,description:ev.target.value}))

    }
    else if(ev.target.name==='category'){
      setInput((input)=>({...input,category:ev.target.value}))
    }

    }
  
    async function handleSubmit(e){
      e.preventDefault()
      if(input.price>input.priceOriginal){
        return swal({
        title:"Error",
        text:"El precio con descuento no puede ser mayor al original!",
        icon:"error",
        button:"Aceptar"
      })}

      if(!input.price){input.price=input.priceOriginal}

      
          const newPost={...input,imageProduct:input.imageProduct[0]?input.imageProduct:["https://res.cloudinary.com/dnlooxokf/image/upload/v1654057815/images/pzhs1ykafhvxlhabq2gt.jpg"]} // se prepara un objeto con los campos del fomrulario y sus imagenes
          dispatch(MODIFYPRODUCT(newPost)).then(async(r)=>{
            console.log('resBackend',r)
            dispatch(GETPRODUCTS())
            if(r.meta.requestStatus==="fulfilled"){
              await swal({
                title:"Realizado",
                text:"Se modifico el Producto exitosamente!",
                icon:"success",
                button:"Aceptar"
              }).then(() => {navegar("/");
             // window.location.reload()
              })
            }
          })
         //se accede al home
         // window.location.reload();//se refresca para activar el dispatch de GETPRODUCTS()       
  }


  return (
  <div>
    <NavBar/>

    <Box display='flex' justifyContent='center'>
    <div id='formnuevo'>

        <Typography display='flex' justifyContent='center' mt={15}> EDITAR ARTICULO</Typography>

      <Box
        display='flex' 
        flexDirection='column'
        margin='auto'
        component="form"
        sx={{
          '& > :not(style)': { m: 1 , width:'70ch' },
        }}
        noValidate
        autoComplete="off"
      >
            <TextField id="formtitle" label="Nombre" variant="outlined" name='title' value={input.name}
            onChange={(e)=>validate(e)}></TextField>

            <Box sx={{display:'flex'}}>
                <TextField id="formprecio" label="Precio Original" variant="outlined"  name='precioOriginal' value={parseFloat(input.priceOriginal)} type='number'
                    InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                    onChange={(e)=>validate(e)} fullWidth
                /> 
                <TextField id="formprecioOrginial" label="Precio con descuento (opcional) " variant="outlined"  name='precio' value={parseFloat(input.price)} type='number'
                    InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                    onChange={(e)=>validate(e)} fullWidth
                /> 
            </Box>                     

            <TextField id="productStock" label="Cantidad" variant="outlined" name='stock' value={parseInt(input.stock)} type='number'onChange={(ev)=>validate(ev)}> </TextField>

            <Box>
              <Select
                id="formcats"
                select
                label="Categorias"
                value={input.category}
                onChange={(e)=>validate(e)}
                name='category'
                fullWidth
              >
                 
                  {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                ))}
              </Select>
            </Box>         
   

            <TextField multiline rows={10} id="formdesc" label="Descripcion" variant="outlined" name='description' value={input.description}
            onChange={(e)=>validate(e)}></TextField>
            
            <Box dispay='flex' justifyContent='center'>
              <Button 
                color="secondary"
                fullWidth
                startIcon={ <UploadOutlined /> }
                onClick={ () => fileInputRef.current?.click() }
                >
                Cargar imagen
              </Button>
            </Box>
   
            {
            <input 
              multiple
              aria-label="Archivo" 
              type="file" name="imagen" 
              onChange={handleUpload} 
              ref={ fileInputRef }
              style={{ display: 'none' }}
            />}

              <Box display='flex' flexDirection='row' justifyContent='center' width={10}  >
              
              
              <Swiper
                      modules={[Navigation, Pagination, A11y]}
                      spaceBetween={20}
                      slidesPerView={4}
                      navigation={true}
                      loop={false}
                     // pagination={{ clickable: true }}
                    >
                  {input.imageProduct?.map(image=>( 
              <>
                    <SwiperSlide>
                      <Link target="_blank" href={image}>
                      <CardMedia
                        Autoplay='false' 
                        component="img"
                        height="250"
                        image={image}
                        alt="gf"
                        sx={{objectFit:'contain'}}
                      />
                      </Link>
                    
                      <Box display='flex' ref={ fileInputRef2 } justifyContent='center' sx={{ zIndex: 'tooltip', display:'none' }} onClick={(e)=>{handleDelete(e,image)}}  >
                        <Button  color = 'error' >Borrar</Button>
                      </Box>

                      <Box display='flex'   justifyContent='center' sx={{ zIndex: 'tooltip' }} onClick={ () => fileInputRef2.current?.click()} >
                       <Button  color = 'error' >Borrar</Button>
                      </Box>

                    </SwiperSlide>

                               </>
                   ))}
              
                </Swiper>
                  
              </Box>
              {upLoading && <p>Subiendo Foto...</p> }

              <Box dispay='flex' justifyContent='center'>
                <Typography display='flex' justifyContent='center'>subiste {input?.imageProduct?.length} fotos</Typography>
              </Box>

             <Box  dispay='flex' justifyContent='right' flexDirection='row'>
              <Button   disabled={(input.name===product.name &&
                input.category===product.category &&
                input.description===product.description && 
                input.imageProduct===product.imageProduct&& 
                (input.priceOriginal==product.priceOriginal))&&
                (input.price==product.price)&&
                (input.stock==product.stock)
              }  
                type="submit" onClick={(e) => handleSubmit(e)}>Guardar</Button>
              <Button >Cancelar</Button>
             </Box>   

      </Box>



        </div>
    </Box>
  </div>
  );
}
//||input.category!==product.category||input.description!==product.description||input.priceOriginal!==product.priceOrignal||input.imageProduct!==product.imageProduct

  // <button onClick={(e)=>{handleDelete(e,image)}}>X</button>
