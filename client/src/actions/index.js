import axios from "axios"
import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
//const { URL } = process.env
const api='http://localhost:3000'

export const SEARCHBYNAME = createAsyncThunk('SEARCHBYNAME', (input) => {
    console.log(input)
})
export const GETPRODUCTS = createAsyncThunk('GETPRODUCTS', async () => {
    const response = await axios(`${api}/products`)
    return response.data
})

export const GETDETAIL = createAsyncThunk('GETDETAIL', async (id) => {
    const response = await axios(`${api}/products/${id}`)
    return response.data
})

export const CREATEPRODUCT = createAsyncThunk('CREATEPRODUCT', async (input) => {
    await axios.post(`${api}/products`,input)
})


