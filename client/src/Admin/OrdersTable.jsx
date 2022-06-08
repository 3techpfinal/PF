
import { useEffect, useState} from 'react';
import { DataGrid,} from '@mui/x-data-grid';
import { Grid, Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {GETORDERS,SEARCHBYNAMEPRODUCTS,GETORDER,DELETEORDER} from '../actions'
import NavBar from '../Components/NavBar'
import SearchBar from '../Components/SearchBar'
import { Chip } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'


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


    const orders=useSelector((State) => State.rootReducer.orders);

    const [orderDelete,setOrderDelete]=useState([])
    const ordersmap=orders.map(order=>( //esto es para cargar el estado productState
        {id:order._id,
        delete:false}
    ))
    useEffect(()=>{
        setOrderDelete(()=>ordersmap)
    },[orders])


    const navigate= useNavigate()

    useEffect(()=>{
        dispatch(GETORDERS())
      },[dispatch])


      const verOrden=async (id)=>{
        dispatch(GETORDER(id)).then(()=>navigate(`/orderpayment/${id}`))
    }

    const deleteOrder=async(e,row,id)=>{

        setOrderDelete((state)=>state.map(e=>{
            if(e.id===row.id){
                return {
                    id:e.id,
                    delete:!e.delete} //a la prop isActive le paso su valor negado
            }
            else return e
        }))



        swal({
            title: "Estas seguro que deseas eliminar la orden?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
             dispatch (DELETEORDER(id))


            //   swal("has eliminado la orden!", { icon: "success",});
            } else {
            }
          });
    }





    console.log("orders",orders)
    const columns = [
        { field: 'name', headerName: 'Usuario', width: 250 },
        { field: 'email', headerName: 'email', width: 250 },
        { field: 'orderNumber', headerName: 'Nº de Orden', width: 250 },
        { field: 'amountOfProducts', headerName: 'Cantidad de productos \n de un tipo', width: 280 },
        { field: 'amountOfProductsTotal', headerName: 'Cantidad de productos totales', width: 280 },
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
         },

         {
            field:'delete',
            headerName:'eliminar',
            width: 200,
            sortable: false,
            renderCell: (params)=>{
                return (           
                        <Button onClick={()=> deleteOrder(params.row.id) }>
                                   eliminar
                        </Button>
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

    <Typography variant='h2'>Ordenes</Typography>

    <SearchBar 
                placeholder="buscar por nombre de producto"
                url='/orderstable'
                dinamic={true}
                action={SEARCHBYNAMEPRODUCTS}
        />

        


   
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height:650, width: 40000 }}>
                    <DataGrid 
                        rows={ rows }
                        columns={ columns }
                        pageSize={ 20 }
                        rowsPerPageOptions={ [30] }
                    />

                </Grid>
            </Grid>


        </Box>
    </>
  )
}

export default UsersPage