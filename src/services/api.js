const BASE_URL = 'http://localhost:5150';


export const apiService = {
    login: async (user, password) => {
        const response = await fetch(`${BASE_URL}/api/usuarios/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, password })
        });
        return response.json();
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

    editarUsuarios: async (id) =>{
        await fetch(`${BASE_URL}/usuarios/${id}`, {
            method: `PUT`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        })

    }
};