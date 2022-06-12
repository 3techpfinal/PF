import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Rating } from '@mui/material';
import Stars from './stars'
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { CREATEREVIEW,MODIFYREVIEW } from '../actions';
import swal from 'sweetalert';
import {   useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';

const labels = {
  0.5: 'Malo',
  1: 'Malo+',
  1.5: 'Pobre',
  2: 'Pobre+',
  2.5: 'Aceptable',
  3: 'Aceptable+',
  3.5: 'Bueno',
  4: 'Bueno+',
  4.5: 'Excelente',
  5: 'Excelente+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const useAppDispatch = () => useDispatch();

export default function FormDialog({product,order,func,reviews}) { //FUNCION PRINCIPAL

  const dispatch=useAppDispatch()
  const navegar = useNavigate()
  console.log('order',order)
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
 console.log('product',product)
 
  let [postValue,SetPostValue]=React.useState({
    review: 0,
    productId:'',
    comment:'',
    order: '',
    showProduct:'',
    showUser:''
  })


 const idReviewObtain = (product,order, reviews)=>{
    let id='valorinicialnopuedeservacio'
    reviews?.map((review)=>(
      ((review.order?._id===order._id)&&(review.product?._id===product._id))&&(id=review._id)
    ))
    return id
 }


React.useEffect(()=>SetPostValue(()=>({//cuando se llene prodcut (con GETDETAIL) setea el tempcardproduct
   //FORMATO DE ENVIO DE DATOS A LA BDD
  review: value,
  productId: product._id,
  comment: '',
  orderId:order._id,
  showProduct: product.name,
  showUser: order.user.email
})),[product,order,value])

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendReview = async() => { //FUNCION QUE ENVIA LOS DATOS A LA BDD
    //console.log('postValue',postValue)

    dispatch(CREATEREVIEW(postValue)).then((r)=>{

      console.log('resBackend',r)
      if(r.payload==="se guardo la calificacion"){
          setOpen(false);
          func()
          swal({
          title:"Realizado",
          text:"Se guardo la calificacion",
          icon:"success",
          button:"Aceptar"})
        }else{
          setOpen(false);
          func()
          swal({
            title:"Error",
            text:"No se guardo la calificacion",
            icon:"error",
            button:"Aceptar"})
          
        }
       
      })  
      
  };



  const sendModifyReview = () => { //FUNCION QUE ENVIA LOS DATOS A LA BDD
    //console.log('postValue',postValue)

    let reviewId
    reviewId=  idReviewObtain(product, order,  reviews)
    //console.log('idReviewObtain',id)
    //console.log('postValue',postValue)
   // postValue={...postValue,reviewId: id}
    //console.log('postValue2',postValue)
    

   /* SetPostValue( postValue => ({
      ...postValue,
      reviewId:id
    }))*/
  //   SetPostValue(()=>({//cuando se llene prodcut (con GETDETAIL) setea el tempcardproduct
  //    review: value,
  //    productId: product._id,
  //    comment: '',
  //    orderId:order._id,
  //    showProduct: product.name,
  //    showUser: order.user.email,
  //    reviewId:id
  //  }))
   //console.log('postValue2',postValue)

  // console.log("input accion",postValue)
   console.log("reviewId",reviewId)

    dispatch(MODIFYREVIEW(postValue,reviewId)).then((r)=>{

      console.log('resBackend',r)
      if(r.payload==="se actualizo la calificacion"){
          setOpen(false);
          func()
          swal({
          title:"Realizado",
          text:"Se guardo la calificacion",
          icon:"success",
          button:"Aceptar"})
        }else{
          setOpen(false);
          func()
          swal({
            title:"Error",
            text:"No se guardo la calificacion",
            icon:"error",
            button:"Aceptar"})
          
        }
       
      })  
      
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} /*disabled={product.hasReview?true:false}*/>
        <Rating precision={0.5} name="read-only" value={product.hasReview} readOnly max={5}/>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Deja tu Calificación de este producto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Que te parecio ${product.name}?`}
          </DialogContentText>
{/* ------------------------------------------  COMPONENTE ESTRELLA INICIO---------------------------------------- */}
  <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
          SetPostValue((old)=>({...old,review:newValue}))
          SetPostValue((old)=>({...old,product:product._id}))
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
          
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
  </Box>

{/* ------------------------------------------  COMPONENTE ESTRELLA FIN---------------------------------------- */}

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Deja un comentario!"
            fullWidth
            variant="standard"
            height={300}
            onChange={(e)=>SetPostValue((old)=>({...old,comment:e.target.value}))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={product.hasReview?sendModifyReview:sendReview}>Enviar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}