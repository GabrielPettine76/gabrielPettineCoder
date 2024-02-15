
const id = document.querySelector('#id');
const imagen = document.querySelector('img');
const nombre = document.querySelector('h3');
const precio = document.querySelector('h4');
const color = document.querySelector('#color');
const contenedor = document.querySelector('.productContainer');
const carritoCompra= document.querySelector('.carrito');
const categorias = document.querySelector('#Categorias');
console.log(categorias);
const totalCarrito = document.querySelector('.total');
const cantidadCarrito = document.querySelector('i');
const contenedorCarrito = document.querySelector('.contenedorCarrito');
const buscarEnElCarrito = document.querySelector('#buscar');
const ordernarMenor = document.querySelector('#ordenarMin');
const ordenarMayor = document.querySelector('#ordenarMay');
let listaCarrito=JSON.parse(localStorage.getItem('productos')) || [];
let guardarTalle='';
let listaProductos=[];
let listaCategoria=[];




//productos



class producto {
   
    //constructor producto
    constructor(productos){
        this.productos = productos;
        
    }
//obtener productos del json
    
    obtenerPorductos = async()=>{
        try{
        const endPoint = 'js/data.json';
        const respuesta = await fetch(endPoint);
        const json = await respuesta.json();
        const {productos, categoria} = json;
        console.log(productos);
        this.getListarProductos(productos);
        this.cargarTalles(productos);
        listaProductos=productos;
        listaCategoria=categoria;
        console.log(listaCategoria);
        this.cargarCategoria(listaCategoria);
        lista.buscar(listaProductos);
        }
        catch(error){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo esta mal. Hubo un error al Cargar los producots!",
                footer: 'Comunica para seguir telefonicamente la compra'
              });
        }

    }
    //funcion Buscar Por ingreso de texto
    buscar(lista) {
        console.log(lista);
        buscarEnElCarrito.addEventListener('input', (e) => {
            const buscarInput = e.target.value.toLowerCase();
            console.log(buscarInput);
    
            const nuevaLista = lista.filter((producto) => 
                producto.nombre.toLowerCase().includes(buscarInput)
            );
            
            console.log(nuevaLista);
            
            this.getListarProductos(nuevaLista);
            this.cargarTalles(nuevaLista);
        });
    }
    //ordenar la lista de productos de menor a mayor
    OrdenarPorPrecioMin(){
        let nuevaLista;
        ordernarMenor.addEventListener('click',()=>{
            console.log(ordernarMenor);
            console.log(listaProductos.sort((x,y)=> x.Precio - y.Precio));
            nuevaLista= listaProductos.sort((x,y)=> x.Precio - y.Precio);
            this.getListarProductos(nuevaLista);
            this.cargarTalles(nuevaLista);
            this.buscar(nuevaLista);
        })
      
        
     }
     //ordenar la lista de productos de Mayor a Menor
     OrdenarPorPrecioMay(){
            let nuevaLista;
            ordenarMayor.addEventListener('click',()=>{
            nuevaLista=listaProductos.sort((x,y)=> y.Precio - x.Precio);
            this.getListarProductos(nuevaLista);
            this.cargarTalles(nuevaLista);
            this.buscar(nuevaLista);
        })
        
    }
    //buscar por categoria
    buscarPorCategoria = () => {
        categorias.addEventListener('change', (e) => {
            console.log(categorias.value);
            let nuevaLista = listaProductos.filter((producto) =>
                producto.categoria_id == categorias.value
            );
            console.table(nuevaLista);
            this.getListarProductos(nuevaLista);
            this.cargarTalles(nuevaLista);
            this.buscar(nuevaLista);
        });
    }
    

    //listar los productos que estan a la venta
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
        this.buscar(listaProductos);
        
    }
    //cargar categoria
    cargarCategoria = (lista) =>{
        console.log(lista);
        lista.forEach(element => {
            categorias.innerHTML+=`<option id="#${element.id}"value=${element.id}>${element.nombre}</option>`;
        });
        
        
    }
    
    
    //cargar los talles de los productos en los selects
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
    //Buscar un producto por id
    getProductos(id){
       
        const buscar = listaProductos.find( item => item.id == id);
        return buscar ? buscar : 'no existe el producto';
    }
    
    //seleccion del select de talles    
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
    //añadir producto
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
        location.reload();
        this.getListarCarrito();
        
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
    //guardar local storage
    guardarLocal =(lista)=>{localStorage.setItem('productos',JSON.stringify(lista))};
    //recuperar los datos del storage
    recuperarDatos = ()=>{
         listaCarrito =JSON.parse(localStorage.getItem('productos')

        )
        return listaCarrito;
    };
    
    
       
    //Vaciar el local storage
    vaciarLocal = ()=> localStorage.clear();
    //listar carrito de compras
    getListarCarrito(){
        
        cantidadCarrito.innerHTML=this.getCantidadCarrito();
        
            
            
        };
        
               
                
        
        
    //agregar al carrito    
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
lista.obtenerPorductos();
lista.recuperarDatos();

lista.buscarPorCategoria();




if(listaCarrito){
    lista.getListarCarrito();
    
}

lista.OrdenarPorPrecioMin();
lista.OrdenarPorPrecioMay();






