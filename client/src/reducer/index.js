import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions/index'

const initialState = {}


const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.SEARCHBYNAME, (state, action) => {
    })

})
export default rootReducer