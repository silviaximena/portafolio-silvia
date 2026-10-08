# Plan de pruebas unitarias – Portafolio personal

**Asignatura:** DSY1104 – Desarrollo Fullstack II
**Evaluación:** Formativa N° 2 – Portafolio personal y pruebas unitarias
**Estudiante:** Silvia
**Repositorio:** https://github.com/silviaximena/portafolio-silvia

---

## 1. Objetivo

Comprobar que los componentes del portafolio funcionan como se espera: que se dibujan correctamente con los datos que reciben, que responden a las acciones del usuario (clics y escritura), que cambian su estado de forma correcta y que manejan los errores al cargar datos desde los archivos JSON.

## 2. Alcance

Se prueban todos los componentes de la carpeta `src/components`, el servicio que lee los archivos JSON y las funciones de apoyo:

| Tipo | Archivos |
|---|---|
| Componentes | `Navegacion`, `Introduccion`, `TarjetaProyecto`, `Proyectos`, `Noticia`, `SeccionNoticias`, `Noticias`, `Contacto`, `Footer`, `App` |
| Servicio | `services/cargarDatos.js` |
| Funciones de apoyo | `utils/fechas.js`, `utils/validaciones.js` |

Queda fuera del alcance `src/index.js`, porque solo monta la aplicación en la página y no tiene lógica propia.

## 3. Herramientas y entorno

| Herramienta | Uso |
|---|---|
| **Jasmine** | Escribir las pruebas con `describe`, `it` y `expect`, y crear mocks con `spyOn` |
| **Karma** | Ejecutar las pruebas en un navegador real (Chrome Headless) |
| **karma-webpack + Babel** | Traducir el código JSX de React para que el navegador lo entienda |
| **React Testing Library** | Dibujar los componentes, buscar elementos en pantalla y simular eventos |
| **karma-coverage (Istanbul)** | Generar el informe de cobertura de código |

La configuración está en `karma.conf.js` y las pruebas en la carpeta `test/`.

## 4. Cómo ejecutar las pruebas

```
npm install
npm run test:karma
```

Al terminar, la terminal muestra el total de pruebas aprobadas y una tabla de cobertura. El informe visual queda en `coverage/html/index.html`.

## 5. Estrategia

- **Renderizado:** se verifica que cada componente muestre en pantalla los datos que recibe por props.
- **Renderizado condicional:** se verifica que ciertos elementos aparezcan solo cuando corresponde (spinner de carga, mensajes de error, botón "Leer más", aviso de lista vacía).
- **Estado y eventos:** se simulan clics y escritura con `fireEvent` y se comprueba que la pantalla cambie según el nuevo estado.
- **Mocks:** los componentes que leen archivos JSON usan `fetch`. En las pruebas, `fetch` se reemplaza con `spyOn(window, 'fetch')` por una respuesta falsa (archivo `test/ayudantes/simularFetch.js`). Así se pueden probar tanto la carga correcta como el error, sin depender del servidor ni de los archivos reales.
- **Accesibilidad:** se comprueba que las imágenes tengan texto alternativo y que los botones informen su estado (`aria-pressed`, `aria-expanded`).

## 6. Casos de prueba

### 6.1 Funciones de apoyo (`test/utilidades.spec.js`)

| ID | Función | Caso de prueba | Resultado esperado | Resultado |
|---|---|---|---|---|
| PU-01 | `formatearFecha` | Recibe la fecha `2026-10-06` | Devuelve `6 de octubre de 2026` | ✅ Aprobada |
| PU-02 | `formatearFecha` | Recibe un texto que no es fecha | Devuelve el mismo texto sin cambios | ✅ Aprobada |
| PU-03 | `validarContacto` | Todos los datos son correctos | No devuelve errores | ✅ Aprobada |
| PU-04 | `validarContacto` | Todos los campos vacíos | Devuelve error en nombre, correo y mensaje | ✅ Aprobada |
| PU-05 | `validarContacto` | Correo sin dominio (`silvia@`) | Devuelve error solo en el correo | ✅ Aprobada |

### 6.2 Servicio de datos con mock (`test/cargarDatos.spec.js`)

| ID | Función | Caso de prueba | Resultado esperado | Resultado |
|---|---|---|---|---|
| PU-06 | `cargarJSON` | El mock de `fetch` responde correctamente | Pide la ruta `/data/proyectos.json` y devuelve los datos | ✅ Aprobada |
| PU-07 | `cargarJSON` | El mock de `fetch` responde con error | Lanza el error `No se pudo cargar...` | ✅ Aprobada |

### 6.3 Componentes de presentación

| ID | Componente | Caso de prueba | Tipo | Resultado esperado | Resultado |
|---|---|---|---|---|---|
| PU-08 | `Navegacion` | Recibe el nombre por props | Renderizado / props | Muestra "Silvia" en la barra | ✅ Aprobada |
| PU-09 | `Navegacion` | Recibe 3 secciones | Renderizado / props | Crea 3 enlaces y cada uno apunta a su `#id` | ✅ Aprobada |
| PU-10 | `Introduccion` | Recibe nombre, título, biografía, foto y GitHub | Renderizado / accesibilidad | Muestra todos los datos, la foto tiene `alt` y el botón apunta a GitHub | ✅ Aprobada |
| PU-11 | `TarjetaProyecto` | Recibe título y descripción | Renderizado / props | Muestra ambos textos | ✅ Aprobada |
| PU-12 | `TarjetaProyecto` | Recibe 2 tecnologías | Renderizado / props | Crea 2 etiquetas | ✅ Aprobada |
| PU-13 | `TarjetaProyecto` | Recibe un enlace | Props / DOM | El botón apunta al repositorio y abre en otra pestaña | ✅ Aprobada |
| PU-14 | `TarjetaProyecto` | Se dibuja la imagen | Accesibilidad | La imagen tiene texto alternativo | ✅ Aprobada |
| PU-15 | `Footer` | Recibe nombre y GitHub | Renderizado | Muestra el año actual y el enlace a GitHub | ✅ Aprobada |

### 6.4 Componentes con estado, eventos y mocks

| ID | Componente | Caso de prueba | Tipo | Resultado esperado | Resultado |
|---|---|---|---|---|---|
| PU-16 | `Proyectos` | Se abre mientras el JSON todavía no llega | Renderizado condicional / mock | Muestra "Cargando proyectos..." | ✅ Aprobada |
| PU-17 | `Proyectos` | El mock devuelve 2 proyectos | Mock / estado | Muestra una tarjeta por proyecto y desaparece el indicador de carga | ✅ Aprobada |
| PU-18 | `Proyectos` | Clic en el filtro "HTML5" | Evento / estado | Solo queda el proyecto de HTML5 y el botón queda marcado (`aria-pressed`) | ✅ Aprobada |
| PU-19 | `Proyectos` | El mock responde con error | Renderizado condicional / mock | Muestra el mensaje de error | ✅ Aprobada |
| PU-20 | `Noticia` | Recibe título y fecha | Renderizado | Muestra el título y la fecha en formato legible | ✅ Aprobada |
| PU-21 | `Noticia` | Recibe un texto corto | Renderizado condicional | No aparece el botón "Leer más" | ✅ Aprobada |
| PU-22 | `Noticia` | Recibe un texto largo y se hace clic en "Leer más" | Evento / estado | El texto se muestra completo y el botón cambia a "Leer menos" | ✅ Aprobada |
| PU-23 | `SeccionNoticias` | Recibe 2 noticias | Renderizado / props | Dibuja 2 artículos | ✅ Aprobada |
| PU-24 | `SeccionNoticias` | Recibe una lista vacía | Renderizado condicional | Muestra "No hay noticias por ahora." | ✅ Aprobada |
| PU-25 | `Noticias` | El mock devuelve 2 secciones | Mock / estado | Muestra ambas secciones con sus noticias | ✅ Aprobada |
| PU-26 | `Noticias` | El mock responde con error | Renderizado condicional / mock | Muestra el mensaje de error | ✅ Aprobada |
| PU-27 | `Contacto` | Se escribe en el campo Nombre | Evento / estado | El campo guarda el texto escrito | ✅ Aprobada |
| PU-28 | `Contacto` | Se envía el formulario vacío | Evento / DOM | Aparecen los 3 mensajes de error y los campos se marcan en rojo | ✅ Aprobada |
| PU-29 | `Contacto` | Se envían datos válidos | Evento / estado | Aparece el mensaje de éxito y el formulario se limpia | ✅ Aprobada |

### 6.5 Prueba de integración

| ID | Componente | Caso de prueba | Tipo | Resultado esperado | Resultado |
|---|---|---|---|---|---|
| PU-30 | `App` | Se dibuja la página completa con mocks para proyectos y noticias | Integración / mock | Aparecen la introducción, la sección de contacto y el filtro de proyectos | ✅ Aprobada |

## 7. Criterios de aceptación

- Todas las pruebas deben terminar con estado **SUCCESS** en Karma.
- La cobertura de código debe ser igual o mayor a **80%** en sentencias, ramas, funciones y líneas.
- Cada componente de `src/components` debe tener al menos una prueba.

## 8. Resumen de resultados

| Total de pruebas | Aprobadas | Fallidas |
|---|---|---|
| 30 | 30 | 0 |

El detalle de la cobertura alcanzada está en el documento [INFORME_COBERTURA.md](INFORME_COBERTURA.md).
