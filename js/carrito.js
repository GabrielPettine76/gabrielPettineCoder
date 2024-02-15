const carritoCompra2= document.querySelector('.listaDeCarrito');
const totalCarrito = document.querySelector('.total');
const vaciarCarrito = document.querySelector('#vaciar');

let listaCarrito=JSON.parse(localStorage.getItem('productos')) || [];

class carrito{
    constructor(list=[]){
        this.carrito=list;
}


getPonerTotal(){
    let total=this.getSumatorria2();
   
    totalCarrito.innerHTML=`Total=$ ${total}`;
};
//Vaciar carrito de compras
vaciarCarritoCompras(){
    
    vaciarCarrito.addEventListener('click', ()=>{
        listaCarrito=[];
        localStorage.clear();
        this.getListarCarrito();
    });
};
//cantidad de prouctos del carrito
getCantidadCarrito(){
    let suma=0;
    for(let i in listaCarrito){
        suma+=parseInt(listaCarrito[i].cant);
    }
    return suma;
};
//Calcular el monto total del carrito
getSumatorria2(){
    return listaCarrito.reduce(  (acum, product) => 
    {  return acum + (product.cant * product.precio)  }, 0  )
};
guardarLocal =(lista)=>{localStorage.setItem('productos',JSON.stringify(lista))};
    //recuperar los datos del storage
    recuperarDatos = ()=>{
         listaCarrito =JSON.parse(localStorage.getItem('productos')

        )
        console.table(listaCarrito);
        return listaCarrito;
       
    };

    vaciarLocal = ()=> localStorage.clear();
    limpiarCarrito(){
            carritoCompra2.innerHTML='';
        }
getListarCarrito(){
        
    this.limpiarCarrito();
    carritoCompra2.innerHTML=`
    
    <div class="tituloCarrito">
        <h4>Nombre</h4><h4>Cantidad</h4><h4>Precio Unitario</h4><h4>Precio total</h4>
        </div>
    `;
    listaCarrito.forEach(element => {
        
        
        carritoCompra2.innerHTML +=
        `
       
        <div class="carritoEnProducto" }>
            <h4>${element.nombre}
            <button class='btn1' id=${element.id}><i class='bx bxs-trash'></i></button></h4>
            <h4>${element.cant}</h4>
            <h4>$${element.precio}</h4>
            <h4>$${element.precio*element.cant}</h4>
            

        </div>`; 
        });  
        this.getPonerTotal();
        this.eleminarProductoCarrito();
        
        
    };

    vaciarCarritoCompras(){
        const vaciarCarrito = document.querySelector('#vaciar');
        vaciarCarrito.addEventListener('click', ()=>{
            listaCarrito=[];
            localStorage.clear();
            this.getListarCarrito();
        });
    };
    //Eliminar producto del carrito
    eleminarProductoCarrito(){
        const botonesEliminar = document.querySelectorAll('.btn1');
        
        botonesEliminar.forEach((btn)=>{
            
            btn.addEventListener('click',function(){
            const idProducto = parseInt(btn.id);
           
            localStorage.clear();
            listaCarrito = listaCarrito.filter(productos => productos.id !== idProducto);
            localStorage.setItem('productos', JSON.stringify(listaCarrito));
            
            location.reload();
            
            
           });
           
            
        });
        
    };
}

carrito = new carrito();
carrito.recuperarDatos();
if(listaCarrito){
    
    carrito.getListarCarrito();
    
}
carrito.vaciarCarritoCompras();