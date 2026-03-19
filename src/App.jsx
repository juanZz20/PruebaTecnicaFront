import { useState, useEffect } from 'react';
import { apiService } from './services/api';
import Tablausuarios from './components/tablausuarios';
import Login from './login';
import './App.css';

function App() {
  const [usuarios, setusuarios] = useState([]);
  const [estaLogueado, setEstaLogueado] = useState(false);

  // Estado para el formulario
  const [nuevo, setNuevo] = useState({
    cedula: '',
    nombre: '',
    apellidos: '',
    telefono: '',
    fechaNacimiento: '',
    direccion: ''
  });

  const [editandoId, setEditandoId] = useState(null);

  const cargarDatos = async () => {
    try {
      const data = await apiService.listarUsuarios();
      setusuarios(data);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => {
    if (estaLogueado) {
      cargarDatos();
    }
  }, [estaLogueado]);


  const prepararEdicion = (usuario) => {
    setEditandoId(usuario.cedula); 
    setNuevo({
      cedula: usuario.cedula,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      telefono: usuario.telefono,
      fechaNacimiento: usuario.fechaNacimiento,
      direccion: usuario.direccion || ''
    });
  };


  const cancelarEdicion = () => {
    setEditandoId(null);
    setNuevo({ cedula: '', nombre: '', apellidos: '', telefono: '', fechaNacimiento: '', direccion: '' });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        
        await apiService.editarUsuarios(nuevo);
        alert("Contacto actualizado con éxito");
      } else {
        await apiService.crearUsuarios(nuevo);
        alert("Contacto guardado con éxito");
      }

      cancelarEdicion();
      cargarDatos();    
    } catch (error) {
      alert("Error al procesar la solicitud");
    }
  };

  const manejarEliminar = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este contacto?")) {
      try {
        await apiService.eliminarUsuarios(id);
        cargarDatos();
      } catch (error) {
        alert("Error al eliminar");
      }
    }
  };

  if (!estaLogueado) {
    return <Login alLoguear={setEstaLogueado} />;
  }

  return (
    <div className="container">
      <h1>Panel Administrativo - Manolo Limitada</h1>

      <div className="card-formulario">
      
        <h3>{editandoId ? 'Editar Contacto' : 'Registrar Nuevo Contacto'}</h3>

        <form onSubmit={manejarSubmit} className="formulario-grid">
          <input type="text" placeholder="Cédula" value={nuevo.cedula}
            onChange={e => setNuevo({ ...nuevo, cedula: e.target.value })}
            required disabled={!!editandoId} /> {/* Bloqueamos la cédula si es edición */}

          <input type="text" placeholder="Nombre" value={nuevo.nombre}
            onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })} required />

          <input type="text" placeholder="Apellidos" value={nuevo.apellidos}
            onChange={e => setNuevo({ ...nuevo, apellidos: e.target.value })} required />

          <input type="text" placeholder="Teléfono" value={nuevo.telefono}
            onChange={e => setNuevo({ ...nuevo, telefono: e.target.value })} required />

          <input type="date" value={nuevo.fechaNacimiento}
            onChange={e => setNuevo({ ...nuevo, fechaNacimiento: e.target.value })} required />

          <div className="botones-form">
            <button type="submit" className="btn-guardar">
              {editandoId ? 'Actualizar' : 'Guardar'}
            </button>

            {editandoId && (
              <button type="button" onClick={cancelarEdicion} className="btn-cancelar">
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="acciones-header">
        <button onClick={cargarDatos} className="btn-refresh">🔄 Actualizar Lista</button>
      </div>

      <Tablausuarios
        usuarios={usuarios}
        alEliminar={manejarEliminar}
        alEditar={prepararEdicion}
      />
    </div>
  );
}

export default App;