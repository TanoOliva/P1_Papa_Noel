
const contenedorJuego = document.getElementById("contenedor-juego");
let score = 0;
let tiempoRestante = 90;
let intervalo;

const adivinanzas = [
    { pregunta: "¿Qué es blanco por fuera, amarillo por dentro?", respuesta: "plátano" },
    { pregunta: "¿Qué viene una vez en un minuto, dos veces en un momento, pero nunca en mil años?", respuesta: "la letra m" },
    { pregunta: "¿Qué tiene patas y no camina?", respuesta: "la mesa" }
];

document.getElementById("juegoClick").addEventListener("click", iniciarJuegoClickTheCircle);
document.getElementById("juegoAdivina").addEventListener("click", iniciarJuegoAdivina);

function iniciarJuegoClickTheCircle() {
    
    contenedorJuego.innerHTML = "";
    score = 0;
    tiempoRestante = 90;

    const puntaje = document.createElement("p");
    puntaje.textContent = "Puntaje: 0";
    contenedorJuego.appendChild(puntaje);

    const imagen = document.createElement("img");
    imagen.src = "/images/bola.webp"; 
    imagen.alt = "Imagen de juego";
    imagen.style.width = "50px";
    imagen.style.position = "absolute";
    imagen.style.cursor = "pointer";
    contenedorJuego.appendChild(imagen);

    function moverImagen() {
        const maxX = contenedorJuego.clientWidth - 50;
        const maxY = contenedorJuego.clientHeight - 50;
        const x = Math.floor(Math.random() * maxX);
        const y = Math.floor(Math.random() * maxY);
        imagen.style.left = `${x}px`;
        imagen.style.top = `${y}px`;
    }

    moverImagen();
    imagen.addEventListener("click", () => {
        score++;
        puntaje.textContent = "Puntaje: " + score;
        moverImagen(); 
    });

    intervalo = setInterval(() => {
        tiempoRestante--;
        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            contenedorJuego.innerHTML = `<p>¡Tiempo terminado! Puntaje final: ${score}</p>`;
        }
    }, 1000);
}


function iniciarJuegoAdivina() {
    contenedorJuego.innerHTML = ""; // Limpiar el contenedor del juego

    // Inicializar variables
    let intentosRestantes = 3;
    let adivinanzaActual = adivinanzas[Math.floor(Math.random() * adivinanzas.length)];

    // Mostrar la adivinanza en el HTML
    const adivinanzaElement = document.createElement("p");
    adivinanzaElement.textContent = adivinanzaActual.pregunta;
    contenedorJuego.appendChild(adivinanzaElement);

    // Crear un campo de texto para ingresar la respuesta
    const inputRespuesta = document.createElement("input");
    inputRespuesta.type = "text";
    inputRespuesta.placeholder = "Escribe tu respuesta aquí";
    contenedorJuego.appendChild(inputRespuesta);

    // Crear botón para enviar respuesta
    const botonEnviar = document.createElement("button");
    botonEnviar.textContent = "Enviar Respuesta";
    contenedorJuego.appendChild(botonEnviar);

    // Elemento para mostrar intentos restantes
    const intentosElement = document.createElement("p");
    intentosElement.textContent = `Intentos restantes: ${intentosRestantes}`;
    contenedorJuego.appendChild(intentosElement);

    // Elemento para mostrar el resultado
    const resultadoElement = document.createElement("p");
    contenedorJuego.appendChild(resultadoElement);

    // Manejar el envío de la respuesta
    botonEnviar.addEventListener("click", () => {
        const respuestaUsuario = inputRespuesta.value.trim().toLowerCase();
        if (respuestaUsuario === adivinanzaActual.respuesta) {
            resultadoElement.textContent = "¡Correcto! Has adivinado la respuesta.";
            inputRespuesta.disabled = true; // Deshabilitar el input si es correcto
        } else {
            intentosRestantes--;
            if (intentosRestantes > 0) {
                resultadoElement.textContent = "Incorrecto, intenta de nuevo.";
                intentosElement.textContent = `Intentos restantes: ${intentosRestantes}`;
            } else {
                resultadoElement.textContent = `¡Has perdido! La respuesta era: ${adivinanzaActual.respuesta}`;
                inputRespuesta.disabled = true; // Deshabilitar el input si se acabaron los intentos
            }
        }
        inputRespuesta.value = ""; // Limpiar el campo de entrada
    });

    // Mostrar el contenedor del juego de adivinanza
    document.getElementById("juegoAdivinanza").style.display = "block";
}