import React, { useState } from 'react';
import { apiService } from './services/api';

const Login = ({ alLoguear }) => {
    const [credenciales, setCredenciales] = useState({ cedula: '', password: '' });

    const entrar = async () => {
      
        const res = await apiService.login(credenciales.cedula, credenciales.password);
        console.log("Respuesta de la API:", res);
        if (res && !res.error) {
            alLoguear(true);
        } else {
            alert("Acceso denegado: Usuario o clave incorrectos");
        }
    };

    return (
        <div className="login-box">
            <h2>Acceso Administrativo</h2>
            <input type="text" placeholder="Usuario (manolo)" onChange={e => setCredenciales({...credenciales, cedula: e.target.value})} />
            <input type="password" placeholder="Clave (1234)" onChange={e => setCredenciales({...credenciales, password: e.target.value})} />
            <button onClick={entrar}>Entrar</button>
        </div>
    );
};
export default Login;