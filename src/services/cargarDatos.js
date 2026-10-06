// cargarDatos.js
// Función reutilizable para leer cualquier archivo JSON de la carpeta public/.
// La usan Proyectos y Noticias. Como está separada, en las pruebas
// se puede reemplazar por un "mock" sin tocar los componentes.

export async function cargarJSON(ruta) {
  // PUBLIC_URL permite que funcione igual en localhost y en GitHub Pages
  const base = process.env.PUBLIC_URL || '';
  const respuesta = await fetch(`${base}/${ruta}`);

  // Si el archivo no existe o falla, avisamos con un error claro
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar ${ruta}`);
  }

  return respuesta.json();
}