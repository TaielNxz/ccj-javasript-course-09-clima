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

    // Consultar a la API
    consultarAPI(ciudad, pais);
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

function consultarAPI( ciudad, pais ) {

    const appId = '1c5854ce16ee6a2e2a27006f01b95743';
    const url   = `https://api.openweathermap.org/data/2.5/weather?q=${ ciudad },${ pais }&appid=${ appId }`;

    fetch(url)
        .then( respuesta => respuesta.json() )
        .then( datos => {
            // Limpiar el HTML previo
            limpiarHTML(); 

            if( datos.cod === "404") {
                mostrarError('Ciudad no encontrada');
                return;
            };

            // Imprime la respuesta en el HTML
            mostrarClima(datos);
        });
};


function mostrarClima( datos ) {
    const { name, main: { temp, temp_max, temp_min } } = datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    // Parrafo con Nombre de la Ciudad
    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${ name }`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    // Parrafo con Temperatura Actual
    const actual = document.createElement('p');
    actual.innerHTML = `${ centigrados } &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    // Parrafo con Temperatura Maxima
    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${ max } &#8451;`;
    tempMaxima.classList.add('text-xl');

    // Parrafo con Temperatura Minima
    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${ min } &#8451;`;
    tempMinima.classList.add('text-xl');

    // Crear div para los parrafos
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');

    // Agregamos los parrafos
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    // Imprimir el div
    resultado.appendChild(resultadoDiv);
};

// Pasar los numeros a Centigrados
const kelvinACentigrados = grados => parseInt( grados - 273.15 );

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    };
};