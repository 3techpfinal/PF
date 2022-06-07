import axios from "axios"
import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import Cookie from 'js-cookie'

export const api='http://localhost:3000'

                        /////////////////////////////////////   
                        //      ACCIONES PARA PRODUCTOS    //   
                        /////////////////////////////////////  

export const GETPRODUCTS = createAsyncThunk('GETPRODUCTS', async () => { //trae todos los productos
    const response = await axios(`${api}/products`)
    return response.data
})

export const GETCATEGORIES = createAsyncThunk('GETCATEGORIES', async () => { //trae las categorias de productos de la tabla category
    const response = await axios(`${api}/categories`)
    return response.data
})

export const GETDETAIL = createAsyncThunk('GETDETAIL', async (id) => { //reciben un id y trae un producto
    const response = await axios(`${api}/products/${id}`)
    return response.data
})

export const CREATEPRODUCT = createAsyncThunk('CREATEPRODUCT', async (input) => { //recibe info por post y crea un producto
    const token=Cookie.get('token')
    await axios.post(`${api}/products`,input ,{
        headers:{
            'x-access-token':token
        }
    })
})

export const SEARCHBYNAMEPRODUCTS=createAsyncThunk('SEARCHBYNAMEPRODUCTS',async (name)=>{// recibe un string por query y busca un producto
    const result=await axios(`${api}/products?name=${name}`) 
    return result.data
})

export const SEARCHBYCATEGORY=createAsyncThunk('SEARCHBYCATEGORY',async (name)=>{ //recibe un nombre de categoria por query y filtro productos de esa categoria
    const result=await axios(`${api}/products?filterName=category&filterOrder=${name?.toLocaleLowerCase()}&names=stock&sort=1`) 
    return result.data
})

export const ORDERBYPRICE=createAction('ORDERBYPRICE',(order)=>{ //realiza un orden de productos por precio, la funcion esta en el reducer
    return {
        payload:order
    }
})

export const VERIFYADMIN=createAsyncThunk('VERIFYADMIN',async ()=>{
    const user=JSON.parse( Cookie.get('user') )
    if(user){
        if(user.role.includes('admin'))return true
    }
    return false
})

export const GETRECOMMENDED=createAsyncThunk('GETRECOMMENDED',async (id)=>{
    const all = await axios(`${api}/products`)
    const response = await axios(`${api}/products/${id}`)
    const final=all.data.filter(e=>{
        if(e.category._id===response.data.category&&e._id!==id)return true
        else return false
      })
    return final
})


                        ///////////////////////////////////////   
                        //      ACCIONES PARA USUARIOS      //   
                        /////////////////////////////////////     

export const GETUSERS = createAsyncThunk('GETUSERS', async () => { //trae todos los usuarios
    const response = await axios(`${api}/users`)
    return response.data
})

export const SEARCHBYNAMEUSERS=createAsyncThunk('SEARCHBYNAMEUSERS',async (name)=>{//recibe un string por query y busca un usuario
    const result=await axios(`${api}/users?name=${name}`) 
    return result.data
})


                        ///////////////////////////////////////   
                        //   ACCIONES PARA ORDENES Y PAGOS  //   
                        /////////////////////////////////////    

export const GETORDERS = createAsyncThunk('GETORDERS', async () => { // trae todas las ordenes
    const token=Cookie.get('token')
    const response = await axios(`${api}/orders`,{
        headers:{
            'x-access-token':token
        }
    })
    return response.data
})

export const GETORDER=createAsyncThunk('GETORDER',async (id)=>{
    const result=await axios.get(`${api}/orders/${id}`) 
    return result.data
  })


export const CREATEORDER=createAsyncThunk('CREATEORDER',async (data)=>{
    const token=Cookie.get('token')
    const result=await axios.post(`${api}/orders`,data,{
        headers:{
            'x-access-token':token
        }
    })
    return result.data._id
})
  
  export const PAYORDER=createAsyncThunk('PAYORDER',async (data)=>{
    const result=await axios.post(`${api}/orders/pay`,data)
    return result.data
})










