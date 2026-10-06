// validaciones.js
// Revisa los datos del formulario de contacto.
// Devuelve un objeto con los errores encontrados; si está vacío, todo está bien.

// Patrón simple de correo: algo@algo.algo
const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarContacto({ nombre, correo, mensaje }) {
  const errores = {};

  if (nombre.trim().length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 letras.';
  }

  if (!PATRON_CORREO.test(correo.trim())) {
    errores.correo = 'Ingresa un correo válido, por ejemplo nombre@duoc.cl.';
  }

  if (mensaje.trim().length < 10) {
    errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
  }

  return errores;
}