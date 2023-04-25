const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventsListeners();
function cargarEventsListeners() {
    // Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);
}

// Funciones
function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerInfoCurso(cursoSeleccionado);
    }
}

// Leer la informacion del producto.
function leerInfoCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

     // Agregar elementos seleccionados al carrito

    articulosCarrito = [...articulosCarrito, infoCurso];
    console.log(articulosCarrito);

    mostrarProductos();
}

// Mostrar los productos en el carrito

function mostrarProductos() {
    // Eliminar duplicados
    eliminarDuplicados();


    // Recorrer carrito y generar el html
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = 
        `
            <td>
                ${curso.titulo}
            </td>
        `;

        //Agregar el curso en el tbody 

        contenedorCarrito.appendChild(row);
    })
}


function eliminarDuplicados() {

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}