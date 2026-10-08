// Navegacion.spec.js
// Pruebas del componente Navegacion: renderizado, props.

import { render, screen, cleanup } from '@testing-library/react';
import Navegacion from '../src/components/Navegacion';

describe('Navegacion', () => {
  const secciones = [
    { id: 'introduccion', titulo: 'Introducción' },
    { id: 'proyectos', titulo: 'Proyectos' },
    { id: 'contacto', titulo: 'Contacto' },
  ];

  afterEach(() => cleanup());

  it('muestra el nombre recibido por props', () => {
    render(<Navegacion nombre="Silvia" secciones={secciones} />);
    expect(screen.getByText('Silvia')).toBeTruthy();
  });

  it('crea un enlace por cada sección, apuntando a su id', () => {
    render(<Navegacion nombre="Silvia" secciones={secciones} />);
    const enlace = screen.getByText('Proyectos');
    expect(enlace.getAttribute('href')).toBe('#proyectos');
    expect(document.querySelectorAll('.nav-link').length).toBe(3);
  });
});
