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

// Guardar usuario durante el registro
document.getElementById("form-registro").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;
    const email = document.getElementById("mail").value;
    const ciudad = document.getElementById("ciudad").value;
    const pais = document.getElementById("pais").value;

    if (password !== password2) {
        alert("Las contraseñas no coinciden");
        return;
    }

    // Verificar si el nombre de usuario ya está registrado
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || {};
    if (usuariosRegistrados[username]) {
        alert("Este nombre de usuario ya está registrado.");
        return;
    }

    // Crear un nuevo usuario
    const nuevoUsuario = {
        username: username,
        password: password,
        email: email,
        ciudad: ciudad,
        pais: pais,
        cartas: []
    };

    // Guardar el nuevo usuario
    usuariosRegistrados[username] = nuevoUsuario;
    localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

    alert("Registro completado correctamente");
    document.getElementById("popup-registro").style.display = "none";
});

// Iniciar sesión verificando datos almacenados
document.getElementById("form-login").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || {};
    const usuario = usuariosRegistrados[username];

    if (!usuario || usuario.password !== password) {
        alert("Nombre de usuario o contraseña incorrectos.");
        return;
    }

    // Guardar el nombre de usuario del usuario actual en localStorage
    localStorage.setItem('usuarioActual', username);

    alert("Inicio de sesión exitoso");

    // Ocultar los botones de inicio de sesión y registro
    document.querySelector(".botones-menu").style.display = "none";
    document.getElementById("perfil-menu").style.display = "block";
    document.getElementById("popup-login").style.display = "none";
});

// Cerrar sesión
document.getElementById("cerrar-sesion").addEventListener("click", function() {
    localStorage.removeItem('usuarioActual');
    document.getElementById("perfil-menu").style.display = "none";
    document.querySelector(".botones-menu").style.display = "flex";
    alert("Has cerrado sesión correctamente.");
});
