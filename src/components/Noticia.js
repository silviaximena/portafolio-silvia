// Noticia.js
// Muestra UNA noticia: título, fecha y contenido.
// Si el contenido es largo, se recorta y aparece un botón "Leer más".
import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { formatearFecha } from '../utils/fechas';

// Cantidad de letras que se muestran antes de recortar
export const LIMITE_CARACTERES = 110;

function Noticia({ titulo, fecha, contenido }) {
  // STATE: indica si la noticia está expandida o recortada
  const [expandida, setExpandida] = useState(false);

  const esLarga = contenido.length > LIMITE_CARACTERES;

  // Si es larga y no está expandida, mostramos solo el comienzo
  const textoVisible =
    esLarga && !expandida ? `${contenido.slice(0, LIMITE_CARACTERES).trim()}...` : contenido;

  return (
    <Card as="article" className="noticia mb-3 shadow-sm">
      <Card.Body>
        <Card.Title as="h4">{titulo}</Card.Title>

        {/* <time> es la etiqueta semántica para fechas */}
        <time dateTime={fecha} className="noticia-fecha">
          {formatearFecha(fecha)}
        </time>

        <Card.Text className="mt-2">{textoVisible}</Card.Text>

        {/* Renderizado condicional: el botón solo aparece si el texto es largo */}
        {esLarga && (
          <Button
            variant="link"
            className="p-0 noticia-boton"
            aria-expanded={expandida}
            onClick={() => setExpandida(!expandida)}
          >
            {expandida ? 'Leer menos' : 'Leer más'}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Noticia;