// Proyectos.js
// Lee los proyectos desde public/data/proyectos.json, los guarda en el state
// y muestra una TarjetaProyecto por cada uno. Incluye un filtro por tecnología.
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import TarjetaProyecto from './TarjetaProyecto';
import { cargarJSON } from '../services/cargarDatos';

function Proyectos() {
  // ===== STATE =====
  const [proyectos, setProyectos] = useState([]);   // lista que viene del JSON
  const [cargando, setCargando] = useState(true);   // mientras se lee el archivo
  const [error, setError] = useState('');           // mensaje si algo falla
  const [filtro, setFiltro] = useState('Todas');    // tecnología seleccionada

  // ===== CARGAR DATOS AL INICIAR =====
  // useEffect con [] se ejecuta una sola vez, cuando el componente aparece
  useEffect(() => {
    let activo = true; // evita actualizar el state si el componente ya se cerró

    cargarJSON('data/proyectos.json')
      .then((datos) => {
        if (activo) setProyectos(datos);
      })
      .catch(() => {
        if (activo) setError('No se pudieron cargar los proyectos. Intenta recargar la página.');
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  // ===== DATOS CALCULADOS =====
  // Lista de tecnologías sin repetir, para crear los botones del filtro
  const tecnologias = ['Todas', ...new Set(proyectos.flatMap((p) => p.tecnologias))];

  // Proyectos que se muestran según el filtro elegido
  const proyectosFiltrados =
    filtro === 'Todas' ? proyectos : proyectos.filter((p) => p.tecnologias.includes(filtro));

  return (
    <section id="proyectos" className="seccion">
      <Container>
        <h2 className="titulo-seccion">Proyectos</h2>

        {/* Renderizado condicional: spinner mientras carga */}
        {cargando && (
          <div className="text-center my-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando proyectos...</span>
            </Spinner>
          </div>
        )}

        {/* Renderizado condicional: mensaje solo si hubo error */}
        {error && <Alert variant="danger">{error}</Alert>}

        {!cargando && !error && (
          <>
            {/* ===== FILTRO (evento onClick que cambia el state) ===== */}
            <div className="filtro-tecnologias mb-4" role="group" aria-label="Filtrar proyectos por tecnología">
              {tecnologias.map((tec) => (
                <Button
                  key={tec}
                  size="sm"
                  variant={filtro === tec ? 'dark' : 'outline-dark'}
                  className="me-2 mb-2"
                  aria-pressed={filtro === tec}
                  onClick={() => setFiltro(tec)}
                >
                  {tec}
                </Button>
              ))}
            </div>

            {/* ===== GRID: 1 columna en celular, 2 en tablet, 3 en escritorio ===== */}
            <Row className="g-4">
              {proyectosFiltrados.map((proyecto) => (
                <Col key={proyecto.id} xs={12} md={6} lg={4}>
                  <TarjetaProyecto
                    titulo={proyecto.titulo}
                    descripcion={proyecto.descripcion}
                    imagen={`${process.env.PUBLIC_URL}/${proyecto.imagen}`}
                    tecnologias={proyecto.tecnologias}
                    enlace={proyecto.enlace}
                  />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </section>
  );
}

export default Proyectos;