import { useState, useEffect } from 'react';
import { apiService } from './services/api';
import Tablausuarios from './components/tablausuarios';
import './App.css';

function App() {
  const [usuarios, setusuarios] = useState([]);


  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const data = await apiService.listarUsuarios();
    setusuarios(data);
  };

  const manejarEliminar = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este contacto?")) {
      await apiService.eliminarUsuarios(id);
      cargarDatos(); // Recargar la lista
    }
  };

  return (
    <div className="container">
      <h1>Panel Administrativo - Manolo Limitada</h1>
      <div className="acciones">
        <button onClick={cargarDatos} className="btn-refresh">Actualizar Lista</button>
      </div>

      <Tablausuarios usuarios={usuarios} alEliminar={manejarEliminar} />
    </div>
  );
}

export default App;