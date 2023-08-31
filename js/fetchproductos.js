/*Por medio de fetch y promesas creo la estructura para cada uno
de los productos que se mostraran en la pagina Productos, con sus respectivas
caracteristicas
Además, usando asincronismos, hago que hasta que no esten comletamente cargados
los productos, no me los muestre*/

async function fetchProductos() {
    return fetch('../json/productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching products data');
            }
            return response.json();
        })
        .catch(error => {
            console.error(error);
        });
}

