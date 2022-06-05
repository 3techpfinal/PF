import axios from "axios"
import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import Cookie from 'js-cookie'

export const api='http://localhost:3000'


export const GETPRODUCTS = createAsyncThunk('GETPRODUCTS', async () => {
    const response = await axios(`${api}/products`)
    return response.data
})

export const GETCATEGORIES = createAsyncThunk('GETCATEGORIES', async () => {
    const response = await axios(`${api}/categories`)
    return response.data
})

export const GETDETAIL = createAsyncThunk('GETDETAIL', async (id) => {
    const response = await axios(`${api}/products/${id}`)
    return response.data
})

export const GETUSERS = createAsyncThunk('GETUSERS', async () => {
    const response = await axios(`${api}/users`)
    return response.data
})

export const GETORDERS = createAsyncThunk('GETORDERS', async () => {
    const response = await axios(`${api}/orders`)
    return response.data
})

export const CREATEPRODUCT = createAsyncThunk('CREATEPRODUCT', async (input) => {
    await axios.post(`${api}/products`,input)
})


export const SEARCHBYNAME=createAsyncThunk('SEARCHBYNAME',async (name)=>{
    const result=await axios(`${api}/products?name=${name}`) 
    return result.data
})

export const SEARCHBYCATEGORY=createAsyncThunk('SEARCHBYCATEGORY',async (name)=>{
    const result=await axios(`${api}/products?filterName=category&filterOrder=${name?.toLocaleLowerCase()}&names=stock&sort=1`) 
    return result.data
})

export const ORDERBYPRICE=createAction('ORDERBYPRICE',(order)=>{
    return {
        payload:order
    }
})

export const VERIFYADMIN=createAsyncThunk('VERIFYADMIN',async ()=>{
    const user=JSON.parse( Cookie.get('user') )
    if(user){
        if(user.role==='admin')return true
    }
    return false
})
