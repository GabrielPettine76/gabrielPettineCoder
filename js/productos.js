const id = document.querySelector('#id');
const imagen = document.querySelector('img');
const nombre = document.querySelector('h3');
const precio = document.querySelector('h4');
const color = document.querySelector('#color');
const contenedor = document.querySelector('.productContainer');
const carritoCompra= document.querySelector('.carrito');
const totalCarrito = document.querySelector('.total');
const contenedorCarrito = document.querySelector('.contenedorCarrito');
let listaCarrito=JSON.parse(localStorage.getItem('productos')) || [];




const productos = [
    {
        id:0,
        imagen:"./images/descarga.jpg",
        nombre:'Giant XTC',
        Precio:1500000,
        color: "#2867A6",
        rodado:29,
        talle:[15,17,19,21]

    },
    {
        id:1,
        imagen:"./images/Calea.jpg",
        nombre:' Zenith Calea',
        Precio:1000000,
        color: "#A2A6AA",
        rodado:29,
        talle:[15,17,19,21]

    },
    {
        id:2,
        imagen:"./images/topMega.jpg",
        nombre:'Top Mega Armor',
        Precio: 500000,
        color: "#59A8F6" ,
        rodado:29,
        talle:[16,18,20]

    },
    {
        id:3,
        imagen:"./images/scott.jpg",
        nombre:'Scott Scale 970',
        Precio: 2500000,
        color: "#000000",
        rodado:29,
        talle:[16,18,20]

    },
    {
        id:4,
        imagen:"./images/trek.jpg",
        nombre:'Treck Madone',
        Precio: 4500000,
        color: "#000000",
        rodado:28,
        talle:[50,52,54,56,58]

    },
    {
        id:5,
        imagen:"./images/bianchi.jpg",
        nombre:'Bianchi Oltre xr4',
        Precio: 4000000,
        color: "#59A8F6",
        rodado:28,
        talle:[50,52,54,56,58]

    },
    {
        id:6,
        imagen:"./images/volta.jpg",
        nombre:'Volta Viggo',
        Precio: 800000,
        color: "#F93403",
        rodado:29,
        talle:[16,18,20]

    },
    {
        id:7,
        imagen:"./images/specializad.jpg",
        nombre:'Specializad Tarmac',
        Precio: 4800000,
        color: "#ffffff",
        rodado:29,
        talle:[50,52,54,56,58]

    },
    {
        id:8,
        imagen:"./images/casco.png",
        nombre:'Casco Ruta',
        Precio: 48000,
        color: "#ffffff",
        rodado:0,
        talle:[50,52,54,56,58]

    },
    

];


class producto {
   
    //constructor producto
    constructor(productos){
        this.productos = productos;
        
    }
    
    getListarProductos(){
       
        productos.forEach( producto =>{
            
            contenedor.innerHTML +=
            `
            <div class="producto" }>
                        <div class="productoImagen">
                            <img src="${producto.imagen}" alt="Giant">
                        </div>
                        <div class="nombreProducto">
                            <h3>${producto.nombre}</h3>
                        </div>
                        <div class="precioProducto">
                            <h4>$${producto.Precio}</h4>
                        </div>
                        <div class="colorProducto">
                            <input type="color"id="color" value="${producto.color}" disabled>
                        </div>
                        <div class="comprar"><button class='btn' id=${producto.id}>Agregar</button></div>
             </div>`;
        });
    } 
    getProductos(id){
       
        const buscar = productos.find( item => item.id == id);
        return buscar ? buscar : 'no existe el producto';
    }

    addProducto(id1,nombre1, precio1, talle1, rodado1,color1,imagen1){
        
        console.log(id1,nombre1,precio1,talle1,rodado1,color1,imagen1);
        let indice;
        if(!listaCarrito){
        indice =-1;
        }
        else{
            indice =listaCarrito.findIndex(productos => productos.id == id1);
        console.log(indice)
        }
       
        if(indice==-1){
        let objeto ={
            id:parseInt(id1),
            imagen:imagen1,
            nombre:nombre1,
            precio:precio1,
            color:color1,
            talle:talle1,
            rodado:rodado1,
            cant:1
        };
       
        listaCarrito = listaCarrito || [];
        listaCarrito.push(objeto);
        }
        else{
            listaCarrito[indice].cant++;
            
            
        }
       
        this.guardarLocal(listaCarrito);
        this.getListarCarrito();
        this.getPonerTotal();
    }

    getPonerTotal(){
        let total=this.getSumatorria2();
       
        totalCarrito.innerHTML=`Total=$ ${total}`;
    };
    getCantidadCarrito(){
        return listaCarrito.length;
    };

    getSumatorria2(){
        return listaCarrito.reduce(  (acum, product) => 
        {  return acum + (product.cant * product.precio)  }, 0  )
    };

    guardarLocal =(lista)=>{localStorage.setItem('productos',JSON.stringify(lista))};
    
    recuperarDatos = ()=>{
         listaCarrito =JSON.parse(localStorage.getItem('productos')

        )
        return listaCarrito;
    };
    
    vaciarLocal = ()=> localStorage.clear();
    getListarCarrito(){
        
        carritoCompra.innerHTML=`
        
        <div class="tituloCarrito">
            <h4>Nombre</h4><h4>Cantidad</h4><h4>Precio Unitario</h4><h4>Precio total</h4>
            </div>
        `;
        listaCarrito.forEach(element => {
            
            
            carritoCompra.innerHTML +=
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
        eleminarProductoCarrito(){
            const botonesEliminar = document.querySelectorAll('.btn1');
            console.log(botonesEliminar);
            botonesEliminar.forEach((btn)=>{
                console.log(btn);
                btn.addEventListener('click',function(){
                const idProducto = parseInt(btn.id);
                console.log(parseInt(idProducto));
                localStorage.clear();
                listaCarrito = listaCarrito.filter(productos => productos.id !== idProducto);
                localStorage.setItem('productos', JSON.stringify(listaCarrito));
                
                location.reload();
                
                
               });
               
                
            });
            
        };
    agregarAlCarrito(){
        const boton = document.querySelectorAll('.btn');      
        let id2
        boton.forEach((btn) =>{
        btn.addEventListener('click',()=>{
            !listaCarrito ? id2= btn.id: id2= btn.id;
            this.addProducto(id2,this.getProductos(btn.id).nombre,this.getProductos(btn.id).Precio,18,
            this.getProductos(btn.id).rodado,this.getProductos(btn.id).color,this.getProductos(btn.id).imagen);
            
        })
        
    });
    

}
}


const lista = new producto;
lista.getListarProductos();
lista.agregarAlCarrito();
lista.recuperarDatos();
if(listaCarrito){
    lista.getListarCarrito();
    
}
lista.vaciarCarritoCompras();





