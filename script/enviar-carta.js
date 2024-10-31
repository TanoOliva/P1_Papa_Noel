
document.getElementById("form-enviar-carta").addEventListener("submit", function(event) {
    event.preventDefault();

    const usuarioActual = localStorage.getItem("usuarioActual");

    if (!usuarioActual) {
        alert("Debes iniciar sesión para enviar una carta.");
        return;
    }

    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || {};
    const usuario = usuariosRegistrados[usuarioActual];

    if (!usuario) {
        alert("Usuario no encontrado. Por favor, regístrate o inicia sesión.");
        return;
    }

    const correoFormulario = document.getElementById("correo-carta").value;

    if (usuario.email !== correoFormulario) {
        alert("El correo ingresado no coincide con el correo de tu cuenta.");
        return;
    }

    const carta = {
        nombre: document.getElementById("nombre-carta").value,
        edad: document.getElementById("edad-carta").value,
        ciudad: document.getElementById("ciudad-carta").value,
        pais: document.getElementById("pais-carta").value,
        mensaje: document.getElementById("mensaje-carta").value,
        cartaFoto: document.getElementById("cartaFoto").value

    };

    if (!usuario.cartas) {
        usuario.cartas = [];
    }

    usuario.cartas.push(carta);

    usuariosRegistrados[usuarioActual] = usuario;
    localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));

    alert("Tu carta ha sido enviada con éxito.");

    document.getElementById("form-enviar-carta").reset();
});
