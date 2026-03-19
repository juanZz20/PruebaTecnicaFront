import React from 'react';


const TablaUsuarios = ({ usuarios, alEliminar, alEditar }) => {
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
                        <td className="celda-acciones">
                            {/* BOTÓN EDITAR */}
                            <button
                                onClick={() => alEditar(u)}
                                className="btn-editar"
                                style={{ marginRight: '8px', backgroundColor: '#3498db', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Editar
                            </button>

                            {/* BOTÓN ELIMINAR */}
                            <button
                                onClick={() => alEliminar(u.id)}
                                className="btn-borrar"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TablaUsuarios;