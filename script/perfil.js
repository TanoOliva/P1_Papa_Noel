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



