
import { useState, useEffect } from 'react';
import { DashboardOutlined, GroupOutlined, PeopleOutline } from '@mui/icons-material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid, Select, MenuItem, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {GETUSERS, GETORDERS,GETPRODUCTS} from '../actions'
import { AppDispatch,RootState } from '../store'
import NavBar from '../Components/NavBar'



const useAppDispatch = () => useDispatch();

const UsersPage = () => {
    const dispatch=useAppDispatch()

    useEffect(()=>{
        dispatch(GETORDERS())
      },[dispatch])

    //const usuarios=useSelector((State) => State.rootReducer.users);
    const orders=useSelector((State) => State.rootReducer.orders);
    //const products=useSelector((State) => State.rootReducer.products);

    const columns = [
        { field: 'name', headerName: 'Usuario', width: 350 },
        { field: 'orderNumber', headerName: 'Nº de Orden', width: 250 },
        { field: 'amountOfProducts', headerName: 'Publicaciones', width: 250 },
        { field: 'totalPrice', headerName: 'Precio total', width: 250 },
        { field: 'state', headerName: 'Estado', width: 250 },
    ];

    const rows = orders.map( (order) => ({
        name: order?.user.name || "no hay nombres",
        orderNumber: order?._id || "no hay orden",
        amountOfProducts: order?.products.length || "",
        totalPrice: order?.price || "sin precio",
        state: order?.isPaid || "sin estado"
    }))


  return (

    <Box >
        <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height:750, width: 40000 }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 20 }
                    rowsPerPageOptions={ [20] }
                />

            </Grid>
        </Grid>


    </Box>
  )
}

export default UsersPage