// simularFetch.js
// MOCK de fetch: reemplaza la llamada real por una respuesta falsa.
// Así las pruebas no dependen de que exista el archivo JSON ni de la red.
//
// spyOn es una función de Jasmine que "espía" una función real (window.fetch)
// y la reemplaza mientras dura la prueba. Al terminar, Jasmine la restaura sola.
export function simularFetch(datos, ok = true) {
  return spyOn(window, 'fetch').and.returnValue(
    Promise.resolve({
      ok, // true = la carga funcionó; false = simula un error
      json: () => Promise.resolve(datos),
    })
  );
}
