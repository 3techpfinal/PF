

export function receipt(order,user){

    const header = `<h1>Hola ${user.name} ${user.lastName}!</h1> <br />
    <h3>La orden Nº ${order._id} ha sido correctamente pagada y en los próximos días estará en camino.</h3>
    <p>Te enviaremos un email una vez que la misma haya sido despachada, con los detalles del envío.</p>
    
    <h3>Detalle de tu compra</h3>
    <h4>Nº de Orden: ${order._id}</h4>`

    const body = order.products.map(product=>{
        return `
        <div> 
        <h4>${product.name}</h4>
        <img src= ${product.imageProduct[0]}/>
        <p>Cantidad : ${product.quantity}</p>
        <p>Precio unitario : ${product.quantity}</p>
        <p>Precio total : ${product.price * product.quantity}</p>
        </div>
        `
    
        return
        
})

}