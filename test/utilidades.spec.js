// utilidades.spec.js
// Pruebas de las funciones de apoyo. No son componentes, son lógica pura:
// reciben un dato y devuelven un resultado.
import { formatearFecha } from '../src/utils/fechas';
import { validarContacto } from '../src/utils/validaciones';

// describe agrupa las pruebas de una misma función
describe('formatearFecha', () => {
  // it describe UN caso que debe cumplirse
it('convierte una fecha ISO en texto legible en español', () => {
    // expect compara el resultado real con el esperado
    expect(formatearFecha('2026-10-06')).toBe('6 de octubre de 2026');
});

it('devuelve el texto original si la fecha no es válida', () => {
    expect(formatearFecha('fecha-mala')).toBe('fecha-mala');
});
});

describe('validarContacto', () => {
it('no devuelve errores cuando todos los datos son correctos', () => {
    const errores = validarContacto({
    nombre: 'Silvia',
    correo: 'silvia@duoc.cl',
    mensaje: 'Hola, me gustó tu portafolio',
    });
    // Un objeto sin llaves significa "sin errores"
    expect(Object.keys(errores).length).toBe(0);
});

it('marca los tres campos cuando el formulario está vacío', () => {
    const errores = validarContacto({ nombre: '', correo: '', mensaje: '' });
    expect(errores.nombre).toBeDefined();
    expect(errores.correo).toBeDefined();
    expect(errores.mensaje).toBeDefined();
});

it('rechaza un correo sin dominio', () => {
    const errores = validarContacto({
    nombre: 'Silvia',
    correo: 'silvia@',
    mensaje: 'Mensaje de prueba',
    });
    expect(errores.correo).toContain('correo válido');
    // El nombre está bien, así que no debe tener error
    expect(errores.nombre).toBeUndefined();
});
});