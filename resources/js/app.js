/* ============================================================
   8. DATOS
   Cada lugar es un objeto. Para agregar uno nuevo, copia un
   bloque { ... } y cámbiale los valores.
   Son datos de ejemplo: puedes cambiar los ratings.
   En lugar de fotos usamos un emoji y un color de fondo.
   Cuando quieras fotos reales: agrega  foto: "img/atitlan.jpg"
   y cambia el HTML de la tarjeta para usar <img>.
   ============================================================ */
const lugares = [
  { id: 1,  nombre: "Antigua Guatemala",   region: "Sacatepéquez",   categoria: "Ciudades", emoji: "🏛️", color: "#f3e3d3", rating: 4.9, destacado: true  },
  { id: 2,  nombre: "Lago de Atitlán",     region: "Sololá",         categoria: "Lagos",    emoji: "🏞️", color: "#d6e9f2", rating: 4.9, destacado: true  },
  { id: 3,  nombre: "Volcán Pacaya",       region: "Escuintla",      categoria: "Volcanes", emoji: "🌋", color: "#e8d9d4", rating: 4.7, destacado: false },
  { id: 4,  nombre: "Tikal",               region: "Petén",          categoria: "Ruinas",   emoji: "🗿", color: "#dbead7", rating: 4.9, destacado: true  },
  { id: 5,  nombre: "Semuc Champey",       region: "Alta Verapaz",   categoria: "Lagos",    emoji: "💧", color: "#d3ece6", rating: 4.8, destacado: false },
  { id: 6,  nombre: "Monterrico",          region: "Santa Rosa",     categoria: "Playas",   emoji: "🏖️", color: "#f6ecc9", rating: 4.3, destacado: false },
  { id: 7,  nombre: "Chichicastenango",    region: "Quiché",         categoria: "Ciudades", emoji: "🧵", color: "#f0dbe3", rating: 4.6, destacado: false },
  { id: 8,  nombre: "Volcán Acatenango",   region: "Chimaltenango",  categoria: "Volcanes", emoji: "⛰️", color: "#dedfe9", rating: 4.8, destacado: true  },
  { id: 9,  nombre: "Río Dulce",           region: "Izabal",         categoria: "Lagos",    emoji: "🛶", color: "#d6ebe2", rating: 4.5, destacado: false },
  { id: 10, nombre: "Yaxhá",               region: "Petén",          categoria: "Ruinas",   emoji: "🌴", color: "#e2ecd0", rating: 4.7, destacado: false },
  { id: 11, nombre: "Livingston",          region: "Izabal",         categoria: "Playas",   emoji: "🥥", color: "#f4e1cf", rating: 4.4, destacado: false },
  { id: 12, nombre: "Quetzaltenango",      region: "Quetzaltenango", categoria: "Ciudades", emoji: "🏙️", color: "#e4e4e4", rating: 4.5, destacado: false }
];

/* ============================================================
   9. ESTADO DE LA APLICACIÓN
   "Estado" = lo que la página necesita recordar.
   ============================================================ */
let categoriaActiva = "Todos";
let textoBusqueda = "";

// Favoritos: lo leemos de localStorage para que sobrevivan al recargar.
// try/catch porque algunos navegadores bloquean localStorage.
let favoritos = [];
try {
  favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
} catch (e) { favoritos = []; }

function guardarFavoritos() {
  try { localStorage.setItem("favoritos", JSON.stringify(favoritos)); } catch (e) {}
}

/* ============================================================
   10. REFERENCIAS AL HTML (el DOM)
   ============================================================ */
const grid = document.getElementById("grid");
const tabs = document.getElementById("tabs");
const searchInput = document.getElementById("searchInput");
const favsCount = document.getElementById("favsCount");
const sectionTitle = document.getElementById("sectionTitle");

/* ============================================================
   11. FUNCIONES
   ============================================================ */

// Devuelve solo los lugares que pasan el filtro de categoría y de búsqueda
function filtrarLugares() {
  const q = textoBusqueda.trim().toLowerCase();
  return lugares.filter(function (lugar) {
    const coincideCategoria = categoriaActiva === "Todos" || lugar.categoria === categoriaActiva;
    const coincideTexto = lugar.nombre.toLowerCase().includes(q) || lugar.region.toLowerCase().includes(q);
    return coincideCategoria && coincideTexto;
  });
}

// Dibuja las pestañas a partir de las categorías de los datos
function renderTabs() {
  const categorias = ["Todos", ...new Set(lugares.map(function (l) { return l.categoria; }))];
  tabs.innerHTML = categorias.map(function (cat) {
    const activa = cat === categoriaActiva ? "active" : "";
    return '<button class="tab ' + activa + '" data-cat="' + cat + '">' + cat + "</button>";
  }).join("");
}

// Dibuja las tarjetas
function renderLugares() {
  const resultado = filtrarLugares();

  sectionTitle.textContent = categoriaActiva === "Todos" ? "Todos los lugares" : categoriaActiva;

  if (resultado.length === 0) {
    grid.innerHTML = '<p class="empty">No encontramos lugares con esa búsqueda. Prueba con otra palabra.</p>';
    return;
  }

  grid.innerHTML = resultado.map(function (lugar) {
    const esFavorito = favoritos.includes(lugar.id);
    return `
      <article class="card">
        <div class="card-image" style="background:${lugar.color}">
          ${lugar.emoji}
          ${lugar.destacado ? '<span class="badge">Favorito de viajeros</span>' : ""}
          <button class="heart ${esFavorito ? "active" : ""}" data-id="${lugar.id}"
                  aria-label="${esFavorito ? "Quitar de favoritos" : "Guardar en favoritos"}"
                  aria-pressed="${esFavorito}">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 21s-7.5-4.6-9.6-9.2C.8 8.2 3 4.5 6.6 4.5c2 0 3.6 1 5.4 3 1.8-2 3.4-3 5.4-3 3.6 0 5.8 3.7 4.2 7.3C19.5 16.4 12 21 12 21z"/>
            </svg>
          </button>
        </div>
        <div class="card-title">${lugar.nombre}</div>
        <div class="card-meta">${lugar.region} · ${lugar.categoria}</div>
        <div><span class="card-rating">★ ${lugar.rating}</span></div>
      </article>`;
  }).join("");
}

function renderFavsCount() {
  favsCount.textContent = favoritos.length === 0
    ? "Sin favoritos aún"
    : favoritos.length + (favoritos.length === 1 ? " favorito" : " favoritos");
}

/* ============================================================
   12. EVENTOS: lo que pasa cuando la persona hace algo
   ============================================================ */

// Escribir en el buscador
searchInput.addEventListener("input", function () {
  textoBusqueda = searchInput.value;
  renderLugares();
});

// Clic en una pestaña (delegación de eventos: un solo listener para todas)
tabs.addEventListener("click", function (e) {
  const boton = e.target.closest(".tab");
  if (!boton) return;
  categoriaActiva = boton.dataset.cat;
  renderTabs();
  renderLugares();
});

// Clic en un corazón
grid.addEventListener("click", function (e) {
  const boton = e.target.closest(".heart");
  if (!boton) return;
  const id = Number(boton.dataset.id);

  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(function (f) { return f !== id; });  // quitar
  } else {
    favoritos.push(id);                                               // agregar
  }
  guardarFavoritos();
  renderLugares();
  renderFavsCount();
});

/* ============================================================
   13. INICIO: dibujar todo al cargar la página
   ============================================================ */
renderTabs();
renderLugares();
renderFavsCount();
