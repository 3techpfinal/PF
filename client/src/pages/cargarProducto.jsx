import React from "react";
import NavBar from "../components/NavBar"
import { useState } from 'react';
import { Link ,  useNavigate } from "react-router-dom"
import { TextField,Container, CardMedia, Box, InputLabel, OutlinedInput, InputAdornment, MenuItem, Typography, Button, FormLabel, FormControlLabel } from '@mui/material';
import {CREATEPRODUCT,GETCATEGORIES} from '../actions'
import { useDispatch, useSelector } from 'react-redux'

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const regex=/^[0-9]+$/

export default function CrearPublicacion() {


  const dispatch=useDispatch()
  React.useEffect(()=>{
      dispatch(GETCATEGORIES())
  },[dispatch])
  const categories=useSelector((state)=>state.rootReducer.categories)
  console.log("categorias:",categories)
  const[input,setInput]=useState({name:'',price:'',category:'Select',description:'',stock:1,imageProduct:[""],rating:0})
  const[images,setImages]=useState([]);//array de strings de url de imagenes 
  const[upLoading,setUpLoading]=useState(false) //estado que sirve para mostrar "cargando foto"
  const navegar = useNavigate()  //para navegar al home luego de postear el formulario

  const handleUpload= async (e)=>{
    const pic = e.target.files[0];
    console.log("valor buscado*",pic);
    if (pic===undefined)  return  0
    setUpLoading(true);
    const formData=new FormData();
    formData.append('file',pic);
    formData.append('upload_preset','images');
     await fetch('https://api.cloudinary.com/v1_1/dnlooxokf/upload',{
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
  };

  const handleDelete=(e,image)=>{
    e.preventDefault()
    setImages(images.filter(element=>{//deja afuera el elemento que tenga la url a eliminar
      return element!==image;
    }))
  }


  const currencies = [
    {
      value: 'tecnologia',
      label: 'Tecnologia',
    },
    {
      value: 'ropa',
      label: 'Ropa',
    },
    {
      value: 'cuidado personal',
      label: 'Cuidado Personal',
    },
    {
      value: 'deporte',
      label: 'Deportes',
    },
  ];

  

  const validate=(e)=>{
    
    if(e.target.name==='title'){
      setInput((input)=>({...input,name:e.target.value}))

    }
    if(e.target.name==='precio'){
      if(regex.test(e.target.value))setInput((input)=>({...input,price:e.target.value}))

    }
    if(e.target.name==='stock'){
      setInput((input)=>({...input,stock:e.target.value}))

    }
    if(e.target.name==='description'){
      setInput((input)=>({...input,description:e.target.value}))

    }
    if(e.target.name==='category'){
      setInput((input)=>({...input,category:e.target.value}))

    }

    }
  
    function handleSubmit(e){
      e.preventDefault()
          const newPost={...input,imageProduct:images[0]?images:["http://inversionesumbrias.com.ve/static/images/productos/producto-sin-imagen.jpg"]} // se prepara un objeto con los campos del fomrulario y sus imagenes
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
              '& > :not(style)': { m: 1, width: '50ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="formtitle" label="Nombre" variant="outlined" name='title' value={input.name}
            onChange={(e)=>validate(e)}/>

            <TextField id="formprecio" label="Precio" variant="outlined" 
                InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                name='precio' value={input.price}
                onChange={(e)=>validate(e)}
            />
            
            
            
            <label>Cantidad:</label>
            <input id="productStock" name='stock' value={input.stock}
                onChange={(e)=>validate(e)}
              min="1" max="100" type="number"/>


            <TextField
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
                <MenuItem key={category._id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>

   

            <TextField multiline rows={4} id="formdesc" label="Descripcion" variant="outlined" name='description' value={input.description}
            onChange={(e)=>validate(e)}/>

            
            
            {<input aria-label="Archivo" type="file" name="imagen" onChange={handleUpload} />}

              <Container display='flex' flexDirection='row' justifyContent='center' width={1000}  >
              <Swiper
                      modules={[Navigation, Pagination, Scrollbar, A11y]}
                      spaceBetween={40}
                      slidesPerView={3}
                      navigation
                      pagination={{ clickable: true }}
                    >
                {images[0]?images.map(image=>(
                  <SwiperSlide>
                    <CardMedia
                      component="img"
                      height="250"
                      image={image}
                      alt="gf"
                      sx={{objectFit:'contain'}}
                    />
                     <button onClick={(e)=>{handleDelete(e,image)}}>X</button>
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

