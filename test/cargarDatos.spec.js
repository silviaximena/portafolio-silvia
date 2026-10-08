// cargarDatos.spec.js
// Pruebas del servicio que lee archivos JSON, usando un MOCK de fetch.
import { cargarJSON } from '../src/services/cargarDatos';
import { simularFetch } from './ayudantes/simularFetch';

describe('cargarJSON', () => {
  it('pide el archivo correcto y devuelve sus datos', async () => {
    // Preparamos el mock: fetch responderá esta lista falsa
    const fetchFalso = simularFetch([{ id: 1, titulo: 'Proyecto de prueba' }]);

    const datos = await cargarJSON('data/proyectos.json');

    // Verificamos que se pidió la ruta correcta...
    expect(fetchFalso).toHaveBeenCalledWith('/data/proyectos.json');
    // ...y que se devolvieron los datos del mock
    expect(datos.length).toBe(1);
    expect(datos[0].titulo).toBe('Proyecto de prueba');
  });

  it('lanza un error si el archivo no se puede cargar', async () => {
    simularFetch(null, false); // respuesta con ok = false

    // expectAsync sirve para comprobar funciones asíncronas (que usan await)
    await expectAsync(cargarJSON('data/no-existe.json')).toBeRejectedWithError(
      'No se pudo cargar data/no-existe.json'
    );
  });
});
