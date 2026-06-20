import React, { useState, useEffect } from 'react';
import TablaOrdenes from './TablaOrdenes';
import FormularioProducto from './FormularioProducto';
import './PanelAdmin.css';

// — PASO 1: Agregar importaciones —
import { 
  obtenerPedidos, 
  obtenerProductos, 
  crearProducto, 
  editarProducto, 
  eliminarProducto as apiEliminarProducto, 
  actualizarEstadoPedido as apiActualizarEstado 
} from '/src/servicios/api';

function PanelAdmin({ usuarioActivo, alCerrarSesion }) {
  const [pestanaActiva, setPestanaActiva] = useState('dashboard');
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);

  // — PASO 2: Reemplazar el useEffect —
  useEffect(() => {
    const cargar = async () => {
      const [ped, prod] = await Promise.all([
        obtenerPedidos(),
        obtenerProductos()
      ]);
      setPedidos(ped);
      setProductos(prod);
    };
    cargar();
  }, []);

  // ── Métricas para el Dashboard ────────────────────────────────────
  const pedidosPendientes = pedidos.filter(
    p => p.estado_pedido === 'Pendiente'
  ).length;

  const pedidosHoy = pedidos.filter(p => {
    const fecha = new Date(p.fecha_hora);
    const hoy = new Date();
    return fecha.toDateString() === hoy.toDateString();
  }).length;

  const ingresosTotales = pedidos.reduce((acc, p) => acc + parseFloat(p.total), 0);
  const productosAgotados = productos.filter(p => !p.estado_disponible).length;

  // — PASO 3: Reemplazar guardarProducto —
  const guardarProducto = async (datos) => {
    if (datos.id_producto) {
      await editarProducto(datos.id_producto, datos);
    } else {
      await crearProducto(datos);
    }
    const prod = await obtenerProductos();
    setProductos(prod);
    setProductoEditando(null);
  };

  // — PASO 4: Reemplazar eliminarProducto —
  const eliminarProducto = async (id_producto) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    await apiEliminarProducto(id_producto);
    setProductos(prev => prev.filter(p => p.id_producto !== id_producto));
  };

  // — PASO 5: Reemplazar actualizarEstadoPedido —
  const actualizarEstadoPedido = async (id_pedido, nuevoEstado) => {
    await apiActualizarEstado(id_pedido, nuevoEstado);
    setPedidos(prev => prev.map(p => 
      p.id_pedido === id_pedido ? { ...p, estado_pedido: nuevoEstado } : p
    ));
  };

  return (
    <div className='contenedor-panel'>
      {/* ── BARRA SUPERIOR ── */}
      <header className='header-panel'>
        <span className='titulo-panel'>
          🍽️ CECyT-Eats — Panel de Administrador
        </span>
        <div className='info-admin'>
          <span>👤 {usuarioActivo?.nombre}</span>
          <button className='btn-salir-admin' onClick={alCerrarSesion}>
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* ── NAVEGACIÓN POR PESTAÑAS ── */}
      <nav className='pestanas-panel'>
        {['dashboard', 'ordenes', 'inventario'].map(tab => (
          <button
            key={tab}
            className={`btn-pestana ${pestanaActiva === tab ? 'activa' : ''}`}
            onClick={() => setPestanaActiva(tab)}
          >
            {{ 
              dashboard: '📊 Dashboard', 
              ordenes: '📋 Órdenes',
              inventario: '🥗 Inventario' 
            }[tab]}
          </button>
        ))}
      </nav>

      <main className='cuerpo-panel'>
        {/* ── PESTAÑA DASHBOARD ── */}
        {pestanaActiva === 'dashboard' && (
          <section>
            <h2 className='subtitulo-seccion'>Resumen del Día</h2>
            <div className='cuadricula-metricas'>
              <div className='tarjeta-metrica'>
                <span className='numero-metrica'>{pedidosHoy}</span>
                <span className='etiqueta-metrica'>Pedidos hoy</span>
              </div>
              <div className='tarjeta-metrica alerta'>
                <span className='numero-metrica'>{pedidosPendientes}</span>
                <span className='etiqueta-metrica'>Pendientes</span>
              </div>
              <div className='tarjeta-metrica'>
                <span className='numero-metrica'>${ingresosTotales.toFixed(2)}</span>
                <span className='etiqueta-metrica'>Ingresos totales</span>
              </div>
              <div className='tarjeta-metrica advertencia'>
                <span className='numero-metrica'>{productosAgotados}</span>
                <span className='etiqueta-metrica'>Productos agotados</span>
              </div>
            </div>
          </section>
        )}

        {/* ── PESTAÑA ÓRDENES ── */}
        {pestanaActiva === 'ordenes' && (
          <TablaOrdenes
            pedidos={pedidos}
            alActualizarEstado={actualizarEstadoPedido}
          />
        )}

        {/* ── PESTAÑA INVENTARIO / CRUD ── */}
        {pestanaActiva === 'inventario' && (
          <section>
            <div className='cabecera-inventario'>
              <h2 className='subtitulo-seccion'>Gestión de Productos</h2>
              <button
                className='btn-nuevo-producto'
                onClick={() => setProductoEditando({
                  id_producto: null,
                  nombre_producto: '',
                  descripcion: '',
                  precio: '',
                  stock: '',
                  estado_disponible: true,
                  imagen: ''
                })}
              >
                + Nuevo producto
              </button>
            </div>

            {productoEditando !== null && (
              <FormularioProducto
                productoInicial={productoEditando}
                alGuardar={guardarProducto}
                alCancelar={() => setProductoEditando(null)}
              />
            )}

            <table className='tabla-inventario'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Disponible</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(prod => (
                  <tr key={prod.id_producto}>
                    <td>{prod.id_producto}</td>
                    <td>{prod.nombre_producto}</td>
                    <td>${parseFloat(prod.precio).toFixed(2)}</td>
                    <td>{prod.stock}</td>
                    <td>
                      <span className={prod.estado_disponible ? 'badge-disponible' : 'badge-agotado'}>
                        {prod.estado_disponible ? 'Sí' : 'No'}
                      </span>
                    </td>
                    <td className='celda-acciones'>
                      <button className='btn-editar' onClick={() => setProductoEditando(prod)}>
                        Editar
                      </button>
                      <button className='btn-eliminar' onClick={() => eliminarProducto(prod.id_producto)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
}

export default PanelAdmin;