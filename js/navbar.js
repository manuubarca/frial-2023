function filtradoNavbar(data){
    
    data.forEach((productosEnArray, indice) => {

        if(divListaProductos != null ){

            divListaProductos.innerHTML += `

            <div id="producto${indice}" class="product border-bottom">
                <div class=" bg-white">
                    <a href="../pages/productos/${productosEnArray.url}" id="botonVerProducto${indice}" class="d-flex align-items-center text-decoration-none text-black">
                        
                        <div class="p-2">
                            <img src="../assets/img/productos/${productosEnArray.img}" class="" style="width: 120px; height: 140px;" alt="...">
                        </div>
                        
                        <div class="p-2">
                            <h2 class="fs-6">
                                ${productosEnArray.nombre}
                            </h2>
                            <p class=" text-muted">
                                ${productosEnArray.codigo}        
                            </p>
                        </div>

                    </a> 
                </div>
            </div>

            `
        }

        
    })
}

const inputNavbar = document.getElementById("searchItemNavBar")
inputNavbar.addEventListener("keyup",(e) => {
    const searchBoxNavBar = document.getElementById("searchItemNavBar").value.toLowerCase();
    const storeItemsNavBar = document.getElementById("divListaProductos")
    const productNavBar = document.querySelectorAll(".product")
    const nombreProducto = storeItemsNavBar.getElementsByTagName("h2")
    const hacerVisibleNavBar = document.getElementById("divListaProductos")

    for(var i = 0; i < nombreProducto.length; i++) {
        let match = productNavBar[i].getElementsByTagName('h2')[0];
        if(match){
            let textvalue = match.textContent || match.innerHTML
            if(searchBoxNavBar !== "" && textvalue.toLowerCase().indexOf(searchBoxNavBar) > -1) {
                productNavBar[i].style.display = "";
                hacerVisibleNavBar.classList.remove('overflow-hidden');
                hacerVisibleNavBar.classList.add('overflow-visible');
            }else{
                productNavBar[i].style.display = "none";
            }
        }
    }
})

function cargarFiltradosDeNavbar(productos) {
	const botonesCategoriasNavbar = document.querySelectorAll(".dropdown-item")

	botonesCategoriasNavbar.forEach(boton => {
		boton.addEventListener("click", (e) => {
			e.preventDefault()

			const categoria = e.target.id;

			if (categoria == "todos") {
				window.location.href("./pages/productos.html");
				mostrarProductos(productos);
			} else {
				const filtrado = productos.filter(producto => producto.categoria == categoria);

				window.location.href("./pages/productos.html");

				mostrarProductos(filtrado)
			}
		})
	})
}

async function cargarNavbar() {
const productos = await fetchProductos()
filtradoNavbar(productos)
}

cargarNavbar()