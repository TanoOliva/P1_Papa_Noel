
document.getElementById("btn-register").addEventListener("click", function() {
    document.getElementById("popup-registro").style.display = "flex";
});

document.getElementById("btn-login").addEventListener("click", function() {
    document.getElementById("popup-login").style.display = "flex";
});

document.getElementById("cancelar-registro").addEventListener("click", function() {
    const confirmarCancelar = confirm("¿Estás seguro de que deseas cancelar el registro? Se perderán los datos ingresados.");
    if (confirmarCancelar) {
        document.getElementById("popup-registro").style.display = "none";
    }
});

document.getElementById("cancelar-login").addEventListener("click", function() {
    const confirmarCancelar = confirm("¿Estás seguro de que deseas cancelar el inicio de sesión?");
    if (confirmarCancelar) {
        document.getElementById("popup-login").style.display = "none";
    }
});

document.getElementById("limpiar-registro").addEventListener("click", function() {
    const confirmarLimpiar = confirm("¿Estás seguro de que deseas limpiar todos los campos?");
    if (confirmarLimpiar) {
        document.getElementById("form-registro").reset();
    }
});

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

    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || {};
    if (usuariosRegistrados[username]) {
        alert("Este nombre de usuario ya está registrado.");
        return;
    }

    const nuevoUsuario = {
        username: username,
        password: password,
        email: email,
        ciudad: ciudad,
        pais: pais,
        cartas: []
    };

    usuariosRegistrados[username] = nuevoUsuario;
    localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

    alert("Registro completado correctamente");
    document.getElementById("popup-registro").style.display = "none";
});

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

    localStorage.setItem('usuarioActual', username);

    alert("Inicio de sesión exitoso");

    document.querySelector(".botones-menu").style.display = "none";
    document.getElementById("perfil-menu").style.display = "block";
    document.getElementById("popup-login").style.display = "none";
});


document.getElementById("perfil-icono").addEventListener("click", function() {
    const perfilOpciones = document.getElementById("perfil-opciones");
    if (perfilOpciones.style.display === "none") {
        perfilOpciones.style.display = "block";
    } else {
        perfilOpciones.style.display = "none";
    }
});

document.getElementById("cerrar-sesion").addEventListener("click", function() {
    localStorage.removeItem("username"); 
    localStorage.removeItem("password");
    
    document.getElementById("perfil-menu").style.display = "none";
    document.querySelector(".botones-menu").style.display = "flex";

    alert("Has cerrado sesión correctamente.");
});
