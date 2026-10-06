// Introduccion.js
// Sección de presentación: foto, nombre, título y biografía.
// Recibe todos sus datos por props, así se puede reutilizar con otra persona.
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

// Imagen de respaldo por si la foto no carga
const fotoRespaldo = 'https://placehold.co/300x300/111111/f2c14e?text=S';

function Introduccion({ nombre, titulo, biografia, foto, github }) {
  return (
    <section id="introduccion" className="introduccion">
      <Container>
        {/* Grid de Bootstrap: en celular foto arriba y texto abajo (xs=12);
            desde tablet, foto a la izquierda (md=4) y texto a la derecha (md=8) */}
        <Row className="align-items-center g-4">
          <Col xs={12} md={4} className="text-center">
            <Image
              src={foto}
              alt={`Foto de ${nombre}`}
              roundedCircle
              className="foto-perfil"
              onError={(e) => {
                e.target.onerror = null; // evita un ciclo si el respaldo también falla
                e.target.src = fotoRespaldo;
              }}
            />
          </Col>

          <Col xs={12} md={8} className="text-center text-md-start">
            <h1>Hola, soy {nombre}</h1>
            <p className="subtitulo">{titulo}</p>
            <p>{biografia}</p>

            <Button href={github} target="_blank" rel="noopener noreferrer" className="btn-dorado">
              Ver mi GitHub
            </Button>
            <Button href="#proyectos" variant="outline-light" className="ms-2">
              Ver proyectos
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Introduccion;
