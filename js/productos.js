
const id = document.querySelector('#id');
const imagen = document.querySelector('img');
const nombre = document.querySelector('h3');
const precio = document.querySelector('h4');
const color = document.querySelector('#color');
const contenedor = document.querySelector('.productContainer');
const carritoCompra= document.querySelector('.carrito');
const totalCarrito = document.querySelector('.total');
const cantidadCarrito = document.querySelector('i');
const contenedorCarrito = document.querySelector('.contenedorCarrito');
const buscarEnElCarrito = document.querySelector('#buscar');
const ordernarMenor = document.querySelector('#ordenarMin');
const ordenarMayor = document.querySelector('#ordenarMay');
let listaCarrito=JSON.parse(localStorage.getItem('productos')) || [];
let guardarTalle='';





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
    buscar() {
        buscarEnElCarrito.addEventListener('input', (e) => {
            const buscarInput = e.target.value;
            console.log(buscarInput);
            const nuevaLista = productos.filter((productos) => productos.nombre.toLowerCase().includes(buscarInput.toLowerCase()));
            console.log(nuevaLista);
             this.getListarProductos(nuevaLista);
            this.cargarTalles(nuevaLista);
        });
    }
    OrdenarPorPrecioMin(){
        let nuevaLista;
        ordernarMenor.addEventListener('click',()=>{
            console.log(ordernarMenor);
            console.log(productos.sort((x,y)=> x.Precio - y.Precio));
            nuevaLista= productos.sort((x,y)=> x.Precio - y.Precio);
            this.getListarProductos(nuevaLista);
            this.cargarTalles(nuevaLista);
        })
      
        
     }
     OrdenarPorPrecioMay(){
            let nuevaLista;
            ordenarMayor.addEventListener('click',()=>{
            nuevaLista=productos.sort((x,y)=> y.Precio - x.Precio);
            this.getListarProductos(nuevaLista);
            this.cargarTalles(nuevaLista);
        })
        
    }

    getListarProductos(product){
        contenedor.innerHTML='';
        product.forEach( producto =>{
            
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
                        <div class="talleProducto">
                        
                         <select class="talles${producto.id}" required></select>
                        </div>
                        <div class="colorProducto">
                            <input type="color"id="color" value="${producto.color}" disabled>
                        </div>
                        <div class="comprar"><button class='btn' id=${producto.id}>Agregar</button></div>
             </div>`;
        });
       
        this.agregarAlCarrito();
        this.seleccionarTalles();
        
    } 

    cargarTalles(productos) {
        console.log(productos);
        for (let i in productos) {
            let clase = '.talles';
            clase = clase + productos[i].id;
            
            let select = document.querySelector(clase);
            let opcionesHTML =  `<option value="" disable>Seleccione el Talle:</option>`;  // Inicializa opcionesHTML dentro del bucle exterior
            
            for (let j in productos[i].talle) {
                opcionesHTML += `<option value="${productos[i].talle[j]}">${productos[i].talle[j]}</option>`;
                
            }
            
                select.innerHTML = opcionesHTML;
            
        }
    }
    
    getProductos(id){
       
        const buscar = productos.find( item => item.id == id);
        return buscar ? buscar : 'no existe el producto';
    }
    
        
    seleccionarTalles = () => {
        
        const selects = document.querySelectorAll('select');
        let talle3;
        selects.forEach((select) => {
            select.addEventListener('change', (e) => {
                guardarTalle = e.target.value;
                talle3=e.target.className;
                
                
            });
            return talle3;
        });
    }    
    addProducto(id1,nombre1, precio1, talle1, rodado1,color1,imagen1){
        
        console.log(id1,nombre1,precio1,talle1,rodado1,color1,imagen1);

        console.log(talle1,talle1.className);
        if(talle1){
        let indice;
        if(!listaCarrito){
        indice =-1;
        }
        else{
            indice =listaCarrito.findIndex(productos => productos.id == id1);
           
        }
       
        if(indice==-1){
        let objeto ={
            id:parseInt(id1),
            imagen:imagen1,
            nombre:nombre1,
            precio:precio1,
            color:color1,
            talle:[talle1],
            rodado:rodado1,
            cant:1
        };
       
        listaCarrito = listaCarrito || [];
        listaCarrito.push(objeto);
        }
        else{
                listaCarrito[indice].cant++;
                listaCarrito[indice].talle.push(this.seleccionarTalles());
           }
        this.guardarLocal(listaCarrito);
        this.getListarCarrito();
        this.getPonerTotal();
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo esta mal. No ingresaste El Talle!",
            footer: '<a href="#">Tenes que seleccionar el talle?</a>'
          });
    }
    }

    getPonerTotal(){
        let total=this.getSumatorria2();
       
        totalCarrito.innerHTML=`Total=$ ${total}`;
    };

    getCantidadCarrito(){
        let suma=0;
        for(let i in listaCarrito){
            suma+=parseInt(listaCarrito[i].cant);
        }
        return suma;
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
        
        cantidadCarrito.innerHTML=this.getCantidadCarrito();
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
        
    agregarAlCarrito(){
        const boton = document.querySelectorAll('.btn');      
        let id2;
        let talle1;
        
        boton.forEach((btn) =>{
        btn.addEventListener('click',()=>{
            !listaCarrito ? id2= btn.id: id2= btn.id;
            talle1=this.seleccionarTalles(id2);
            console.log(id2,talle1);
            this.addProducto(id2,this.getProductos(btn.id).nombre,this.getProductos(btn.id).Precio,guardarTalle,
            this.getProductos(btn.id).rodado,this.getProductos(btn.id).color,this.getProductos(btn.id).imagen);
            guardarTalle=''
        })
       guardarTalle=''; 
    });
    

}

}


const lista = new producto;

lista.getListarProductos(productos);
lista.buscar();
lista.recuperarDatos();
lista.cargarTalles(productos);
//lista.seleccionarTalles();

if(listaCarrito){
    lista.getListarCarrito();
    
}
lista.vaciarCarritoCompras();
lista.OrdenarPorPrecioMin();
lista.OrdenarPorPrecioMay();





