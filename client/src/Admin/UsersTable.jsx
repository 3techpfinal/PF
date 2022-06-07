
import { useState, useEffect } from 'react';
import { DashboardOutlined, GroupOutlined, PeopleOutline } from '@mui/icons-material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid, Select, MenuItem, Box, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {GETUSERS, GETORDERS,SEARCHBYNAMEUSERS} from '../actions'
import { AppDispatch,RootState } from '../store'
import NavBar from '../Components/NavBar'
import SearchBar from '../Components/SearchBar'



const useAppDispatch = () => useDispatch();

const UsersPage = () => {
    const dispatch=useAppDispatch()

    useEffect(()=>{
        dispatch(GETUSERS())
        dispatch(GETORDERS())
      },[dispatch])

    const usuarios=useSelector((State) => State.rootReducer.users);
    const orders=useSelector((State) => State.rootReducer.orders);
    console.log("usuarios:",usuarios)
    console.log("ordenes:",orders)



    const calcularCantidadProductosCompradosTotales = (ordenes,usuario)=> {
        let contador = 0
        ordenes?.map((orden)=>(
            (orden.user?.email===usuario?.email && orden.isPaid)&&
            orden.products.map((product)=>(
                contador=contador+product.quantity
            ))
        ))
        return contador 
      }

    const columns = [
        { field: 'name', headerName: 'Nombre completo', width: 300 },
        { field: 'email', headerName: 'Correo', width: 250 },
        { field: 'amountOfBuys', headerName: 'Cantidad de productos comprados totales', width: 350 },
        {
            
            headerName: 'Role', 
            width: 200,
            renderCell: ({row}) => {
                return (
                            row.rol==='superadmin'?
                            <Typography color="error" value='superadmin'> superadmin </Typography> 
                            :
                            <Select
                                value={ row.rol }
                                label="Rol"
                                onChange={ (e) => {
                                    //dispatch(MODIFYUSER({_id:row.id,roles: e.target.value==='admin'?['6278836b2eda1997d8769ad3']:['6278836b2eda1997d8769ad2']}))
                                    window.location.reload()
                                } }
                                sx={{ width: '300px' }}
                            >
                                <MenuItem value='admin'> admin </MenuItem>
                                <MenuItem value='user'> user </MenuItem>

                            </Select>
                            
                        )
            }
        },
        
        { 
            headerName: 'Estado', 
            width: 200,
            renderCell: ({row}) => {
                return (
                            row.rol==='superadmin'?
                            <Typography color="error" value='superadmin'> superadmin </Typography> 
                            :
                            <Select
                                value={ row.estado?'bloqueado':'online' }
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

    const rows = usuarios.map( (user) => ({
        id: user._id,
        name: user.name||"sin nombre",
        email: user.email,
        products: user?.products?.length,
        rol: user.role,
        estado: user?.suspendedAccount,
        amountOfBuys: calcularCantidadProductosCompradosTotales(orders,user)
    }))




  return (
<>
    <NavBar/>



    <Box mt={15} >
        <SearchBar 
                placeholder="buscar por usuario"
                url='/admin/userstable'
                dinamic={true}
                action={SEARCHBYNAMEUSERS}
        />
        <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height:650, width: 40000 }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 15 }
                    rowsPerPageOptions={ [20] }
                />

            </Grid>
        </Grid>


    </Box>
</>
  )
}

export default UsersPage