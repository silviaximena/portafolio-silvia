// Noticias.js
// Lee public/data/noticias.json, guarda las secciones en el state
// y muestra un componente SeccionNoticias por cada una.
import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import SeccionNoticias from './SeccionNoticias';
import { cargarJSON } from '../services/cargarDatos';

function Noticias() {
  // ===== STATE =====
  const [secciones, setSecciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // ===== CARGAR DATOS AL INICIAR =====
  useEffect(() => {
    let activo = true;

    cargarJSON('data/noticias.json')
      .then((datos) => {
        if (activo) setSecciones(datos.secciones);
      })
      .catch(() => {
        if (activo) setError('No se pudieron cargar las noticias. Intenta recargar la página.');
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  return (
    <section id="noticias" className="seccion seccion-gris">
      <Container>
        <h2 className="titulo-seccion">Noticias</h2>

        {cargando && (
          <div className="text-center my-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando noticias...</span>
            </Spinner>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {/* GRID: una columna en celular, dos en escritorio (lg) */}
        {!cargando && !error && (
          <Row className="g-4">
            {secciones.map((seccion) => (
              <Col key={seccion.id} xs={12} lg={6}>
                <SeccionNoticias titulo={seccion.titulo} noticias={seccion.noticias} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
}

export default Noticias;