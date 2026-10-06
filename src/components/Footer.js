// Footer.js
// Pie de página con el nombre, el año actual y el link a GitHub.
import { Container } from 'react-bootstrap';

function Footer({ nombre, github }) {
  // El año se calcula solo; así no hay que cambiarlo cada año
  const anio = new Date().getFullYear();

  return (
    <footer className="pie-pagina">
      <Container className="text-center">
        <p className="mb-1">
          © {anio} {nombre} · Portafolio desarrollado con React y Bootstrap
        </p>
        <a href={github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </Container>
    </footer>
  );
}

export default Footer;