const d = document;
const $listaCarrito = d.querySelector("#lista-carrito");
const $totalCarrito = d.querySelector("#total-carrito");
const $btnCompra = d.querySelector("#btn-compra");
const $loaderContainer = d.querySelector("#loader-container");
const $tiempoRestante = d.querySelector("#tiempo-restante");

let carrito = {};

d.addEventListener("click", function (e) {
  if (!e.target.matches(".producto")) {
    return false;
  }

  const $producto = e.target;
  let nombre = $producto.getAttribute("data-nombre");
  let precio = parseFloat($producto.getAttribute("data-precio"));

  if (carrito[nombre]) {
    carrito[nombre].cantidad += 1;
  } else {
    carrito[nombre] = { precio, cantidad: 1 };
  }

  actualizarCarrito();
});

function actualizarCarrito() {
  $listaCarrito.innerHTML = "";

  let total = 0;

  for (let nombre in carrito) {
    let { precio, cantidad } = carrito[nombre];
    total += precio * cantidad;

    const $itemCarrito = d.createElement("li");
    $itemCarrito.innerHTML = `
      ${nombre} - $${precio} x ${cantidad}
      <button class="btn-restar" data-nombre="${nombre}">-</button>
      <button class="btn-sumar" data-nombre="${nombre}">+</button>
    `;
    $listaCarrito.appendChild($itemCarrito);
  }

  $totalCarrito.innerText = total.toFixed(2);
}

$listaCarrito.addEventListener("click", function (e) {
  if (e.target.matches(".btn-sumar")) {
    let nombre = e.target.getAttribute("data-nombre");
    carrito[nombre].cantidad += 1;
    actualizarCarrito();
  }

  if (e.target.matches(".btn-restar")) {
    let nombre = e.target.getAttribute("data-nombre");
    carrito[nombre].cantidad -= 1;

    if (carrito[nombre].cantidad === 0) {
      delete carrito[nombre];
    }

    actualizarCarrito();
  }
});

$btnCompra.addEventListener("click", function (e) {
  if ($listaCarrito.children.length > 0) {
    let segundosRestantes = 5;

    $loaderContainer.classList.remove("hidden");

    const intervalo = setInterval(() => {
      segundosRestantes -= 1;
      $tiempoRestante.innerText = segundosRestantes;

      if (segundosRestantes === 0) {
        clearInterval(intervalo);

        $loaderContainer.classList.add("hidden");
        alert("¡Compra realizada con éxito!");
        $listaCarrito.innerHTML = "";
        $totalCarrito.innerText = "0.00";
        carrito = {};
      }
    }, 1000);

  } else {
    alert("El carrito está vacío, no se puede realizar la compra.");
  }
});
