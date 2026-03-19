import { useState, useEffect } from 'react';
import { apiService } from './services/api';
import Tablausuarios from './components/tablausuarios';
import Login from './login';
import './App.css';

function App() {
  const [usuarios, setusuarios] = useState([]);
  const [estaLogueado, setEstaLogueado] = useState(false);
  const [nuevo, setNuevo] = useState({
    cedula: '',
    nombre: '',
    apellidos: '',
    telefono: '',
    fechaNacimiento: '',
    direccion: '' 
  });

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

  const manejarGuardar = async (u) => {
    u.preventDefault();
    try {
      await apiService.crearUsuarios(nuevo);
      alert("Contacto guardado con éxito");
      cargarDatos(); 
      setNuevo({ cedula: '', nombre: '', apellidos: '', telefono: '', fechaNacimiento: '', direccion: '' });
    } catch (error) {
      alert("Error al guardar el contacto");
    }
  };

  const manejarEliminar = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este contacto?")) {
      await apiService.eliminarUsuarios(id);
      cargarDatos();
    }
  };


  if (!estaLogueado) {
    return <Login alLoguear={setEstaLogueado} />;
  }

  return (
    <div className="container">
      <h1>Panel Administrativo - Manolo Limitada</h1>

      <div className="card-formulario">
        <h3>Registrar Nuevo Contacto</h3>
        <form onSubmit={manejarGuardar} className="formulario-grid">
          <input type="text" placeholder="Cédula" value={nuevo.cedula}
            onChange={u => setNuevo({ ...nuevo, cedula: u.target.value })} required />

          <input type="text" placeholder="Nombre" value={nuevo.nombre}
            onChange={u => setNuevo({ ...nuevo, nombre: u.target.value })} required />

          <input type="text" placeholder="Apellidos" value={nuevo.apellidos}
            onChange={u => setNuevo({ ...nuevo, apellidos: u.target.value })} required />

          <input type="text" placeholder="Teléfono" value={nuevo.telefono}
            onChange={u => setNuevo({ ...nuevo, telefono: u.target.value })} required />

          <input type="date" value={nuevo.fechaNacimiento}
            onChange={u => setNuevo({ ...nuevo, fechaNacimiento: u.target.value })} required />

          <button type="submit" className="btn-guardar">Guardar Contacto</button>
        </form>
      </div>

      <div className="acciones-header">
        <button onClick={cargarDatos} className="btn-refresh">🔄 Actualizar Lista</button>
      </div>

      <Tablausuarios usuarios={usuarios} alEliminar={manejarEliminar} />
    </div>
  );
}

export default App;