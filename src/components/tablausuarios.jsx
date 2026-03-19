import React from 'react';

const TablaUsuarios = ({ usuarios, alEliminar }) => {
    return (
        <table className="tabla-manolo">
            <thead>
                <tr>
                    <th>Cédula</th>
                    <th>Nombre Completo</th>
                    <th>Edad</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map((u) => (
                    <tr key={u.id}>
                        <td>{u.cedula}</td>
                        <td>{u.nombre} {u.apellidos}</td>
                        <td>{u.edad} años</td>
                        <td>{u.telefono}</td>
                        <td>
                            <button onClick={() => alEliminar(u.id)} className="btn-borrar">Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TablaUsuarios;