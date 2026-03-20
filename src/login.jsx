import React, { useState } from 'react';
import { apiService } from './services/api';
import './Login.css';

const Login = ({ alLoguear }) => {
    const [credenciales, setCredenciales] = useState({ Nombre: '', Cedula: '' });

    const entrar = async () => {
        if (!credenciales.Nombre.trim() || !credenciales.Cedula.trim()) {
            alert("Por favor, completa todos los campos");
            return;
        }

        try {
            const res = await apiService.login(
                credenciales.Nombre,
                credenciales.Cedula
            );
            console.log("Respuesta:", res);
            if (res.rol === "Admin") {
                alLoguear(true);
            } else {
                throw new Error("Credenciales incorrectas");
            }

        } catch (error) {
            alert("Acceso denegado: " + error.message);
        }
    };

    return (
        <div className="login-container"> 
            <div className="login-box">
                <h2>Acceso Administrativo</h2>

                <input
                    type="text"
                    //se que eso no debe ir pero es para saber cual es el usuario y no estar viendo en el backend
                    placeholder="Usuario (manolo)"
                    value={credenciales.Nombre}
                    onChange={e => setCredenciales({ ...credenciales, Nombre: e.target.value })}
                />

                <input
                    type="password"
                    //se que eso no debe ir pero es para saber cual es la clave y no estar viendo en el backend
                    placeholder="Clave (1234)"
                    value={credenciales.Cedula}
                    onChange={e => setCredenciales({ ...credenciales, Cedula: e.target.value })}
                />

                <button onClick={entrar}>Entrar</button>
            </div>
        </div>
    );
};

export default Login;