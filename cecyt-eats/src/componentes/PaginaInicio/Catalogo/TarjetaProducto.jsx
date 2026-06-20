import React from 'react';

// Importación de imágenes desde la carpeta assets
// Importación corregida subiendo 3 niveles para llegar a src/assets
import aguaJamaica from '../../../assets/agua de jamaica.jpg';
import arrozLeche from '../../../assets/arroz con leche.jpg';
import chilaquiles from '../../../assets/chilaquiles.jpg';
import ensalada from '../../../assets/ensalada.png';
import quesadilla from '../../../assets/quesadilla.png';
import tacosGuisados from '../../../assets/tacos guisados.jpg';
import tortaJamon from '../../../assets/torta-de-jamon-recipe.jpg';

function TarjetaProducto({ producto, alAgregarAlCarrito }) {
  const {
    nombre_producto, descripcion,
    precio, stock, estado_disponible, imagen
  } = producto;

  // Diccionario para mapear el nombre del producto con su imagen importada
  const imagenesMap = {
    'agua de jamaica': aguaJamaica,
    'arroz con leche': arrozLeche,
    'chilaquiles': chilaquiles,
    'ensalada césar': ensalada,
    'quesadilla de queso': quesadilla,
    'tacos de guisado': tacosGuisados,
    'torta de jamón': tortaJamon
  };

  return (
    <div className='tarjeta-producto'>
      <img
        src={imagen || imagenesMap[nombre_producto?.toLowerCase().trim()] || '/assets/hero.png'}
        alt={nombre_producto}
        className='imagen-producto'
      />

      <div className='cuerpo-tarjeta'>
        <h3 className='nombre-producto'>{nombre_producto}</h3>
        <p className='descripcion-producto'>{descripcion}</p>

        <div className='fila-precio-stock'>
          <span className='precio-producto'>
            ${parseFloat(precio).toFixed(2)}
          </span>
          <span className={
            `etiqueta-stock ${estado_disponible 
              ? 'stock-disponible' 
              : 'stock-agotado'}`
          }>
            {estado_disponible ? `✔ Hay (${stock})` : '✖ Agotado'}
          </span>
        </div>

        <button
          className='btn-agregar'
          onClick={() => alAgregarAlCarrito(producto)}
          disabled={!estado_disponible}
        >
          {estado_disponible ? '+ Añadir al carrito' : 'Sin existencias'}
        </button>
      </div>
    </div>
  );
}

export default TarjetaProducto;