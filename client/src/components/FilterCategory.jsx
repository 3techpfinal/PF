import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Divider,Box, TextField,Rating,FormControlLabel,Switch,FormControl,Select, Container } from '@mui/material';
import {GETCATEGORIES,SEARCHBYCATEGORY,GETPRODUCTS} from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import { maxHeight } from '@mui/system';
import color from '../styles'
import {useLocation, useNavigate } from 'react-router-dom';

export default function FilterByCategory() {
    const [sValue,setSvalue]=React.useState('Todos')
    const location=useLocation()
    const navigate=useNavigate()

    const dispatch=useDispatch()
    React.useEffect(()=>{
        dispatch(GETCATEGORIES())
    },[dispatch])
    const categories=useSelector((state)=>state.rootReducer.categories)

    async function handleFilterCategory(e) {
      
      e.target.value==="Todos"? 
      dispatch(GETPRODUCTS())
      :
      dispatch(SEARCHBYCATEGORY(e.target.value))
      if(location!=='/')navigate('/')
    }


  return (
    <Box sx={{minWidth:100}}>
      <FormControl fullWidth>
      <Select
        id="demo-simple-select"
       
        value={sValue}
        onChange={(e) => {
          setSvalue(()=>e.target.value)
          handleFilterCategory(e)
        }}
        name='category'
        sx={{ height:24,bgcolor:color.color3 }}
      >
          <MenuItem key='select' value='Todos'>Todos</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} name={category.name} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
        </Select>
        </FormControl>
    </Box>
  );
}