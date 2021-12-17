/* =========================================
                Variables
========================================= */
const container  = document.querySelector(".container");
const resultado  = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");


/* =========================================
              EventListeners
========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Validar el formulario
    formulario.addEventListener('submit', buscarClima);
});


/* =========================================
                Funciones
========================================= */
function buscarClima(e) {
    // Evitar que se recargue la pagina
    e.preventDefault();

    // Seleccionar los campos
    const ciudad = document.querySelector("#ciudad").value;
    const pais = document.querySelector("#pais").value;
    
    // si ambos campos estan vacios
    if( ciudad === '' || pais === '' ) {
        // mostrar mensaje de error
        mostrarError('Ambos campos son obligatorios');
        return;
    };
};

function mostrarError( mensaje ) {
    const alerta = document.querySelector(".bg-red-100");

    if(!alerta) {
        // Crear una alerta
        const alerta = document.createElement('div');

        // Agregar estilos
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        // Construir el HTML
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${ mensaje }<span>
        `;

        // Añadir el HTML
        container.appendChild(alerta);

        // Se elimine la alerta despues de 5 segundos
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    };
};
