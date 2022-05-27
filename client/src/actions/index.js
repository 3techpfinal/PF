import axios from "axios"
import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
const { URL } = process.env
export const SEARCHBYNAME = createAsyncThunk('SEARCHBYNAME', (input) => {
    console.log(input)
})
export const GETCONTACTINFO = createAsyncThunk('GETCONTACTINFO', async () => {
    const response = await axios.get(`${URL}/contact`)
    return response.data
})
