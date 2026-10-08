// Noticias.spec.js
// Pruebas del componente Noticias: renderizado, props, carga con mock de fetch.

import { render, screen, cleanup } from '@testing-library/react';
import Noticias from '../src/components/Noticias';
import { simularFetch } from './ayudantes/simularFetch';

const noticiasFalsas = {
  secciones: [
    { id: 'a', titulo: 'Sección A', noticias: [{ id: 1, titulo: 'Noticia A', fecha: '2026-10-01', contenido: 'x' }] },
    { id: 'b', titulo: 'Sección B', noticias: [{ id: 2, titulo: 'Noticia B', fecha: '2026-10-02', contenido: 'y' }] },
  ],
};

describe('Noticias', () => {
  afterEach(() => cleanup());

  it('carga las dos secciones de noticias desde el JSON', async () => {
    simularFetch(noticiasFalsas);
    render(<Noticias />);

    expect(await screen.findByText('Sección A')).toBeTruthy();
    expect(screen.getByText('Sección B')).toBeTruthy();
    expect(screen.getByText('Noticia A')).toBeTruthy();
  });

  it('muestra un mensaje de error si falla la carga', async () => {
    simularFetch(null, false);
    render(<Noticias />);
    expect(await screen.findByText(/No se pudieron cargar las noticias/)).toBeTruthy();
  });
});
