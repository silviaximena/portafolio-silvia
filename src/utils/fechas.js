// fechas.js
// Convierte una fecha guardada como "2026-10-06" en un texto legible:
// "6 de octubre de 2026".

const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

export function formatearFecha(fechaISO) {
  // Separamos año, mes y día a mano. Así evitamos que la zona horaria
  // del navegador cambie el día (un error común con new Date()).
  const [anio, mes, dia] = fechaISO.split('-').map(Number);

  // Si el formato no es válido, devolvemos el texto tal cual
  if (!anio || !mes || !dia || mes < 1 || mes > 12) {
    return fechaISO;
  }

  return `${dia} de ${MESES[mes - 1]} de ${anio}`;
}