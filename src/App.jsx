import { useState, useEffect } from 'react';
import { apiService } from './services/api';
import Tablausuarios from './components/tablausuarios';
import Login from './login';
import './App.css';

function App() {
  const [usuarios, setusuarios] = useState([]);
  const [estaLogueado, setEstaLogueado] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Estado para ocultar/mostrar

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
    if (estaLogueado) cargarDatos();
  }, [estaLogueado]);

  const prepararEdicion = (usuario) => {
    setEditandoId(usuario.cedula);
    setMostrarFormulario(true); // Abrimos el form al editar
    setNuevo({
      cedula: usuario.cedula,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      telefono: usuario.telefono,
      fechaNacimiento: usuario.fechaNacimiento.split('T'),
      direccion: usuario.direccion || ''
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setMostrarFormulario(false);
    setNuevo({ cedula: '', nombre: '', apellidos: '', telefono: '', fechaNacimiento: '', direccion: '' });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await apiService.editarUsuarios(editandoId, nuevo);
      } else {
        await apiService.crearUsuarios(nuevo);
      }
      cancelarEdicion();
      cargarDatos();
    } catch (error) {
      alert("Error al procesar la solicitud");
    }
  };

  if (!estaLogueado) return <Login alLoguear={setEstaLogueado} />;

  return (
    <div className="app-wrapper">
      <div className="container">
        <header className="main-header">
          <h1>PANEL ADMINISTRATIVO</h1>
          <p>Manolo Limitada</p>
        </header>

        <div className="toolbar">
          <button
            className="btn-primary"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            {mostrarFormulario ? '✕ Cerrar' : '＋ Nuevo Registro'}
          </button>

          <button onClick={cargarDatos} className="btn-secondary">
            ↻ Actualizar Lista
          </button>
        </div>

        {mostrarFormulario && (
          <div className="card-formulario">
            <h3>{editandoId ? 'EDITAR CONTACTO' : 'REGISTRAR NUEVO'}</h3>
            <form onSubmit={manejarSubmit} className="formulario-grid">
              <input type="text" placeholder="Cédula" value={nuevo.cedula}
                onChange={e => setNuevo({ ...nuevo, cedula: e.target.value })}
                required disabled={!!editandoId} />

              <input type="text" placeholder="Nombre" value={nuevo.nombre}
                onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })} required />

              <input type="text" placeholder="Apellidos" value={nuevo.apellidos}
                onChange={e => setNuevo({ ...nuevo, apellidos: e.target.value })} required />

              <input type="text" placeholder="Teléfono" value={nuevo.telefono}
                onChange={e => setNuevo({ ...nuevo, telefono: e.target.value })} required />

              <input type="date" value={nuevo.fechaNacimiento}
                onChange={e => setNuevo({ ...nuevo, fechaNacimiento: e.target.value })} required />

              <div className="botones-form">
                <button type="submit" className="btn-dark">
                  {editandoId ? 'ACTUALIZAR' : 'GUARDAR'}
                </button>
                <button type="button" onClick={cancelarEdicion} className="btn-dark">
                  CANCELAR
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="table-container">
          <Tablausuarios
            usuarios={usuarios}
            alEliminar={async (id) => {
              if (window.confirm("¿Eliminar registro?")) {
                await apiService.eliminarUsuarios(id);
                cargarDatos();
              }
            }}
            alEditar={prepararEdicion}
          />
        </div>
      </div>
    </div>
  );
}

export default App;