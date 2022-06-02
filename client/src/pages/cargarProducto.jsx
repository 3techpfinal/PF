import React from "react";
import NavBar from "../components/NavBar"
import { useState,useRef } from 'react';
import {   useNavigate } from "react-router-dom"
//import { Link } from "react-router-dom";
import { TextField,Select,Container, CardMedia,Link, Box, UploadOulined,InputLabel, OutlinedInput, InputAdornment, MenuItem, Typography, Button, FormLabel, FormControlLabel } from '@mui/material';
import {CREATEPRODUCT,GETCATEGORIES} from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import { UploadOutlined } from '@ant-design/icons';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

//var cloudinary = require('cloudinary').v2;
//import { v2 as cloudinary } from 'cloudinary';
//cloudinary.config( process.env.CLOUDINARY_URL || '' );
//cloudinary.config( 'cloudinary://194456155422281:5zFQO4yzRgVJZvpI557kVlR_XP4@dnlooxokf' );

const regex=/^[0-9]+$/


export default function CrearPublicacion() {


  const fileInputRef=useRef(null)
  const dispatch=useDispatch()
  React.useEffect(()=>{
      dispatch(GETCATEGORIES())
  },[dispatch])
  const categories=useSelector((state)=>state.rootReducer.categories)

  const[input,setInput]=useState({name:'',price:'',category:'Select',description:'',stock:1,imageProduct:[""],rating:0})
  const[images,setImages]=useState([]);//array de strings de url de imagenes 
  const[upLoading,setUpLoading]=useState(false) //estado que sirve para mostrar "cargando foto"
  const navegar = useNavigate()  //para navegar al home luego de postear el formulario

  const handleUpload=  (e)=>{
    const pics = e.target.files;
    console.log("valor buscado*",pics);
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
          setImages(images=>[...images,res.url]);
          console.log("respuesta",res)
          setUpLoading(false);
        })
        .catch(error=>console.log(error));
      }
  };

  const handleDelete=(e,image)=>{
    e.preventDefault()
    images.forEach( async(image) => {
      if ( images.includes(image) ){
          // Borrar de cloudinary
          const [ fileId, extension ] = image.substring( image.lastIndexOf('/') + 1 ).split('.')
          console.log({ image, fileId, extension });
          //await cloudinary.uploader.destroy( fileId );
      }
  });

  setImages(images.filter(element=>{//deja afuera el elemento que tenga la url a eliminar
    return element!==image;
  }))



  }


  const validate=(ev)=>{
    
    if(ev.target.name==='title'){
      setInput((input)=>({...input,name:ev.target.value}))

    }
    // if(e.target.name==='precio'){
    //   if(regex.test(e.target.value))setInput((input)=>({...input,price:e.target.value}))
    // }

    else if(ev.target.name==='precio'&& ev.target.value>-1 && ev.target.value!=='e'){
        if(regex.test(ev.target.value))setInput((input)=>({...input,price:ev.target.value}))
    }

    else if(ev.target.name==='stock'&& ev.target.value>-1 && ev.target.value!=='e'){
        setInput((input)=>({...input,stock:ev.target.value}))
    }

    else if(ev.target.name==='description'){
      setInput((input)=>({...input,description:ev.target.value}))

    }
    else if(ev.target.name==='category'){
      setInput((input)=>({...input,category:ev.target.value}))
    }

    }
  
    function handleSubmit(e){
      e.preventDefault()
          const newPost={...input,imageProduct:images[0]?images:["https://res.cloudinary.com/dnlooxokf/image/upload/v1654057815/images/pzhs1ykafhvxlhabq2gt.jpg"]} // se prepara un objeto con los campos del fomrulario y sus imagenes
          dispatch(CREATEPRODUCT(newPost))
          alert("Se creo el Producto exitosamente!")
          navegar("/")//se accede al home
          window.location.reload();//se refresca para activar el dispatch de GETPRODUCTS()       
  }


  return (
    <div>
        <NavBar/>

        <Box display='flex' justifyContent='center'>
      <div id='formnuevo'>

        <Typography mt={15}>PUBLICAR ARTICULO</Typography>

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
            onChange={(e)=>validate(e)}/>

            <TextField id="formprecio" label="Precio" variant="outlined"  type='number'
                InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                name='precio' value={input.price}
                onChange={(e)=>validate(e)}
            />
            
            
{/*          
            <label>Cantidad:</label>
            <input id="productStock" name='stock' value={input.stock}
                onChange={(e)=>validate(e)}
              min="1" max="100" type="number"/> */}

            <TextField id="productStock" label="Cantidad" variant="outlined" name='stock' value={input.stock} type='number'
            onChange={(ev)=>validate(ev)}>
            </TextField>


            <Select
              id="formcats"
              select
              label="Categorias"
              value={input.category}
              onChange={(e)=>validate(e)}
              name='category'
              
            >
                <MenuItem key='select' value='Select'>
                  Select
                </MenuItem>
                  {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>

   

            <TextField multiline rows={10} id="formdesc" label="Descripcion" variant="outlined" name='description' value={input.description}
            onChange={(e)=>validate(e)}/>

                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3 }}
                                onClick={ () => fileInputRef.current?.click() }
                            >
                                Cargar imagen
                            </Button>

            
            
            {
            <input 
              multiple
              aria-label="Archivo" 
              type="file" name="imagen" 
              onChange={handleUpload} 
              ref={ fileInputRef }
              style={{ display: 'none' }}
            />}

              <Container display='flex' flexDirection='row' justifyContent='center' width={10}  >
              <Swiper
                      modules={[Navigation, Pagination, A11y]}
                      spaceBetween={20}
                      slidesPerView={5}
                      navigation
                     // pagination={{ clickable: true }}
                    >
                {images[0]?images.map(image=>(
                  <SwiperSlide>
                    <Link target="_blank" href={image}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={image}
                      alt="gf"
                      sx={{objectFit:'contain'}}
                    />
                    </Link>
                     <Button  color = 'error' onClick={(e)=>{handleDelete(e,image)}}>Borrar</Button>
                  </SwiperSlide>
                )):<></>}
                </Swiper>
              </Container>
              {upLoading && <p>Subiendo Foto...</p> }

             <div>
            <button disabled={input.name===""||input.category==="Select"?true:false||input.description===""||input.price===""}  type="submit" onClick={(e) => handleSubmit(e)}>Crear Pubicación</button>
            </div>   

          </Box>



        </div>
    </Box>
    </div>
    );
  }


  // <button onClick={(e)=>{handleDelete(e,image)}}>X</button>

