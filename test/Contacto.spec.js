// Contacto.spec.js
// Pruebas del componente Contacto: renderizado, props, eventos y estado.

import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Contacto from '../src/components/Contacto';

// Ayudante: escribe un texto en el campo que tiene esa etiqueta
function escribir(etiqueta, texto) {
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: texto } });
}

describe('Contacto', () => {
  afterEach(() => cleanup());

  it('actualiza el estado al escribir en un campo', () => {
    render(<Contacto />);
    escribir('Nombre', 'Silvia');
    expect(screen.getByLabelText('Nombre').value).toBe('Silvia');
  });

  it('muestra los tres errores si se envía vacío', () => {
    render(<Contacto />);
    fireEvent.click(screen.getByText('Enviar'));

    expect(screen.getByText('El nombre debe tener al menos 3 letras.')).toBeTruthy();
    expect(screen.getByText(/Ingresa un correo válido/)).toBeTruthy();
    expect(screen.getByText('El mensaje debe tener al menos 10 caracteres.')).toBeTruthy();
    expect(screen.getByLabelText('Nombre').classList.contains('is-invalid')).toBeTrue();
  });

  it('con datos válidos muestra el mensaje de éxito y limpia el formulario', () => {
    render(<Contacto />);
    escribir('Nombre', 'Silvia');
    escribir('Correo', 'silvia@duoc.cl');
    escribir('Mensaje', 'Hola, este es un mensaje de prueba');
    fireEvent.click(screen.getByText('Enviar'));

    expect(screen.getByText(/Gracias por escribir/)).toBeTruthy();
    expect(screen.getByLabelText('Nombre').value).toBe('');
  });
});
