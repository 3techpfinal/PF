import React from "react";
import NavBar from "../components/NavBar"
import ItemCounter from "../ui/ItemCounter"
import { useState } from 'react';


export default function Prueba() {

    const [tempCartProduct, setTempCartProduct] = useState({
        quantity: 1
      })

    const onUpdateQuantity = ( quantity ) => {
        setTempCartProduct( currentProduct => ({
            ...currentProduct,
            quantity
          }));
      }




  return (
    <div>
        <NavBar/>
        <ItemCounter currentValue={tempCartProduct.quantity} updatedQuantity={onUpdateQuantity} maxValue={500}/>
    </div>
    )
  }