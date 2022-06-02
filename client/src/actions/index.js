import axios from "axios"
import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
//const { URL } = process.env
const api='http://localhost:3000'


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

export const CREATEPRODUCT = createAsyncThunk('CREATEPRODUCT', async (input) => {
    await axios.post(`${api}/products`,input,{
        headers:{
            'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTdmN2MwOGJmZjU5M2E5MGI1Mzg0ZCIsImlhdCI6MTY1NDEyNjUyOCwiZXhwIjoxNjU0MjEyOTI4fQ.O4dxO7iHN_11U9hu549YwT_NgRmp5piU4JlTY2NAWQs'
        }
    })
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



