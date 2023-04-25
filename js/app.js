const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventsListeners();
function cargarEventsListeners() {
    // Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar carrito
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];

        eliminarDuplicados();
    })
}

function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        mostrarProductos();
    }
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

    //Revisa si un curso ya existe en el carrito

    const cursoExistente = articulosCarrito.some( curso => curso.id === infoCurso.id );
    
    if(cursoExistente >= 1) {
        const cursos = articulosCarrito.map( curso => {
            if(curso => curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });

        articulosCarrito = [...cursos];

    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

     // Agregar elementos seleccionados al carrito

    
    console.log(articulosCarrito);

    mostrarProductos();
}

// Mostrar los productos en el carrito

function mostrarProductos() {
    // Eliminar duplicados
    eliminarDuplicados();


    // Recorrer carrito y generar el html
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso
        const row = document.createElement('tr');
        row.innerHTML = 
        `
            <td>
                <img src ='${imagen}' width='100'>
                
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href='#' class='borrar-curso' data-id='${id}'>X</a>
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