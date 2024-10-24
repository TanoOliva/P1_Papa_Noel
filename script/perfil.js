// Abrir el pop-up para editar perfil
document.getElementById("mi-perfil").addEventListener("click", function() {
    const usuarioActual = localStorage.getItem("usuarioActual");
    if (usuarioActual) return;

    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || {};
    const usuario = usuariosRegistrados[usuarioActual];

    document.getElementById("perfil-username").value = usuario.username;
    document.getElementById("perfil-mail").value = usuario.email;
    document.getElementById("perfil-ciudad").value = usuario.ciudad;
    document.getElementById("perfil-pais").value = usuario.pais;

    document.getElementById("popup-perfil").style.display = "block";
});

// Guardar cambios en el perfil
document.getElementById("form-perfil").addEventListener("submit", function(event) {
    event.preventDefault();

    const usuarioActual = localStorage.getItem("usuarioActual");
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || {};

    const usuario = usuariosRegistrados[usuarioActual];
    usuario.username = document.getElementById("perfil-username").value;
    usuario.email = document.getElementById("perfil-mail").value;
    usuario.ciudad = document.getElementById("perfil-ciudad").value;
    usuario.pais = document.getElementById("perfil-pais").value;

    usuariosRegistrados[usuarioActual] = usuario;
    localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

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



