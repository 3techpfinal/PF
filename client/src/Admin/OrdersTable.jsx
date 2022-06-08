
import { useState, useEffect } from 'react';
import { DashboardOutlined, GroupOutlined, PeopleOutline } from '@mui/icons-material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid, Select, MenuItem, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {GETUSERS, GETORDERS,GETPRODUCTS,SEARCHBYNAMEPRODUCTS,GETORDER} from '../actions'
import { AppDispatch,RootState } from '../store'
import NavBar from '../Components/NavBar'
import SearchBar from '../Components/SearchBar'
import { Chip } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom';
const useAppDispatch = () => useDispatch();

const UsersPage = () => {
    const dispatch=useAppDispatch()
    
    const calcularCantidaddeProductosTotalesEnOrden = (order) =>{
        let contador = 0
        order.products.map((product)=>(
            contador = contador + product.quantity
        ))
        return contador      
    }
    const navigate= useNavigate()
    useEffect(()=>{
        dispatch(GETORDERS())
      },[dispatch])


      const verOrden=async (id)=>{
        await dispatch(GETORDER(id))
        navigate(`/orderpayment/${id}`)
    }




    //const usuarios=useSelector((State) => State.rootReducer.users);
    const orders=useSelector((State) => State.rootReducer.orders);
    //const products=useSelector((State) => State.rootReducer.products);
console.log("orders",orders)
    const columns = [
        { field: 'name', headerName: 'Usuario', width: 250 },
        { field: 'email', headerName: 'email', width: 250 },
        { field: 'orderNumber', headerName: 'Nº de Orden', width: 250 },
        { field: 'amountOfProducts', headerName: 'Cantidad de productos de un tipo', width: 150 },
        { field: 'amountOfProductsTotal', headerName: 'Cantidad de productos totales', width: 150 },
        { field: 'totalPrice', headerName: 'Precio total', width: 150 },
        {
            field: 'isPaid',
            width: 150,
            headerName: 'Estado',
            renderCell: ({ row }) => {
                return row.isPaid
                    ? ( <Chip variant='outlined' label="Pagada" color="success" /> )
                    : ( <Chip variant='outlined' label="Pendiente" color="error" /> )
            }
        },
        {
            field:'orden',
            headerName:'Ver orden',
            width: 200,
            sortable: false,
            renderCell: (params)=>{
                return (
                
                        // <NavLink to={`/order/${params.row.id}`}>
                        //     <Link underline='always'>
                                <Button onClick={()=>verOrden(params.row.id)}>
                                    Ver Orden
                                </Button>
                        //     </Link>
                        // </NavLink>

                        )
                
            }
         }


    ];

    const rows = orders.map( (order) => ({
        id:order._id,
        name: order?.user?.name || "no hay nombres",
        email: order?.user?.email || "no hay nombres",
        orderNumber: order?._id || "no hay orden",
        amountOfProducts: order?.products.length || "",
        amountOfProductsTotal: calcularCantidaddeProductosTotalesEnOrden(order),
        totalPrice: `${'$'+ new Intl.NumberFormat().format(order?.totalPrice)}` || "sin precio",
        isPaid: order.isPaid
    }))




  return (
    <>

    <NavBar/>
    <Box mt={15} >

    <SearchBar 
                placeholder="buscar por nombre de producto"
                url='/orderstable'
                dinamic={true}
                action={SEARCHBYNAMEPRODUCTS}
        />


   
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
    </>
  )
}

export default UsersPage