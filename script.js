const productos = [
  { id: 8, nombre: "Lechugas", precio: 1000, imagen: "https://boginatural.com/wp-content/uploads/2023/09/Lechugas-1.png" },
    { id: 7, nombre: "Manzana", precio: 1500, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFoCXjSpaOmrpXcc3Qo2pZbKLW79MIgMwQ_A&s" },
      { id: 6, nombre: "Tomates", precio: 1500, imagen: "https://tse4.mm.bing.net/th/id/OIP.RqzX82xVsUT7-Gi2Xrt4SgHaFc?rs=1&pid=ImgDetMain&o=7&rm=3" },
        { id: 5, nombre: "Frutillas", precio: 2000, imagen: "https://www.parati.com.ar/wp-content/uploads/2020/10/frutillas.jpg" },
  { id: 2, nombre: "Banana", precio: 1500, imagen: "https://media.istockphoto.com/id/1184345169/es/foto/pl%C3%A1tano.jpg?s=612x612&w=0&k=20&c=rpTz_RkniuTuU-lvzGoLinjnC45LtW_RbAXxmWhjBxU=" },
  { id: 3, nombre: "Uvas", precio: 2000, imagen: "https://fundaciondelcorazon.com/images/stories/corazon-facil/impulso-vital/uvas.jpg" },
  { id: 4, nombre: "Naranja", precio: 1000, imagen: "https://media.istockphoto.com/id/185284489/es/foto/naranja.jpg?s=1024x1024&w=is&k=20&c=w0GEIf9_AaQeLOieJVz_jLNteaD5YTMQgyHUcLu1LMM=" },
  { id: 1, nombre: "Paltas", precio: 5000, imagen: "https://agraria.pe/imgs/a/lx/menores-envios-en-el-inicio-de-la-campana-de-palta-hass-21442.jpg" },
  { id: 9, nombre: "Pepinos", precio: 800, imagen: "https://th.bing.com/th/id/R.9793c3731208c9abeca416c8b2df2242?rik=ELZe%2f%2fYh1MmNbw&riu=http%3a%2f%2f3.bp.blogspot.com%2f-IA3r8Ee4Nws%2fVLYklCh99aI%2fAAAAAAAAAFQ%2fdvrsG3zXh0g%2fs1600%2fam_49529_3656283_802149.jpg&ehk=lu2z0oj0yh3HEJ%2bv4npB%2fMr%2bl6%2fAmRuXvcpbat0vx7s%3d&risl=&pid=ImgRaw&r=0" },
   { id: 10, nombre: "Coliflor", precio: 1200, imagen: "https://tse4.mm.bing.net/th/id/OIP.ckbmZ16OQxFl_szgNy0OvwHaFj?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 11, nombre: "Mandarinas", precio: 800, imagen: "https://laveguitadenormi.cl/wp-content/uploads/2023/05/IMG_7301.jpeg" },
     { id: 12, nombre: "Zanahorias", precio: 800, imagen: "https://portalvallenato.net/wp-content/uploads/2024/06/zanahoria.12.jpg" },
      { id: 13, nombre: "Sandias", precio: 6000, imagen: "https://i0.wp.com/citymagazine.si/wp-content/uploads/2016/06/shutterstock_126068165.jpg" },
      { id: 14, nombre: "Mangos", precio: 2000, imagen: "https://tse1.explicit.bing.net/th/id/OIP.hf-6R0Rtt9NidF8kn9w0IgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" },
      
];

const contenedor = document.getElementById("productos");
const carritoLista = document.getElementById("carrito");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarProductos() {
  contenedor.innerHTML = "";
  productos.forEach(producto => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const existente = carrito.find(item => item.id === id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function mostrarCarrito() {
  carritoLista.innerHTML = "";
  let total = 0;
  

  carrito.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio} x ${item.cantidad}
      <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
    `;
    carritoLista.appendChild(li);
    total += item.precio * item.cantidad;
  });

  document.getElementById("total").textContent = `Total a pagar: $${total}`;
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}
function vaciarCarrito() {
  const confirmar = confirm("¿Estás seguro de que quieres vaciar el carrito?");
  if (confirmar) {
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
  }
}
mostrarProductos();
mostrarCarrito();
document.getElementById("formularioPago").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const metodo = document.getElementById("metodoPago").value;

  if (carrito.length === 0) {
    alert("Tu carrito está vacío. Agrega productos antes de pagar.");
    return;
  }

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  document.getElementById("mensajeConfirmacion").textContent =
    `Gracias, ${nombre}. Hemos recibido tu pedido por $${total}. Te contactaremos a ${correo} para coordinar el pago por ${metodo}.`;

  carrito = [];
  localStorage.removeItem("carrito");
  mostrarCarrito();
});
const slides = document.querySelectorAll('#bannerRotador .slide');
let idx = 0;
function rotarBanner() {
  slides.forEach(s => s.classList.remove('activo'));
  slides[idx].classList.add('activo');
  idx = (idx + 1) % slides.length;
}
if (slides.length) { rotarBanner(); setInterval(rotarBanner, 4500); }


  // Mostrar comentarios al cargar la página
  function mostrarComentarios() {
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  const container = document.getElementById("commentsContainer");
  container.innerHTML = "";

  const frutas = ["🍎", "🍌", "🍇", "🍓", "🍍", "🥝", "🍊", "🍉"];

  comments.forEach(c => {
    const fruta = frutas[Math.floor(Math.random() * frutas.length)];
    const estrellas = "⭐".repeat(c.rating);

    const div = document.createElement("div");
    div.classList.add("comentario");
    div.innerHTML = `
      <div class="comentario-cabecera">${fruta} <strong>${c.name}</strong></div>
      <p>${c.comment}</p>
      <div class="comentario-rating">${estrellas}</div>
    `;
    container.appendChild(div);
  });
}

document.getElementById("commentForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("userName").value;
  const comment = document.getElementById("userComment").value;
  const rating = parseInt(document.getElementById("userRating").value);

  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.push({ name, comment, rating });
  localStorage.setItem("comments", JSON.stringify(comments));

  mostrarComentarios();
  e.target.reset();
});

mostrarComentarios();
document.getElementById("borrarComentarios").addEventListener("click", function () {
  const confirmar = confirm("¿Estás seguro de que quieres borrar todos los comentarios?");
  if (confirmar) {
    localStorage.removeItem("comments");
    mostrarComentarios();
  }
});
const logo = document.getElementById('logo-fruteria');
if (isDark) {
  logo.src = 'img/logo-claro.png';
} else {
  logo.src = 'img/logo-original.png';
}
function filtrarCategoria(categoria) {
  const productos = document.querySelectorAll('.producto');
  productos.forEach(producto => {
    const cat = producto.dataset.categoria;
    if (categoria === 'todas' || cat === categoria) {
      producto.style.display = 'block';
    } else {
      producto.style.display = 'none';
    }
  });
}
btnMusica.textContent = musica.paused ? '🔇 Silencio' : '🔊 Música';