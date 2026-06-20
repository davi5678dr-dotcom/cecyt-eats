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

 // // ELIMINAR: buscar en localStorage (las líneas de usuariosExistentes y usuarioEncontrado)
 
 // // ESCRIBIR esto en su lugar:
 const respuesta = await iniciarSesion({ correo, contrasena });

 if (respuesta.error) {
 setError(respuesta.error);
 return;
 }

 // // Guardar sesión activa (solo el objeto usuario, no la contraseña)
 localStorage.setItem('usuarioActivo', JSON.stringify(respuesta.usuario));
 
 // Avisar al componente padre que el login fue exitoso
 alIniciarSesionExitoso(respuesta.usuario);
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