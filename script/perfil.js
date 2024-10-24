// Mostrar pop-up del perfil con los datos del usuario
document.querySelector("#perfil-menu a[href='#mi-perfil']").addEventListener("click", function() {
    // Recuperar los datos almacenados del usuario
    const username = localStorage.getItem("username");
    const mail = localStorage.getItem("mail");
    const ciudad = localStorage.getItem("ciudad");
    const pais = localStorage.getItem("pais");
    
    // Llenar los campos del formulario con los datos actuales
    document.getElementById("perfil-username").value = username || '';
    document.getElementById("perfil-mail").value = mail || '';
    document.getElementById("perfil-ciudad").value = ciudad || '';
    document.getElementById("perfil-pais").value = pais || '';

    // Mostrar el pop-up
    document.getElementById("popup-perfil").style.display = "flex";
});

// Guardar los cambios en el perfil
document.getElementById("form-perfil").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener los datos actualizados del formulario
    const username = document.getElementById("perfil-username").value;
    const mail = document.getElementById("perfil-mail").value;
    const ciudad = document.getElementById("perfil-ciudad").value;
    const pais = document.getElementById("perfil-pais").value;

    // Guardar los datos actualizados en localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("mail", mail);
    localStorage.setItem("ciudad", ciudad);
    localStorage.setItem("pais", pais);

    // Ocultar el pop-up
    document.getElementById("popup-perfil").style.display = "none";

    alert("Los datos han sido actualizados correctamente.");
});

// Cancelar edición de perfil
document.getElementById("cancelar-perfil").addEventListener("click", function() {
    // Cerrar el pop-up sin guardar cambios
    document.getElementById("popup-perfil").style.display = "none";
});

// Guardar los datos adicionales durante el registro
document.getElementById("form-registro").addEventListener("submit", function(event) {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const mail = document.getElementById("mail").value;
    const ciudad = document.getElementById("ciudad").value;
    const pais = document.getElementById("pais").value;

    if (password !== document.getElementById("password2").value) {
        alert("Las contraseñas no coinciden");
        event.preventDefault();
    } else {
        // Guardar los datos en localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("mail", mail);
        localStorage.setItem("ciudad", ciudad);
        localStorage.setItem("pais", pais);

        alert("Registro completado correctamente");
        document.getElementById("popup-registro").style.display = "none";
    }
});



// Mostrar pop-up de cartas
document.getElementById("perfil-opciones").addEventListener("click", function(event) {
    if (event.target.id === "mis-cartas") {
        mostrarCartas();
    }
});

// Función para mostrar las cartas
function mostrarCartas() {
    const cartas = JSON.parse(localStorage.getItem("cartas")) || [];
    const cartasContainer = document.getElementById("cartas-container");
    cartasContainer.innerHTML = '';

    if (cartas.length === 0) {
        cartasContainer.innerHTML = "<p>No has enviado ninguna carta.</p>";
    } else {
        cartas.forEach((carta, index) => {
            const cartaDiv = document.createElement("div");
            cartaDiv.classList.add("carta");
            cartaDiv.setAttribute("draggable", "true"); // Habilitar el drag and drop

            cartaDiv.innerHTML = `
                <div class="perfil-descripcion">
                    <strong>De: ${carta.nombre}, ${carta.edad} años - ${carta.ciudad} - ${carta.pais}</strong>
                </div>
                <div class="contenido-carta">
                    <p>${carta.mensaje}</p>
                    <button class="borrar-carta" data-index="${index}">Borrar</button>
                </div>
            `;

            // Añadir evento para borrar la carta
            cartaDiv.querySelector(".borrar-carta").addEventListener("click", function() {
                const confirmDelete = confirm("¿Estás seguro de que quieres borrar esta carta?");
                if (confirmDelete) {
                    borrarCarta(index);
                }
            });

            cartasContainer.appendChild(cartaDiv);

            // Eventos drag and drop
            cartaDiv.addEventListener('dragstart', handleDragStart, false);
            cartaDiv.addEventListener('dragover', handleDragOver, false);
            cartaDiv.addEventListener('drop', handleDrop, false);
        });
    }

    document.getElementById("popup-cartas").style.display = "flex";
}

// Cerrar pop-up de cartas
document.getElementById("cerrar-cartas").addEventListener("click", function() {
    document.getElementById("popup-cartas").style.display = "none";
});

// Función para borrar una carta
function borrarCarta(index) {
    let cartas = JSON.parse(localStorage.getItem("cartas")) || [];
    cartas.splice(index, 1);
    localStorage.setItem("cartas", JSON.stringify(cartas));
    mostrarCartas();
}

// Funciones Drag and Drop
let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necesario para permitir drop
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation(); // Para evitar que se propague el evento
    }
    if (draggedElement !== this) {
        draggedElement.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');

        // Actualizar las cartas en el localStorage después de rearrastrar
        const cartasContainer = document.getElementById("cartas-container");
        const cartasNuevas = [];
        cartasContainer.querySelectorAll('.carta').forEach((cartaDiv) => {
            const nombre = cartaDiv.querySelector('.perfil-descripcion strong').innerText.split('De: ')[1].split(',')[0];
            const mensaje = cartaDiv.querySelector('.contenido-carta p').innerText;
            cartasNuevas.push({ nombre, mensaje });
        });
        localStorage.setItem("cartas", JSON.stringify(cartasNuevas));
    }
    return false;
}
