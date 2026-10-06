// Contacto.js
// Formulario de contacto con Form de Bootstrap.
// Guarda lo que escribe el usuario en el state, valida al enviar
// y muestra los errores debajo de cada campo.
import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { validarContacto } from '../utils/validaciones';

const FORMULARIO_VACIO = { nombre: '', correo: '', mensaje: '' };

function Contacto() {
  // ===== STATE =====
  const [datos, setDatos] = useState(FORMULARIO_VACIO); // lo que escribe el usuario
  const [errores, setErrores] = useState({});           // errores de validación
  const [enviado, setEnviado] = useState(false);        // muestra el mensaje de éxito

  // EVENTO: cada vez que el usuario escribe, se actualiza el campo en el state
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatos((anteriores) => ({ ...anteriores, [name]: value }));
    setEnviado(false);
  };

  // EVENTO: al enviar, se valida antes de aceptar
  const manejarEnvio = (e) => {
    e.preventDefault(); // evita que la página se recargue

    const erroresEncontrados = validarContacto(datos);
    setErrores(erroresEncontrados);

    // Si no hay errores, mostramos el éxito y limpiamos el formulario
    if (Object.keys(erroresEncontrados).length === 0) {
      setEnviado(true);
      setDatos(FORMULARIO_VACIO);
    }
  };

  return (
    <section id="contacto" className="seccion">
      <Container>
        <h2 className="titulo-seccion">Contacto</h2>

        <Row className="justify-content-center">
          {/* El formulario ocupa todo el ancho en celular y se centra en pantallas grandes */}
          <Col xs={12} md={10} lg={7}>
            {/* Renderizado condicional: mensaje solo después de un envío correcto */}
            {enviado && (
              <Alert variant="success" role="status">
                ¡Gracias por escribir! Tu mensaje fue enviado correctamente.
              </Alert>
            )}

            {/* noValidate: usamos nuestra validación en vez de la del navegador */}
            <Form noValidate onSubmit={manejarEnvio}>
              {/* controlId conecta el Label con su campo (accesibilidad) */}
              <Form.Group className="mb-3" controlId="contacto-nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={datos.nombre}
                  onChange={manejarCambio}
                  isInvalid={!!errores.nombre}
                  placeholder="Tu nombre"
                />
                <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="contacto-correo">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  name="correo"
                  value={datos.correo}
                  onChange={manejarCambio}
                  isInvalid={!!errores.correo}
                  placeholder="nombre@correo.cl"
                />
                <Form.Control.Feedback type="invalid">{errores.correo}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="contacto-mensaje">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="mensaje"
                  value={datos.mensaje}
                  onChange={manejarCambio}
                  isInvalid={!!errores.mensaje}
                  placeholder="Escribe tu mensaje"
                />
                <Form.Control.Feedback type="invalid">{errores.mensaje}</Form.Control.Feedback>
              </Form.Group>

              <div className="text-center">
                <Button type="submit" className="btn-dorado px-5">
                  Enviar
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Contacto;