// TarjetaProyecto.js
// Muestra UN proyecto dentro de una Card de Bootstrap.
// Es reutilizable: todo lo que muestra llega por props.
import { Card, Badge, Button } from 'react-bootstrap';

function TarjetaProyecto({ titulo, descripcion, imagen, tecnologias, enlace }) {
  // Imagen de respaldo con el nombre del proyecto, por si la captura no carga
  const imagenRespaldo = `https://placehold.co/600x340/111111/f2c14e?text=${encodeURIComponent(titulo)}`;

  return (
    // h-100 hace que todas las tarjetas de una fila tengan la misma altura
    <Card className="tarjeta-proyecto h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={imagen}
        alt={`Captura del proyecto ${titulo}`}
        loading="lazy" // la imagen se carga solo cuando se acerca a la pantalla
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = imagenRespaldo;
        }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title as="h3">{titulo}</Card.Title>
        <Card.Text>{descripcion}</Card.Text>

        {/* Una etiqueta por cada tecnología del arreglo */}
        <div className="mb-3">
          {tecnologias.map((tec) => (
            <Badge key={tec} className="etiqueta-tecnologia me-1 mb-1">
              {tec}
            </Badge>
          ))}
        </div>

        {/* mt-auto empuja el botón al fondo de la tarjeta */}
        <Button
          href={enlace}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-dorado mt-auto"
        >
          Ver repositorio
        </Button>
      </Card.Body>
    </Card>
  );
}

export default TarjetaProyecto;