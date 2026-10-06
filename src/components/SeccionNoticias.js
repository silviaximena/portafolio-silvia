// SeccionNoticias.js
// Agrupa una lista de noticias bajo un título.
// Se reutiliza para cada sección del archivo noticias.json.
import Noticia from './Noticia';

function SeccionNoticias({ titulo, noticias }) {
  return (
    <div className="seccion-noticias">
      <h3 className="subtitulo-noticias">{titulo}</h3>

      {/* Renderizado condicional: si la lista viene vacía, mostramos un aviso */}
      {noticias.length === 0 ? (
        <p className="text-muted">No hay noticias por ahora.</p>
      ) : (
        noticias.map((noticia) => (
          <Noticia
            key={noticia.id}
            titulo={noticia.titulo}
            fecha={noticia.fecha}
            contenido={noticia.contenido}
          />
        ))
      )}
    </div>
  );
}

export default SeccionNoticias;