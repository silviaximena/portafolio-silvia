// TarjetaProyecto.spec.js
// Pruebas del componente TarjetaProyecto: renderizado, props.

import { render, screen, cleanup } from '@testing-library/react';
import TarjetaProyecto from '../src/components/TarjetaProyecto';

describe('TarjetaProyecto', () => {
  const props = {
    titulo: 'Biblioteca Municipal',
    descripcion: 'Sistema de préstamos',
    imagen: '/img/biblioteca.jpg',
    tecnologias: ['React', 'Bootstrap'],
    enlace: 'https://github.com/silviaximena/biblioteca-react',
  };

  afterEach(() => cleanup());

  it('muestra el título y la descripción recibidos por props', () => {
    render(<TarjetaProyecto {...props} />);
    expect(screen.getByText('Biblioteca Municipal')).toBeTruthy();
    expect(screen.getByText('Sistema de préstamos')).toBeTruthy();
  });

  it('crea una etiqueta por cada tecnología', () => {
    render(<TarjetaProyecto {...props} />);
    expect(document.querySelectorAll('.etiqueta-tecnologia').length).toBe(2);
    expect(screen.getByText('React')).toBeTruthy();
  });

  it('el botón apunta al repositorio y abre en otra pestaña', () => {
    render(<TarjetaProyecto {...props} />);
    const boton = screen.getByText('Ver repositorio');
    expect(boton.getAttribute('href')).toBe(props.enlace);
    expect(boton.getAttribute('target')).toBe('_blank');
  });

  it('la imagen tiene texto alternativo (accesibilidad)', () => {
    render(<TarjetaProyecto {...props} />);
    expect(screen.getByAltText('Captura del proyecto Biblioteca Municipal')).toBeTruthy();
  });
});
