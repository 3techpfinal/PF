import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import {Box,Button} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import { NavLink,Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import color from '../styles'
import SearchBar from '../ui/SearchInput'
import FilterCategory from './FilterCategory'
import { Container } from '@mui/system';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GETPRODUCTS,SEARCHBYCATEGORY,VERIFYADMIN } from '../actions';
import CartContext from '../components/Cart/CartContext'
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react";
import Cookie from 'js-cookie'
import {api} from '../actions'
import { cartReducer } from './Cart/cartReducer';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 30,
  },
}));


export default function PrimarySearchAppBar() {
  const categories=useSelector((state)=>state.rootReducer.categories)
  const isAdmin=useSelector((state)=>state.rootReducer.isAdmin)
  const { numberOfItems,total } = React.useContext( CartContext );
  const { user, isAuthenticated,getIdTokenClaims,logout,loginWithPopup } = useAuth0();
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [logged,setLogged]=React.useState(false)


  React.useEffect(()=>{
    dispatch(VERIFYADMIN())
  },[isAuthenticated])

  React.useEffect(()=>{
    if(!Cookie.get('cart'))Cookie.set('cart',JSON.stringify([]))
  },[])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 70,
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={()=>{navigate('/profile')}}>Profile</MenuItem>
      {isAdmin && <MenuItem onClick={()=>{navigate('/admin/dashboard')}}>Dashboard</MenuItem>}
      <MenuItem onClick={()=>{
        Cookie.set('user',JSON.stringify([]))
        Cookie.remove('cart')
        Cookie.remove('token')
        logout({ returnTo: window.location.origin })
        }}>Cerrar sesión</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 65,
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>


      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
<>
   
    <Container sx={{ flexGrow: 1, zIndex: 'tooltip'}} position="fixed" top='0px'>
      <AppBar sx={{bgcolor:color.color1}} >
        <StyledToolbar sx={{justifyContent:'space-between',alignItems:'center',height:30,mt:1}}>
          
          <Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs:'block',textDecoration:'none' } }}
              onClick={()=>dispatch(GETPRODUCTS())}
            >
              <Link to='/'>
              3TECH
              </Link>
            </Typography>
          </Box>



          <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <SearchBar />
          </Box>
        
          <Box sx={{display:'flex',alignItems:'center'}}>
            <NavLink to='/cart' style={isActive => ({color: isActive ? "white" : "white"})}>
                  <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                      <Badge badgeContent={numberOfItems} color="error">
                          <ShoppingCart />
                      </Badge>
                  </IconButton>
              </NavLink>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {isAuthenticated?<IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar alt="Remy Sharp" src={user?.picture} />
              </IconButton>
              :<Button sx={{bgcolor:color.color2,color:'black',ml:2}}
              onClick={()=>loginWithPopup().then(()=>getIdTokenClaims()).then(r=>axios.post(`${api}/users/login`,{token:r.__raw})).then(r=>{
                Cookie.set('token',r.data.token)
                Cookie.set('user',JSON.stringify(r.data.user))
                axios.post(`${api}/cart`,{
                  cart:JSON.parse( Cookie.get('cart') ),
                  totalPrice:total
                },{
                  headers:{
                    'x-access-token':r.data.token
                  }
                })
     
              }).then(()=>{

                const token= Cookie.get('token')
                axios(`${api}/cart`,
                {
                    headers:{
                         'x-access-token':token
                    }
                }).then((r)=>{
                    Cookie.set('cart',JSON.stringify(r.data.cart))            
                })

              }).then(()=>{
                dispatch(VERIFYADMIN())
                window.location.reload()
                })}>
                Login
                </Button>}
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Box>


          
        </StyledToolbar>
        <Divider sx={{bgcolor:color.color3,m:1}}/>
        <Box sx={{display:'flex',justifyContent:'center',mb:1,alignItems:'center'}}>
          <Typography variant='body2' sx={{mr:2}}>Categorias: </Typography>
          <FilterCategory/>
          <Divider orientation="vertical" flexItem sx={{display:{xs:'none',md:'flex'},bgcolor:'white',marginX:1}}/>
            <Box sx={{display:{xs:'none',md:'flex'},flexDirection:'row'}}>
            {categories.map((e)=>(
              <>
              <Button key={e._id} onClick={()=>{
                dispatch(SEARCHBYCATEGORY(e._id))
                navigate('/')
                }}>
              <Typography variant='body2' sx={{color:'white',fontWeight:20}}>{e.name}</Typography>
              </Button>
              <Divider orientation="vertical" variant='middle'flexItem sx={{bgcolor:'white',marginX:1}}/>
              </>               
            ))}
            </Box>
        </Box>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Container>
    </>
  );
}