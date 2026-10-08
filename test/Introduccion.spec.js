// Introduccion.spec.js
// Pruebas del componente Introduccion: renderizado, props.

import { render, screen, cleanup } from '@testing-library/react';
import Introduccion from '../src/components/Introduccion';

describe('Introduccion', () => {
  afterEach(() => cleanup());

  it('muestra nombre, título, biografía y foto con texto alternativo', () => {
    render(
      <Introduccion
        nombre="Silvia"
        titulo="Estudiante de Informática"
        biografia="Me gusta programar"
        foto="/img/silvia.jpg"
        github="https://github.com/silviaximena"
      />
    );

    expect(screen.getByText('Hola, soy Silvia')).toBeTruthy();
    expect(screen.getByText('Estudiante de Informática')).toBeTruthy();
    expect(screen.getByText('Me gusta programar')).toBeTruthy();
    expect(screen.getByAltText('Foto de Silvia')).toBeTruthy();
    expect(screen.getByText('Ver mi GitHub').getAttribute('href')).toBe('https://github.com/silviaximena');
  });
});
