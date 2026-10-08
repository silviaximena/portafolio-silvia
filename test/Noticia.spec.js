// Noticia.spec.js
// Pruebas del componente Noticia: renderizado, props, eventos y estado.

import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Noticia from '../src/components/Noticia';

const textoLargo =
  'Este es un contenido largo de prueba que supera el límite de caracteres definido para la noticia, así que debería recortarse.';

describe('Noticia', () => {
  afterEach(() => cleanup());

  it('muestra el título y la fecha en formato legible', () => {
    render(<Noticia titulo="Mi noticia" fecha="2026-10-06" contenido="Texto corto" />);
    expect(screen.getByText('Mi noticia')).toBeTruthy();
    expect(screen.getByText('6 de octubre de 2026')).toBeTruthy();
  });

  it('no muestra el botón "Leer más" si el texto es corto', () => {
    render(<Noticia titulo="Corta" fecha="2026-10-06" contenido="Texto corto" />);
    expect(screen.queryByText('Leer más')).toBeNull();
  });

  it('recorta el texto largo y lo expande al hacer clic en "Leer más"', () => {
    render(<Noticia titulo="Larga" fecha="2026-10-06" contenido={textoLargo} />);

    // Antes del clic: el texto completo NO está
    expect(screen.queryByText(textoLargo)).toBeNull();

    fireEvent.click(screen.getByText('Leer más'));

    // Después del clic: aparece completo y el botón cambia
    expect(screen.getByText(textoLargo)).toBeTruthy();
    expect(screen.getByText('Leer menos').getAttribute('aria-expanded')).toBe('true');
  });
});
