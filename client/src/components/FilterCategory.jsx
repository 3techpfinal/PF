import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Divider,Box, TextField,Rating,FormControlLabel,Switch,FormControl,Select, Container } from '@mui/material';
import {GETCATEGORIES,SEARCHBYCATEGORY,GETPRODUCTS} from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import { maxHeight } from '@mui/system';

export default function FilterByCategory() {

    const dispatch=useDispatch()
    React.useEffect(()=>{
        dispatch(GETCATEGORIES())
    },[dispatch])
    const categories=useSelector((state)=>state.rootReducer.categories)

    async function handleFilterCategory(e) {
      e.target.value==="Todos"? 
      dispatch(GETPRODUCTS())
      :
      dispatch(SEARCHBYCATEGORY(e.target.value));
    }


  return (
    <Box sx={{ maxWidth: 1 }}>
      <FormControl fullWidth>
      <Select
        id="demo-simple-select"
       
        value={"select"}
        onChange={(e) => handleFilterCategory(e)}
        name='category'
        sx={{ height:24 }}
      >
          <MenuItem key='select' value='Todos'>Todos</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
        </Select>
        </FormControl>
    </Box>
  );
}