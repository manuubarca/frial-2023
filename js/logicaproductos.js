const productosPorPagina = 20;

// Declarar una variable global para almacenar los productos
let productosGlobal = [];

let paginaActual = 1; // Agregar esta línea para definir la página inicial

function mostrarProductos(data) {
    const divProductos = document.getElementById("divProductos");
    const startIndex = (paginaActual - 1) * productosPorPagina;
    const endIndex = startIndex + productosPorPagina;

    divProductos.innerHTML = "";

    // Mostrar productos de la página actual
    const productosMostrados = data.slice(startIndex, endIndex);

    productosMostrados.forEach((producto) => {
        divProductos.innerHTML += `
            <div class="col-6 col-md-4 col-lg-3">
                <div class="card h-100 border-0 shadow-sm">
                    <img src="../assets/img/productos/${producto.img}" class="card-img-top img-fluid" alt="...">
                    <div class="card-body">
                        <h2 class="fs-6 d-flex justify-content-between">${producto.nombre}</h2>
                        <p class="card-text text-muted">${producto.codigo} / ${producto.marca}</p>
                        <a href="../pages/productos/${producto.url}" class="btn gradiente-naranja-a border-0 text-white rounded-pill">
                            Ver producto
                        </a>
                    </div>
                </div>
            </div>`;
    });

    // Actualizar el mensaje de resultados
    const resultadoProductos = document.getElementById("resultadoProductos");
    resultadoProductos.textContent = `Mostrando ${startIndex + 1}-${Math.min(endIndex, data.length)} de ${data.length} productos`;
}

function aplicarFiltros(productos, categoria) {
    if (categoria === "todos") {
        return productos;
    } else {
        return productos.filter((producto) => producto.categoria === categoria);
    }
}

function cargarFiltrados(productos) {
    const botonesCategorias = document.querySelectorAll(".datos");
    botonesCategorias.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            e.preventDefault();
            const categoria = e.target.id;

            const productosFiltrados = aplicarFiltros(productosGlobal, categoria);

            // Actualizar la paginación con la cantidad de productos filtrados
            generarBotonesPaginacion(productosFiltrados.length);

            // Reiniciar la página a la primera al cambiar la categoría
            paginaActual = 1;

            // Mostrar los productos filtrados en la página 1
            mostrarProductos(productosFiltrados);
        });
    });
}

// Llamada al cargar la página
cargarProductos();

function scrollToTop() {
    window.scrollTo(0, 0);
}

function generarBotonesPaginacion(totalProductos) {
    const divPaginacion = document.getElementById("paginacionContainer");
    const totalPaginas = Math.ceil(totalProductos / productosPorPagina);

    divPaginacion.innerHTML = "";

    // Agregar botón para ir a la página anterior
    const botonAnterior = document.createElement("button");
    botonAnterior.textContent = "<";
    botonAnterior.classList.add("btn","rounded-0","border-0", "blue"); // Agregar clases aquí
    botonAnterior.addEventListener("click", () => {
        if (paginaActual > 1) {
            paginaActual--;
            mostrarProductos(productosGlobal);
        }
    });

    divPaginacion.appendChild(botonAnterior);

    // Agregar botones de página numerados
    for (let i = 1; i <= totalPaginas; i++) {
        const botonPagina = document.createElement("button");

        botonPagina.textContent = i; // Asignar el número de página al contenido del botón

        botonPagina.classList.add("btn", "rounded-0","border-0", "border-white", "blue"); // Agregar clases aquí

        // Agregar evento click para cambiar de página
        botonPagina.addEventListener("click", () => {
            paginaActual = i;
            mostrarProductos(productosGlobal);
            scrollToTop(); // Agrega esta línea para desplazarte hacia arriba
        });
        divPaginacion.appendChild(botonPagina);
    }

    // Agregar botón para ir a la página siguiente
    const botonSiguiente = document.createElement("button");
    botonSiguiente.textContent = ">";
    botonSiguiente.classList.add("btn", "rounded-0","border-0", "blue"); // Agregar clases aquí
    botonSiguiente.addEventListener("click", () => {
        if (paginaActual < totalPaginas) {
            paginaActual++;
            mostrarProductos(productosGlobal);
        }
    });
    divPaginacion.appendChild(botonSiguiente);

    // Actualizar el mensaje de resultados
    const resultadoProductos = document.getElementById("resultadoProductos");
    const startIndex = (paginaActual - 1) * productosPorPagina;
    resultadoProductos.textContent = `Mostrando ${startIndex + 1}-${Math.min(startIndex + productosPorPagina, totalProductos)} de ${totalProductos} productos`;
}

async function cargarProductos() {
    try {
        productosGlobal = await fetchProductos(); // Obtener todos los productos
        mostrarProductos(productosGlobal); // Mostrar todos los productos
        generarBotonesPaginacion(productosGlobal.length); // Generar botones de paginación
        cargarFiltrados(productosGlobal); // Cargar filtros
        cargarFiltradosDeNavbar(productosGlobal); // Cargar filtros de la barra de navegación
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}
