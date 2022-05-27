import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions/index'

const initialState = {
  products:[]
}


const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.SEARCHBYNAME, (state, action) => {
    })
    .addCase(actions.GETPRODUCTS.fulfilled, (state, action) => {
      state.products=action.payload
    })

})
export default rootReducer