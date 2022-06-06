import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions/index'

const initialState = {
  products:[],
  detail:[],
  categories:[],
  users:[],
  orders:[],
  order:[]
}



const OrderByPrice=(state,action)=>{  //Ordenar por precio mayor a menos Funcion
        const sortedProductsByPrice =
          action.payload === "precioMax"
            ? state.products.sort(function (a, b) {
                if (a.price < b.price) {
                  return 1;
                }
                if (b.price < a.price) {
                  return -1;
                }
                return 0;
              })
            : state.products.sort(function (a, b) {
                if (a.price < b.price) {
                  return -1;
                }
                if (b.price < a.price) {
                  return 1;
                }
                return 0;
              });

        return sortedProductsByPrice
}




const rootReducer = createReducer(initialState, (builder) => {
  builder



                          /////////////////////////////////////   
                         //      ACCIONES PARA PRODUCTOS    //   
                        ///////////////////////////////////// 

    .addCase(actions.GETPRODUCTS.fulfilled, (state, action) => {
      state.products=[]
      state.products=action.payload
    })
    .addCase(actions.GETCATEGORIES.fulfilled, (state, action) => {
      state.categories=action.payload
    })

    .addCase(actions.CREATEPRODUCT.fulfilled, (state, action) => {
    })

    .addCase(actions.GETDETAIL.fulfilled, (state, action) => {
      state.detail=[]
      state.detail=action.payload
    })

    .addCase(actions.SEARCHBYNAMEPRODUCTS.fulfilled, (state, action) => {
      state.products=[]
      state.products=action.payload
    })

    .addCase(actions.SEARCHBYCATEGORY.fulfilled, (state, action) => {
      state.products=[]
      state.products=action.payload 
    })

    .addCase(actions.ORDERBYPRICE, (state, action) => {
      const sortedProductsByPrice = OrderByPrice(state,action)
      state.products=[]
      state.products=sortedProductsByPrice
    })

                          /////////////////////////////////////   
                         //      ACCIONES PARA USUARIOS    //   
                        ///////////////////////////////////// 

    .addCase(actions.GETUSERS.fulfilled, (state, action) => {
        state.users=action.payload
    })
                        
    .addCase(actions.SEARCHBYNAMEUSERS.fulfilled, (state, action) => {
      state.users=[]
      state.users=action.payload
    })

                          /////////////////////////////////////   
                         //      ACCIONES PARA ORDENES    //   
                        ///////////////////////////////////// 

    .addCase(actions.CREATEORDER.fulfilled, (state, action) => {
    })

    .addCase(actions.GETORDERS.fulfilled, (state, action) => {
      state.orders=action.payload
      
    })

    .addCase(actions.GETORDER.fulfilled, (state, action) => {
      state.order=action.payload
    })

    .addCase(actions.PAYORDER.fulfilled, (state, action) => {
    })



})
export default rootReducer