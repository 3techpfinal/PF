import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { CardMedia, IconButton,Box,Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useSelector,useDispatch} from 'react-redux'
import { GETWISHLIST,DELETEFROMWISHLIST } from '../actions';

export default function BasicPopover({wishlist,setWishList}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch=useDispatch()


  const deleteElement=(productId)=>{
    setWishList((old)=>old.filter((e)=>e._id!==productId))
    dispatch(DELETEFROMWISHLIST({productId:productId}))
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} variant="contained" onClick={handleClick} style={{color: 'white'}}>
        <FavoriteIcon/>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {wishlist?.map(product=>(
          <>
          <Box sx={{display:'flex',justifyContent:'space-between'}}>
            <Box sx={{width:100,marginX:1}}>
            <CardMedia
            component="img"
            height="100"
            width='100'
            image={product?.imageProduct[0]}
            alt="gf"
            sx={{objectFit:'contain'}}
           />
            </Box>
           <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'100%',mt:2}}>
           <Typography sx={{fontSize:10,maxHeight:50}}>{product.name.slice(0,40)}</Typography>
           <Typography sx={{fontSize:10,maxHeight:50}}>${product.price}</Typography>
           </Box>
           <IconButton onClick={()=>deleteElement(product._id)}style={{color: 'red',borderRadius:0}}>
            <FavoriteIcon />
          </IconButton>
          </Box>
          <Divider/>
          </>
        ))}
      </Popover>
    </div>
  );
}