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
    alert("Perfil actualizado correctamente.");
});
