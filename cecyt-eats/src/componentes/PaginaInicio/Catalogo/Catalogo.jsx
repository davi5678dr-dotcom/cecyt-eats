import React, { useState, useEffect } from 'react';
import TarjetaProducto from './TarjetaProducto';
import './Catalogo.css';
// — PASO 1: Agregar importación —
import { obtenerProductos } from '/src/servicios/api';

function Catalogo({ usuarioActivo, alAgregarAlCarrito, alVerCarrito, totalEnCarrito, alCerrarSesion }) {
 const [productos, setProductos] = useState([]);
 const [textoBusqueda, setTextoBusqueda] = useState('');

 // — PASO 2: Reemplazar el useEffect —
 useEffect(() => {
  // ELIMINADAS: las líneas de localStorage que estaban aquí
  
  // ESCRIBIR esto en su lugar:
  const cargar = async () => {
   const datos = await obtenerProductos();
   setProductos(datos);
  };
  cargar();
 }, []);

 // Filtrar en tiempo real: coincidencia en nombre O descripción
 const productosFiltrados = productos.filter(p =>
 p.nombre_producto.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
 p.descripcion.toLowerCase().includes(textoBusqueda.toLowerCase())
 );

 return (
 <div className='contenedor-catalogo'>
 {/* ── BARRA SUPERIOR ── */}
 <header className='encabezado-catalogo'>
 <div>
 <h1>Menú del Día</h1>
 <p className='saludo-usuario'>
 Hola, <strong>{usuarioActivo?.nombre}</strong> 👋
 </p>
 </div>
 <div className='acciones-catalogo'>
 <button className='btn-carrito' onClick={alVerCarrito}>
 🛒 Carrito ({totalEnCarrito})
 </button>
 <button className='btn-cerrar-sesion' onClick={alCerrarSesion}>
 Salir
 </button>
 </div>
 </header>
 {/* ── BUSCADOR ── */}
 <div className='contenedor-buscador'>
 <input
 type='text'
 className='buscador'
 placeholder='🔍 Buscar alimento por nombre o descripción…'
 value={textoBusqueda}
 onChange={(e) => setTextoBusqueda(e.target.value)}
 />
 </div>
 {/* ── CUADRÍCULA DE TARJETAS ── */}
 {productosFiltrados.length === 0 ? (
 <p className='sin-resultados'>
 Sin resultados para "{textoBusqueda}".
 </p>
 ) : (
 <div className='cuadricula-catalogo'>
 {productosFiltrados.map(prod => (
 <TarjetaProducto
 key={prod.id_producto}
 producto={prod}
 alAgregarAlCarrito={alAgregarAlCarrito}
 />
 ))}
 </div>
 )}
 </div>
 );
}

export default Catalogo;