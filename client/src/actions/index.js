import axios from "axios"
import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
//const { URL } = process.env
const api='http://localhost:3000'

export const SEARCHBYNAME = createAsyncThunk('SEARCHBYNAME', (input) => {
    console.log(input)
})
export const GETPRODUCTS = createAsyncThunk('GETPRODUCTS', async () => {
    const response = await axios(`${api}/products`)
    console.log(response)
    return response.data
})
