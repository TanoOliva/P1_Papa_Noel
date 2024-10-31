
const contenedorJuego = document.getElementById("contenedor-juego");
let score = 0;
let tiempoRestante = 90;
let intervalo;

const adivinanzas = [
    { pregunta: "Una vieja con un diente que llama a toda la gente.", respuesta: "la campana" },
    { pregunta: "Con la nieve se hace y el sol lo deshace", respuesta: "Muñeco de nieve" },
    { pregunta: "Al compás de las campanadas de medianoche, comemos una tras otra hasta llegar a doce. ¿Que es?", respuesta: "la uva" }
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
    contenedorJuego.innerHTML = ""; 

    let intentosRestantes = 3;
    let adivinanzaActual = adivinanzas[Math.floor(Math.random() * adivinanzas.length)];

    const adivinanzaElement = document.createElement("p");
    adivinanzaElement.textContent = adivinanzaActual.pregunta;
    contenedorJuego.appendChild(adivinanzaElement);

    const inputRespuesta = document.createElement("input");
    inputRespuesta.type = "text";
    inputRespuesta.placeholder = "Escribe tu respuesta aquí";
    contenedorJuego.appendChild(inputRespuesta);

    const botonEnviar = document.createElement("button");
    botonEnviar.textContent = "Enviar Respuesta";
    contenedorJuego.appendChild(botonEnviar);

    const intentosElement = document.createElement("p");
    intentosElement.textContent = `Intentos restantes: ${intentosRestantes}`;
    contenedorJuego.appendChild(intentosElement);

    const resultadoElement = document.createElement("p");
    contenedorJuego.appendChild(resultadoElement);

    botonEnviar.addEventListener("click", () => {
        const respuestaUsuario = inputRespuesta.value.trim().toLowerCase();
        if (respuestaUsuario === adivinanzaActual.respuesta) {
            resultadoElement.textContent = "¡Correcto! Has adivinado la respuesta.";
            inputRespuesta.disabled = true; 
        } else {
            intentosRestantes--;
            if (intentosRestantes > 0) {
                resultadoElement.textContent = "Incorrecto, intenta de nuevo.";
                intentosElement.textContent = `Intentos restantes: ${intentosRestantes}`;
            } else {
                resultadoElement.textContent = `¡Has perdido! La respuesta era: ${adivinanzaActual.respuesta}`;
                inputRespuesta.disabled = true; 
            }
        }
        inputRespuesta.value = ""; 
    });

    document.getElementById("juegoAdivinanza").style.display = "block";
}