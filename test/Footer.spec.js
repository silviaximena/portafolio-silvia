// Footer.spec.js
// Pruebas del componente Footer: renderizado, props.

import { render, screen, cleanup } from '@testing-library/react';
import Footer from '../src/components/Footer';

describe('Footer', () => {
  afterEach(() => cleanup());

  it('muestra el año actual y el enlace a GitHub', () => {
    render(<Footer nombre="Silvia" github="https://github.com/silviaximena" />);
    const anio = new Date().getFullYear().toString();

    expect(screen.getByText(new RegExp(anio))).toBeTruthy();
    expect(screen.getByText('GitHub').getAttribute('href')).toBe('https://github.com/silviaximena');
  });
});
