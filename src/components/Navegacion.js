// Navegacion.js
// Barra de navegación de Bootstrap. En celular se convierte en el botón ☰.
// Es reutilizable: recibe el nombre y la lista de secciones por props.
import { Navbar, Nav, Container } from 'react-bootstrap';

function Navegacion({ nombre, secciones }) {
  return (
    <Navbar expand="lg" variant="dark" sticky="top" className="navegacion">
      <Container>
        <Navbar.Brand href="#introduccion">{nombre}</Navbar.Brand>

        {/* Botón ☰ que aparece en pantallas pequeñas */}
        <Navbar.Toggle aria-controls="menu-principal" aria-label="Abrir menú de navegación" />

        <Navbar.Collapse id="menu-principal">
          {/* ms-auto empuja los links hacia la derecha */}
          <Nav className="ms-auto">
            {secciones.map((seccion) => (
              <Nav.Link key={seccion.id} href={`#${seccion.id}`}>
                {seccion.titulo}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegacion;