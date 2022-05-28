import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions/index'

const initialState = {
  products:[],
  detail:[]
}


const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.SEARCHBYNAME, (state, action) => {
    })
    .addCase(actions.GETPRODUCTS.fulfilled, (state, action) => {
      state.products=action.payload
    })
    .addCase(actions.GETDETAIL.fulfilled, (state, action) => {
      state.detail=action.payload
    })

})
export default rootReducer