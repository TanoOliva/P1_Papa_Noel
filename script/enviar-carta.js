// Validar el envío de la carta
document.getElementById("form-enviar-carta").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const usuarioActual = localStorage.getItem("usuarioActual");

    // Verificar si hay un usuario con sesión iniciada
    if (!usuarioActual) {
        alert("Debes iniciar sesión para enviar una carta.");
        return;
    }

    // Obtener los datos de los usuarios registrados
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || {};
    const usuario = usuariosRegistrados[usuarioActual];

    // Validar que el usuario existe
    if (!usuario) {
        alert("Usuario no encontrado. Por favor, regístrate o inicia sesión.");
        return;
    }

    // Obtener el correo del formulario de la carta
    const correoFormulario = document.getElementById("correo-carta").value;

    // Validar si el correo coincide con el del usuario
    if (usuario.email !== correoFormulario) {
        alert("El correo ingresado no coincide con el correo de tu cuenta.");
        return;
    }

    // Si todo está bien, obtener los datos de la carta del formulario
    const carta = {
        nombre: document.getElementById("nombre-carta").value,
        edad: document.getElementById("edad-carta").value,
        ciudad: document.getElementById("ciudad-carta").value,
        pais: document.getElementById("pais-carta").value,
        mensaje: document.getElementById("mensaje-carta").value,
        cartaFoto: document.getElementById("cartaFoto").value

    };

    // Asegurarse de que el usuario tiene un array de cartas
    if (!usuario.cartas) {
        usuario.cartas = [];
    }

    // Agregar la carta al array de cartas del usuario
    usuario.cartas.push(carta);

    // Guardar los cambios en localStorage
    usuariosRegistrados[usuarioActual] = usuario;
    localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));

    // Mostrar un mensaje de éxito
    alert("Tu carta ha sido enviada con éxito.");

    // Limpiar el formulario después de enviar
    document.getElementById("form-enviar-carta").reset();
});
