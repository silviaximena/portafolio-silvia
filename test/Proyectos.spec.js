// Proyectos.spec.js
// Pruebas del componente Proyectos: renderizado, props, carga con mock de fetch, eventos y estado.

import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Proyectos from '../src/components/Proyectos';
import { simularFetch } from './ayudantes/simularFetch';

// Datos falsos para no depender del archivo real
const proyectosFalsos = [
  { id: 1, titulo: 'Proyecto React', descripcion: 'A', tecnologias: ['React'], imagen: 'a.jpg', enlace: '#' },
  { id: 2, titulo: 'Proyecto HTML', descripcion: 'B', tecnologias: ['HTML5'], imagen: 'b.jpg', enlace: '#' },
];

describe('Proyectos', () => {
  afterEach(() => cleanup());

  it('muestra un indicador de carga mientras lee el JSON', () => {
    simularFetch(proyectosFalsos);
    render(<Proyectos />);
    expect(screen.getByText('Cargando proyectos...')).toBeTruthy();
  });

  it('muestra una tarjeta por cada proyecto del JSON', async () => {
    simularFetch(proyectosFalsos);
    render(<Proyectos />);

    expect(await screen.findByText('Proyecto React')).toBeTruthy();
    expect(screen.getByText('Proyecto HTML')).toBeTruthy();
    expect(screen.queryByText('Cargando proyectos...')).toBeNull();
  });

  it('al hacer clic en un filtro, muestra solo los proyectos de esa tecnología', async () => {
    simularFetch(proyectosFalsos);
    render(<Proyectos />);
    await screen.findByText('Proyecto React');

    // Clic en el botón del filtro "HTML5" (no en la etiqueta de la tarjeta)
    const botonFiltro = screen.getByRole('button', { name: 'HTML5' });
    fireEvent.click(botonFiltro);

    expect(screen.queryByText('Proyecto React')).toBeNull();
    expect(screen.getByText('Proyecto HTML')).toBeTruthy();
    expect(botonFiltro.getAttribute('aria-pressed')).toBe('true');
  });

  it('muestra un mensaje de error si el JSON no se puede cargar', async () => {
    simularFetch(null, false);
    render(<Proyectos />);
    expect(await screen.findByText(/No se pudieron cargar los proyectos/)).toBeTruthy();
  });
});
