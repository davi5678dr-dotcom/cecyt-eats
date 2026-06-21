import React, { useState } from 'react';
import './Autenticacion.css';
// Paso 1: Importación de la API
import { registrarUsuario } from '/src/servicios/api';

// IMPORTA AQUÍ TUS LOGOS (Ajusta la ruta y el nombre de tus archivos de imagen)
import logoCecytem from '/src/assets/logo.png'; 
import logoCyto from '/src/assets/cecyto.jpg'; 

function Registro({ alCambiarAInicioSesion }) {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [rol, setRol] = useState('alumno');
    const [error, setError] = useState('');
    const [exito, setExito] = useState('');

    // Paso 2: Firma de la función como async
    const manejarRegistro = async (e) => {
        e.preventDefault();
        setError('');
        setExito('');

        // Validación: ningún campo puede estar vacío
        if (!nombre || !correo || !contrasena) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        try {
            // Paso 3: Reemplazo de lógica de localStorage por llamada a la API
            const respuesta = await registrarUsuario({ nombre, correo, contrasena, rol });

            if (respuesta && respuesta.error) {
                setError(respuesta.error);
                return;
            }

            // Si la respuesta es exitosa
            setExito('¡Registro exitoso! Ya puedes iniciar sesión.');
            setNombre('');
            setCorreo('');
            setContrasena('');

        } catch (err) {
            // Capturamos el error del servidor (por ejemplo, el mensaje de correo duplicado)
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else if (err.message) {
                setError('Este correo ya está registrado.');
            } else {
                setError('Hubo un error al procesar el registro.');
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

                <form onSubmit={manejarRegistro} className="formulario-circular">
                    <div className="contenedor-input-etiqueta">
                        <label className="etiqueta-flotante">Nombre</label>
                        <input 
                            type="text" 
                            className="entrada-curva"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Tu nombre completo" 
                        />
                    </div>
                    
                    <div className="contenedor-input-etiqueta">
                        <label className="etiqueta-flotante">Correo</label>
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
                            placeholder="Mínimo 6 caracteres" 
                        />
                    </div>
                    
                    {/* CONTROL DE ROL MANTENIDO */}
                    <div className="grupo-rol-circular">
                        <label className="etiqueta-rol">Tipo de Usuario:</label>
                        <select className="selector-curvo" value={rol} onChange={(e) => setRol(e.target.value)}>
                            <option value="alumno">Alumno</option>
                            <option value="administrador">Personal de Cafetería (Admin)</option>
                        </select>
                    </div>

                    {error && <p className="error-texto-corto">{error}</p>}
                    {exito && <p className="exito-texto-corto">{exito}</p>}

                    {/* BOTÓN REGISTRARME CENTRADO */}
                    <button type="submit" className="btn-registrarme-azul">
                        Registrarme
                    </button>
                    
                    {/* ENLACE PARA INICIAR SESIÓN */}
                    <p className="texto-enlace-abajo">
                        ¿Ya tienes una cuenta?{" "}
                        <span onClick={alCambiarAInicioSesion}>Inicia Sesión aquí</span>
                    </p>
                </form>

            </div>
        </div>
    );
}

export default Registro;