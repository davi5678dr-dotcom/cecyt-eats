import React, { useState, useEffect } from 'react';
import PaginaInicio from './componentes/PaginaInicio/PaginaInicio';
import InicioSesion from './componentes/PaginaInicio/Autenticacion/InicioSesion';
import Registro from './componentes/PaginaInicio/Autenticacion/Registro';
import Catalogo from './componentes/PaginaInicio/Catalogo/Catalogo';
import Carrito from './componentes/PaginaInicio/Carrito/Carrito';
import PanelAdmin from './componentes/PaginaInicio/PanelAdmin/PanelAdmin';
// Por esto (la ruta absoluta):
import { crearPedido } from '/src/servicios/api';
function App() {
  const [pantallaActual, setPantallaActual] = useState('inicio');
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [elementosCarrito, setElementosCarrito] = useState([]);

  useEffect(() => {
    const sesionGuardada = localStorage.getItem('usuarioActivo');
    if (sesionGuardada) {
      const usuario = JSON.parse(sesionGuardada);
      setUsuarioActivo(usuario);
      if (usuario.rol === 'administrador') {
        setPantallaActual('adminPanel');
      } else {
        setPantallaActual('catalogo');
      }
    }
  }, []);

  const manejarInicioSesionExitoso = (usuario) => {
    setUsuarioActivo(usuario);
    if (usuario.rol === 'administrador') {
      setPantallaActual('adminPanel');
    } else {
      setPantallaActual('catalogo');
    }
  };

  const manejarCierreSesion = () => {
    localStorage.removeItem('usuarioActivo');
    setUsuarioActivo(null);
    setPantallaActual('inicio');
  };

  const agregarAlCarrito = (producto) => {
    setElementosCarrito(prev => {
      const existente = prev.find(i => i.id_producto === producto.id_producto);
      if (existente) {
        return prev.map(i =>
          i.id_producto === producto.id_producto
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const cambiarCantidadCarrito = (id_producto, delta) => {
    setElementosCarrito(prev =>
      prev
        .map(i =>
          i.id_producto === id_producto
            ? { ...i, cantidad: i.cantidad + delta }
            : i
        )
        .filter(i => i.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (id_producto) => {
    setElementosCarrito(prev =>
      prev.filter(i => i.id_producto !== id_producto)
    );
  };

  const finalizarPedido = async () => {
    const subtotal = elementosCarrito.reduce(
      (acc, i) => acc + i.precio * i.cantidad, 0
    );
    const detalles = elementosCarrito.map(item => ({
      id_producto: item.id_producto,
      cantidad: item.cantidad,
      precio_unitario: item.precio,
    }));

    const respuesta = await crearPedido({
      id_usuario: usuarioActivo.id_usuario,
      total: parseFloat(subtotal.toFixed(2)),
      detalles,
    });

    if (respuesta.error) {
      alert('Error al guardar pedido: ' + respuesta.error);
      return;
    }

    setElementosCarrito([]);
    alert(`✔ Pedido #${respuesta.id_pedido} registrado correctamente.`);
    setPantallaActual('catalogo');
  };

  const totalEnCarrito = elementosCarrito.reduce(
    (acc, i) => acc + i.cantidad, 0
  );

  return (
    <div>
      {pantallaActual === 'inicio' && <PaginaInicio alNavegararInicioSesion={() => setPantallaActual('inicioSesion')} alNavegararRegistro={() => setPantallaActual('registro')} />}
      {pantallaActual === 'inicioSesion' && <InicioSesion alCambiarARegistro={() => setPantallaActual('registro')} alIniciarSesionExitoso={manejarInicioSesionExitoso} />}
      {pantallaActual === 'registro' && <Registro alCambiarAInicioSesion={() => setPantallaActual('inicioSesion')} />}
      {pantallaActual === 'catalogo' && <Catalogo usuarioActivo={usuarioActivo} alAgregarAlCarrito={agregarAlCarrito} alVerCarrito={() => setPantallaActual('carrito')} totalEnCarrito={totalEnCarrito} alCerrarSesion={manejarCierreSesion} />}
      {pantallaActual === 'carrito' && <Carrito elementos={elementosCarrito} usuarioActivo={usuarioActivo} alCambiarCantidad={cambiarCantidadCarrito} alEliminarElemento={eliminarDelCarrito} alFinalizarPedido={finalizarPedido} alSeguirComprando={() => setPantallaActual('catalogo')} />}
      {pantallaActual === 'adminPanel' && <PanelAdmin usuarioActivo={usuarioActivo} alCerrarSesion={manejarCierreSesion} />}
    </div>
  );
}

export default App;