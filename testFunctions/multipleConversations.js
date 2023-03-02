var conversaciones = {};

function agregarMensaje(numeroTelefono, mensaje) {
    if (conversaciones[numeroTelefono]) {
      conversaciones[numeroTelefono].push(mensaje);
    } else {
      conversaciones[numeroTelefono] = [mensaje];
    }
  }

  agregarMensaje("55801894", "Hola buenos dias");
  agregarMensaje("44558822", "Hola buenos dias");
  agregarMensaje("55801894", "como estamos");
  
  console.log(conversaciones);