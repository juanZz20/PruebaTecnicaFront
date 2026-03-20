const BASE_URL = 'http://localhost:5150';


export const apiService = {
login: async (Nombre, Cedula) => {
        const response = await fetch('http://localhost:5150/api/usuarios/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Nombre: Nombre, Cedula: Cedula })
    });

    if (!response.ok) {
        throw new Error("Usuario o contraseña incorrectos");
    }
    const text = await response.text();
    return text ? JSON.parse(text) : {};
},

    listarUsuarios: async () => {
        const response = await fetch(`${BASE_URL}/api/usuarios`);
        return response.json();
    },


    crearUsuarios: async (usuario) => {
        const response = await fetch(`${BASE_URL}/api/usuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        });
        return response.json();
    },

    eliminarUsuarios: async (id) => {
        await fetch(`${BASE_URL}/api/usuarios/${id}`, { method: 'DELETE' });
    },

    editarUsuarios: async (cedula, usuario) => {
        const response = await fetch(`${BASE_URL}/api/usuarios/${cedula}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        });
        return response.json();
    }
};