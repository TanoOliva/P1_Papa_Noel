// Mostrar pop-up de registro
document.getElementById("btn-register").addEventListener("click", function() {
    document.getElementById("popup-registro").style.display = "flex";
});

// Mostrar pop-up de inicio de sesión
document.getElementById("btn-login").addEventListener("click", function() {
    document.getElementById("popup-login").style.display = "flex";
});

// Cancelar registro
document.getElementById("cancelar-registro").addEventListener("click", function() {
    const confirmarCancelar = confirm("¿Estás seguro de que deseas cancelar el registro? Se perderán los datos ingresados.");
    if (confirmarCancelar) {
        document.getElementById("popup-registro").style.display = "none";
    }
});

// Cancelar inicio de sesión
document.getElementById("cancelar-login").addEventListener("click", function() {
    const confirmarCancelar = confirm("¿Estás seguro de que deseas cancelar el inicio de sesión?");
    if (confirmarCancelar) {
        document.getElementById("popup-login").style.display = "none";
    }
});

// Limpiar todos los campos del formulario de registro
document.getElementById("limpiar-registro").addEventListener("click", function() {
    const confirmarLimpiar = confirm("¿Estás seguro de que deseas limpiar todos los campos?");
    if (confirmarLimpiar) {
        document.getElementById("form-registro").reset();
    }
});

// Validar contraseñas y guardar datos en localStorage durante el registro
document.getElementById("form-registro").addEventListener("submit", function(event) {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    if (password !== password2) {
        alert("Las contraseñas no coinciden");
        event.preventDefault();
    } else {
        // Guardar el nombre de usuario y la contraseña en localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        alert("Registro completado correctamente");
        document.getElementById("popup-registro").style.display = "none";
    }
});

// Iniciar sesión verificando datos almacenados en localStorage
document.getElementById("form-login").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    // Recuperar los datos del usuario almacenados en localStorage
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    // Verificar si el usuario y la contraseña coinciden
    if (username === storedUsername && password === storedPassword) {
        alert("Inicio de sesión exitoso");

        // Ocultar los botones de inicio de sesión y registro
        document.querySelector(".botones-menu").style.display = "none";

        // Mostrar el icono de perfil
        document.getElementById("perfil-menu").style.display = "block";

        // Cerrar el pop-up de inicio de sesión
        document.getElementById("popup-login").style.display = "none";

    } else {
        alert("Nombre de usuario o contraseña incorrectos");
    }
});

// Mostrar/ocultar menú de perfil al hacer clic en el icono
document.getElementById("perfil-icono").addEventListener("click", function() {
    const perfilOpciones = document.getElementById("perfil-opciones");
    if (perfilOpciones.style.display === "none") {
        perfilOpciones.style.display = "block";
    } else {
        perfilOpciones.style.display = "none";
    }
});


// Cerrar sesión
document.getElementById("cerrar-sesion").addEventListener("click", function() {
    localStorage.removeItem("username");  // O puedes manejarlo como prefieras
    localStorage.removeItem("password");
    
    // Ocultar el perfil y mostrar de nuevo los botones de inicio y registro
    document.getElementById("perfil-menu").style.display = "none";
    document.querySelector(".botones-menu").style.display = "flex";

    alert("Has cerrado sesión correctamente.");
});











// Lógica para manejar número de hijos en el registro
document.getElementById("hijos").addEventListener("input", function() {
    const hijosContainer = document.getElementById("hijos-info");
    hijosContainer.innerHTML = "";
    const numeroHijos = parseInt(this.value, 10);

    if (numeroHijos > 0) {
        for (let i = 1; i <= numeroHijos; i++) {
            const hijoDiv = document.createElement("div");
            hijoDiv.classList.add("hijo");

            const labelNombre = document.createElement("label");
            labelNombre.textContent = `Nombre del hij@ (${i}):`;
            hijoDiv.appendChild(labelNombre);

            const inputNombre = document.createElement("input");
            inputNombre.type = "text";
            inputNombre.name = `hijo-nombre-${i}`;
            inputNombre.required = true;
            inputNombre.minLength = 3;
            hijoDiv.appendChild(inputNombre);

            const labelEdad = document.createElement("label");
            labelEdad.textContent = `Edad del hijo@ (${i}):`;
            hijoDiv.appendChild(labelEdad);

            const inputEdad = document.createElement("input");
            inputEdad.type = "number";
            inputEdad.name = `hijo-edad-${i}`;
            inputEdad.required = true;
            hijoDiv.appendChild(inputEdad);

            const labelJuguete = document.createElement("label");
            labelJuguete.textContent = `Juguete favorito de su hij@ (${i}):`;
            hijoDiv.appendChild(labelJuguete);

            const inputJuguete = document.createElement("input");
            inputJuguete.type = "text";
            inputJuguete.name = `hijo-juguete-${i}`;
            inputJuguete.required = true;
            hijoDiv.appendChild(inputJuguete);

            hijosContainer.appendChild(hijoDiv);
        }
    }
});


