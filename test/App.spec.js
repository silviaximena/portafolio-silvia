// Prueba de integración: la página completa se arma con todos sus componentes
import { render, screen, cleanup } from '@testing-library/react';
import App from '../src/App';

describe('App', () => {
  afterEach(() => cleanup());

  it('muestra todas las secciones del portafolio', async () => {
    // El mismo mock responde a proyectos y a noticias
    spyOn(window, 'fetch').and.callFake((url) =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(url.includes('noticias') ? { secciones: [] } : []),
      })
    );

    render(<App />);

    expect(screen.getByText(/Hola, soy/)).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Contacto' })).toBeTruthy();
    expect(await screen.findByRole('group', { name: /Filtrar proyectos/ })).toBeTruthy();
  });
});
