// SeccionNoticias.spec.js
// Pruebas del componente SeccionNoticias: renderizado, props.

import { render, screen, cleanup } from '@testing-library/react';
import SeccionNoticias from '../src/components/SeccionNoticias';

describe('SeccionNoticias', () => {
  afterEach(() => cleanup());

  it('muestra todas las noticias de la lista', () => {
    const noticias = [
      { id: 1, titulo: 'Noticia uno', fecha: '2026-10-01', contenido: 'Uno' },
      { id: 2, titulo: 'Noticia dos', fecha: '2026-10-02', contenido: 'Dos' },
    ];
    render(<SeccionNoticias titulo="Mis novedades" noticias={noticias} />);

    expect(screen.getByText('Mis novedades')).toBeTruthy();
    expect(document.querySelectorAll('article').length).toBe(2);
  });

  it('muestra un aviso cuando la lista está vacía', () => {
    render(<SeccionNoticias titulo="Vacía" noticias={[]} />);
    expect(screen.getByText('No hay noticias por ahora.')).toBeTruthy();
  });
});
