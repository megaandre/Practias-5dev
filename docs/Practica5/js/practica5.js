// Arreglo de productos
let productos = [
    { nombre: "Camiseta", precio: 15, stock: 10 },
    { nombre: "Pantalones", precio: 25, stock: 8 },
    { nombre: "Zapatos", precio: 50, stock: 5 },
    { nombre: "Sombrero", precio: 10, stock: 20 },
  ];
  
  
  let carrito = [];
  
 
  function agregarAlCarrito(productoNombre, cantidad) {
    for (let producto of productos) {
      if (producto.nombre === productoNombre) {
        if (producto.stock >= cantidad) {
          carrito.push({
            nombre: productoNombre,
            cantidad: cantidad,
            precio: producto.precio,
          });
  
          producto.stock -= cantidad;
          console.info(`${cantidad} ${productoNombre}(s) agregado(s) al carrito`);
        } else {
          console.error(`No hay suficiente stock de ${productoNombre}`);
        }
        return;
      }
    }
    console.error(`El producto "${productoNombre}" no existe.`);
  }
  
  
  function eliminarDelCarrito(productoNombre, cantidad) {
    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].nombre === productoNombre) {
        if (carrito[i].cantidad >= cantidad) {
          carrito[i].cantidad -= cantidad;
  
          
          for (let producto of productos) {
            if (producto.nombre === productoNombre) {
              producto.stock += cantidad;
              break;
            }
          }
  
          console.info(`${cantidad} ${productoNombre}(s) eliminado(s) del carrito`);
  
          
          if (carrito[i].cantidad === 0) {
            carrito.splice(i, 1);
          }
        } 
        
        else 
        {
          console.error(`No tienes tantas unidades de ${productoNombre} en el carrito.`);
        }
        return;
      }
    }
    console.error(`El producto "${productoNombre}" no está en el carrito.`);
  }
  
  
  function calcularTotal() {
    let total = 0;
    for (let item of carrito) {
      total += item.precio * item.cantidad;
    }
    return total;
  }
  
  
  function aplicarDescuento(total) {
    if (total > 100) {
      return total * 0.9;
    }
    return total;
  }
  
  
  function mostrarTiempoRestante() {
    let tiempo = 3;
    let intervalo = setInterval(function () {
      console.log(`Compra confirmada en ${tiempo}...`);
      tiempo--;
  
      if (tiempo < 0) {
        clearInterval(intervalo);
        procesarCompra();
      }
    }, 1000);
  }
  
  
  function procesarCompra() {
    console.log("Procesando compra...");
    setTimeout(function () {
      let total = calcularTotal();
      total = aplicarDescuento(total);
      console.log(`Compra completada. Total a pagar: $${total.toFixed(2)}`);
    }, 3000);
  }
  
  
  agregarAlCarrito("Pantalones", 3);
  agregarAlCarrito("Zapatos", 2);
  console.log(carrito);
  
  eliminarDelCarrito("Pantalones", 1);
  eliminarDelCarrito("Zapatos", 1);
  console.log(carrito);
  
  mostrarTiempoRestante();
  