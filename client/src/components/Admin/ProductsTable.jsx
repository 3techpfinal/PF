
import { useState, useEffect } from 'react';
import { DashboardOutlined, GroupOutlined, PeopleOutline } from '@mui/icons-material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid, Select, MenuItem, Box,CardMedia } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {GETUSERS, GETORDERS,GETPRODUCTS} from '../../actions'
import { AppDispatch,RootState } from '../../store'
import NavBar from '../NavBar'



const useAppDispatch = () => useDispatch();

const UsersPage = () => {
    const dispatch=useAppDispatch()

    useEffect(()=>{
        dispatch(GETPRODUCTS())
      },[dispatch])

    const products=useSelector((State) => State.rootReducer.products);
    console.log("product:",products)

    const columns = [
        { 
            field: 'img', 
            headerName: 'Foto',
            
            renderCell: ({ row } ) => {
                return (
                    <a href={ `/product/${ row.id }` } target="_blank" rel="noreferrer">
                        <CardMedia 
                            component='img'
                            alt=""
                            className='fadeIn'
                            image={ row.image }
                        />
                    </a>
                )
            }
        },

        { field: 'name', headerName: 'Producto', width: 350 },
        { field: 'date', headerName: 'Fecha de publicacion', width: 250 },
        { field: 'rating', headerName: 'calificacion de usuarios', width: 250 },
        { field: 'price', headerName: 'Precio ($)', width: 250 },
        { field: 'stock', headerName: 'En stock', width: 250 },
        { field: 'salesQuantity', headerName: 'Cantidad de ventas', width: 250 },
        {
            field: 'status', 
            headerName: 'Estado', 
            width: 300,
            renderCell: ({row}) => {
                return (
                        <Select
                            value={ row.estado?'online':'bloqueado' }
                            label="state"
                            onChange={ (e)=> {
                                //dispatch(MODIFYUSER({_id:row.id,suspendedAccount: e.target.value==='online'?false:true}))
                                window.location.reload()
                            }   }
                            sx={{ width: '300px' }}
                        >
                            <MenuItem value='online'> online </MenuItem>
                            <MenuItem value='bloqueado'> bloqueado </MenuItem>
                        </Select>
                )
            }
        },
    ];

    const rows = products.map( (product) => ({
        id: product._id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        image: product.imageProduct[0],
        estado: product.isActive || "true",
        date:product.date||"sin fecha en BDD",
        rating:product.rating? product.rating : "no tiene rating",
        salesQuantity: product.salesquantity? product.salesquantity : "0"
    }))
    
  return (
    <Box >


    <NavBar/>
        <Grid container className='fadeIn' my={15}>
            <Grid item xs={12} sx={{ height:700, width: 40000 }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 12 }
                    rowsPerPageOptions={ [20] }
                />

            </Grid>
        </Grid>


    </Box>

  )
}

export default UsersPage