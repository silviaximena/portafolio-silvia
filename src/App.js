import './App.css';
import Navegacion from './components/Navegacion';
import Introduccion from './components/Introduccion';
import Proyectos from './components/Proyectos';
import Noticias from './components/Noticias';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
// Los datos personales se leen desde un archivo JSON
import perfil from './data/perfil.json';

// Secciones del menú de navegación
const secciones = [
  { id: 'introduccion', titulo: 'Introducción' },
  { id: 'proyectos', titulo: 'Proyectos' },
  { id: 'noticias', titulo: 'Noticias' },
  { id: 'contacto', titulo: 'Contacto' },
];

function App() {
  return (
    <>
      <Navegacion nombre={perfil.nombre} secciones={secciones} />
      <main>
        <Introduccion
          nombre={perfil.nombre}
          titulo={perfil.titulo}
          biografia={perfil.biografia}
          // PUBLIC_URL hace que la foto funcione también en GitHub Pages
          foto={`${process.env.PUBLIC_URL}/${perfil.foto}`}
          github={perfil.github}
        />
        <Proyectos />
        <Noticias />
        <Contacto />
      </main>
      <Footer nombre={perfil.nombre} github={perfil.github} />
    </>
  );
}

export default App;