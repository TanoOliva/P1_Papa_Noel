
document.querySelector("#perfil-menu a[href='#mi-perfil']").addEventListener("click", function() {

    const username = localStorage.getItem("username");
    const mail = localStorage.getItem("mail");
    const ciudad = localStorage.getItem("ciudad");
    const pais = localStorage.getItem("pais");

    document.getElementById("perfil-username").value = username || '';
    document.getElementById("perfil-mail").value = mail || '';
    document.getElementById("perfil-ciudad").value = ciudad || '';
    document.getElementById("perfil-pais").value = pais || '';

    document.getElementById("popup-perfil").style.display = "flex";
});

document.getElementById("form-perfil").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("perfil-username").value;
    const mail = document.getElementById("perfil-mail").value;
    const ciudad = document.getElementById("perfil-ciudad").value;
    const pais = document.getElementById("perfil-pais").value;

    localStorage.setItem("username", username);
    localStorage.setItem("mail", mail);
    localStorage.setItem("ciudad", ciudad);
    localStorage.setItem("pais", pais);

    document.getElementById("popup-perfil").style.display = "none";

    alert("Los datos han sido actualizados correctamente.");
});

document.getElementById("cancelar-perfil").addEventListener("click", function() {

    document.getElementById("popup-perfil").style.display = "none";
});

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
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("mail", mail);
        localStorage.setItem("ciudad", ciudad);
        localStorage.setItem("pais", pais);

        alert("Registro completado correctamente");
        document.getElementById("popup-registro").style.display = "none";
    }
});

document.querySelector("#perfil-menu a[href='#mis-cartas']").addEventListener("click", function() {
    mostrarCartas();
});


function mostrarCartas() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    
    const usuarioActual = localStorage.getItem("usuarioActual");

    if (!usuarioActual || !usuarios[usuarioActual]) {
        console.error("No se encontró el usuario actual o no hay datos de usuario.");
        return;
    }

    const usuario = usuarios[usuarioActual];
    const cartas = usuario.cartas || [];
    const cartasContainer = document.getElementById("cartas-container");
    cartasContainer.innerHTML = '';

    if (cartas.length === 0) {
        cartasContainer.innerHTML = "<p>No has enviado ninguna carta.</p>";
    } else {

        cartas.forEach((carta, index) => {
            const cartaDiv = document.createElement("div");
            cartaDiv.classList.add("carta");
            cartaDiv.setAttribute("draggable", "true"); 

            const fotoHTML = carta.cartaFoto ? `<img src="${carta.cartaFoto}" alt="Carta de ${carta.nombre}" class="carta-foto">` : '';

            cartaDiv.innerHTML = `
                <div class="perfil-descripcion">
                    <strong>De: ${carta.nombre}, ${carta.edad} años - ${carta.ciudad} - ${carta.pais}</strong>
                </div>
                <div class="contenido-carta">
                    <p>${carta.mensaje}</p>
                    ${fotoHTML}
                    <button class="borrar-carta" data-index="${index}">Borrar</button>
                </div>
            `;

            cartaDiv.querySelector(".borrar-carta").addEventListener("click", function() {
                const confirmDelete = confirm("¿Estás seguro de que quieres borrar esta carta?");
                if (confirmDelete) {
                    borrarCarta(index, usuarioActual);
                }
            });

            cartasContainer.appendChild(cartaDiv);

            cartaDiv.addEventListener('dragstart', handleDragStart, false);
            cartaDiv.addEventListener('dragover', handleDragOver, false);
            cartaDiv.addEventListener('drop', handleDrop, false);
        });
    }

    document.getElementById("popup-cartas").style.display = "flex";
}

function borrarCarta(index, usuarioActual) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    
    if (usuarios[usuarioActual] && usuarios[usuarioActual].cartas) {
        usuarios[usuarioActual].cartas.splice(index, 1); 
        localStorage.setItem("usuarios", JSON.stringify(usuarios)); 
        mostrarCartas(); 
    }
}

document.getElementById("cerrar-cartas").addEventListener("click", function() {
    document.getElementById("popup-cartas").style.display = "none";
});


let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation(); 
    }
    if (draggedElement !== this) {
        draggedElement.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');

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