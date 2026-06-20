import React, { useState } from 'react';
import './Autenticacion.css';
// — PASO 1: Agregar importación —
// Por esto (la ruta absoluta):
import { iniciarSesion } from '/src/servicios/api';

// IMPORTACIÓN DE TUS LOGOS
import logoCecytem from '/src/assets/logo.png'; 
import logoCyto from '/src/assets/cecyto.jpg'; 

function InicioSesion({ alCambiarARegistro, alIniciarSesionExitoso }) {
 const [correo, setCorreo] = useState('');
 const [contrasena, setContrasena] = useState('');
 const [error, setError] = useState('');

 // — PASO 2: Función async con fetch en lugar de localStorage —
 const manejarInicioSesion = async (e) => {
 e.preventDefault(); 
 setError('');

 if (!correo || !contrasena) {
 setError('Por favor, llena todos los campos.'); // o 'Llena todos los campos.' como pide la guía
 return;
 }

 try {
     // Intentamos realizar la petición al servidor en línea
     const respuesta = await iniciarSesion({ correo, contrasena });

     // Si el servidor responde con un error estructurado
     if (respuesta && respuesta.error) {
         setError(respuesta.error);
         return;
     }
     
     // Si la respuesta no es válida o falta el usuario
     if (!respuesta || !respuesta.usuario) {
         setError('Correo o contraseña incorrectos.');
         return;
     }

     // Guardar sesión activa (solo el objeto usuario, no la contraseña)
     localStorage.setItem('usuarioActivo', JSON.stringify(respuesta.usuario));
     
     // Avisar al componente padre que el login fue exitoso
     alIniciarSesionExitoso(respuesta.usuario);

 } catch (err) {
     // Si el servidor en línea falló o tiró un error de red, lo atrapamos aquí
     if (err.response && err.response.data && err.response.data.mensaje) {
         setError(err.response.data.mensaje);
     } else if (err.message) {
         setError('Correo o contraseña incorrectos.');
     } else {
         setError('Error al conectar con el servidor.');
     }
 }
 };

 return (
 <div className="contenedor-registro-azul">
     <div className="tarjeta-registro-circular">
         
         {/* FILA DE ENCABEZADO CON LOGOS Y TÍTULO */}
         <div className="encabezado-logos">
             <img src={logoCecytem} alt="Logo CECyTEM" className="logo-esquina" />
             <h1 className="titulo-cafeteria">CAFETERIA CECyT-Eats</h1>
             <img src={logoCyto} alt="Logo Cyto" className="logo-esquina" />
         </div>
         
         {/* ÍCONO DEL MONITO CENTRAL */}
         <div className="icono-usuario-centro">👤</div>

         <form onSubmit={manejarInicioSesion} className="formulario-circular">
             <div className="contenedor-input-etiqueta">
                 <label className="etiqueta-flotante">Correo Electrónico</label>
                 <input 
                     type="email" 
                     className="entrada-curva"
                     value={correo}
                     onChange={(e) => setCorreo(e.target.value)}
                     placeholder="usuario@correo.com" 
                 />
             </div>
             
             <div className="contenedor-input-etiqueta">
                 <label className="etiqueta-flotante">Contraseña</label>
                 <input 
                     type="password" 
                     className="entrada-curva"
                     value={contrasena}
                     onChange={(e) => setContrasena(e.target.value)}
                     placeholder="Tu contraseña" 
                 />
             </div>
             
             {/* ENLACE DE CONTRASEÑA OLVIDADA */}
             <div className="contenedor-olvide">
                 <span className="olvide-contrasena">¿Olvidaste tu contraseña?</span>
             </div>

             {error && <p className="error-texto-corto">{error}</p>}

             {/* BOTÓN ENTRAR AZUL REY DESTACADO */}
             <button type="submit" className="btn-registrarme-azul">Entrar</button>
         </form>

         {/* TEXTO DE CAMBIO DE PANTALLA ABAJO */}
         <p className="texto-enlace-abajo">
             ¿No tienes cuenta?{" "}
             <span onClick={alCambiarARegistro}>Regístrate aquí</span>
         </p>
     </div>
 </div>
 );
}

export default InicioSesion;