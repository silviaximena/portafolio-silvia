# Informe de cobertura de código – Portafolio personal

**Asignatura:** DSY1104 – Desarrollo Fullstack II
**Evaluación:** Formativa N° 2 – Portafolio personal y pruebas unitarias
**Estudiante:** Silvia
**Repositorio:** https://github.com/silviaximena/portafolio-silvia

---

## 1. ¿Qué es la cobertura de código?

La cobertura indica qué parte del código se ejecutó durante las pruebas. Si una línea nunca se ejecutó, ninguna prueba está revisando si funciona bien. Se mide con cuatro indicadores:

| Indicador | Qué mide |
|---|---|
| **Statements** (sentencias) | Instrucciones que se ejecutaron al menos una vez |
| **Branches** (ramas) | Caminos de las decisiones (`if`, `? :`, `&&`) que se recorrieron, tanto el verdadero como el falso |
| **Functions** (funciones) | Funciones que fueron llamadas al menos una vez |
| **Lines** (líneas) | Líneas de código que se ejecutaron |

## 2. Herramienta utilizada

La cobertura se generó con **karma-coverage**, que usa **Istanbul** por dentro. Al ejecutar las pruebas, el plugin `babel-plugin-istanbul` marca cada línea del código de `src/` y registra cuáles se usaron. La configuración está en `karma.conf.js`, en la sección `coverageReporter`, y genera:

- Una tabla en la terminal.
- Un informe visual en `coverage/html/index.html`, donde se puede abrir cada archivo y ver en rojo las líneas no cubiertas.

Comando para generarlo:

```
npm run test:karma
```

## 3. Resultados

**Resultado de la ejecución:** 30 pruebas ejecutadas, 30 aprobadas, 0 fallidas (`TOTAL: 30 SUCCESS`), en Chrome Headless sobre Windows 10.

### 3.1 Resumen general

| Indicador | Cubierto | Total | Porcentaje |
|---|---|---|---|
| Statements | 96 | 98 | **97,95%** |
| Branches | 57 | 61 | **93,44%** |
| Functions | 37 | 38 | **97,36%** |
| Lines | 87 | 89 | **97,75%** |

![Informe de cobertura en el navegador](cobertura.png)

### 3.2 Detalle por archivo

| Archivo | Statements | Branches | Functions | Lines | Líneas sin cubrir |
|---|---|---|---|---|---|
| `App.js` | 100% | 100% | 100% | 100% | – |
| `components/Contacto.js` | 100% | 100% | 100% | 100% | – |
| `components/Footer.js` | 100% | 100% | 100% | 100% | – |
| `components/Introduccion.js` | 100% | 100% | 100% | 100% | – |
| `components/Navegacion.js` | 100% | 100% | 100% | 100% | – |
| `components/Noticia.js` | 100% | 100% | 100% | 100% | – |
| `components/Noticias.js` | 100% | 76,92% | 100% | 100% | 21-27 |
| `components/Proyectos.js` | 100% | 94,11% | 100% | 100% | 26 |
| `components/SeccionNoticias.js` | 100% | 100% | 100% | 100% | – |
| `components/TarjetaProyecto.js` | 60% | 100% | 66,66% | 60% | 19-20 |
| `services/cargarDatos.js` | 100% | 100% | 100% | 100% | – |
| `utils/fechas.js` | 100% | 100% | 100% | 100% | – |
| `utils/validaciones.js` | 100% | 100% | 100% | 100% | – |

![Tabla de cobertura en la terminal](cobertura-terminal.png)

## 4. Análisis de resultados

### 4.1 Cumplimiento del criterio de aceptación

En el plan de pruebas se definió como meta una cobertura **igual o mayor a 80%** en los cuatro indicadores. La meta se cumple con holgura: el indicador más bajo es Branches, con 93,44%.

De los 13 archivos medidos, **10 tienen 100%** en todos los indicadores. Esto incluye las partes más importantes del portafolio:

- **`Contacto.js`**: se probaron los tres caminos del formulario (escribir, enviar vacío y enviar datos válidos).
- **`Noticia.js`**: se probaron el texto corto, el texto largo y el botón "Leer más / Leer menos".
- **`cargarDatos.js`**: gracias al mock de `fetch`, se probaron tanto la carga correcta como el error.
- **`validaciones.js` y `fechas.js`**: se probaron datos válidos e inválidos.

### 4.2 Partes no cubiertas y por qué

**`TarjetaProyecto.js` (líneas 19-20):** corresponden a la función `onError` de la imagen, que cambia la captura por una imagen de respaldo cuando el archivo no carga. Las pruebas comprueban que la imagen se dibuje con su texto alternativo, pero no simulan que la imagen falle, por eso esa función nunca se ejecutó.

**`Noticias.js` (líneas 21-27) y `Proyectos.js` (línea 26):** son ramas de la condición `if (activo)` dentro de `useEffect`. Esa condición protege al componente para que no intente actualizar su estado si el usuario se va de la página antes de que terminen de cargar los datos. Las pruebas cubren el caso normal (el componente sigue abierto cuando llegan los datos), pero no el caso en que el componente se cierra antes.

En los dos casos se trata de **código de protección** para situaciones poco frecuentes, no de la funcionalidad principal. Todo lo que el usuario ve y usa normalmente quedó cubierto.

### 4.3 Uso de mocks

Los componentes `Proyectos` y `Noticias` leen archivos JSON con `fetch`. En las pruebas, `fetch` se reemplazó por un **mock** con `spyOn(window, 'fetch')` de Jasmine (archivo `test/ayudantes/simularFetch.js`). Gracias a eso:

- Las pruebas no dependen de la red ni de que existan los archivos JSON reales.
- Se pudo probar el **caso de error** (archivo que no carga), que sería difícil de provocar con datos reales.
- Las pruebas son rápidas y siempre dan el mismo resultado.

## 5. Oportunidades de mejora

1. **Simular una imagen que no carga** en la prueba de `TarjetaProyecto`, usando `fireEvent.error(imagen)`, para comprobar que aparece la imagen de respaldo. Con esto `TarjetaProyecto.js` llegaría a 100%.
2. **Probar el cierre del componente antes de que termine la carga** en `Proyectos` y `Noticias`, usando la función `unmount()` de React Testing Library, para cubrir las ramas de `if (activo)`.
3. **Ejecutar las pruebas en más navegadores** (por ejemplo, Microsoft Edge) agregando su lanzador en `karma.conf.js`.

## 6. Conclusión

El portafolio cuenta con 30 pruebas unitarias que pasan sin errores y una cobertura de **97,95% de sentencias**, superando la meta de 80%. Las pruebas verifican el renderizado, las props, el estado, los eventos del usuario y la manipulación del DOM, y usan mocks para simular la carga de datos. Las pocas líneas sin cubrir corresponden a casos de protección poco frecuentes, y quedaron identificadas como mejoras para una siguiente versión.
