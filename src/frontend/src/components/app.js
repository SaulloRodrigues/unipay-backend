import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import Home from './components/Home'; // Importa o componente Home

// Componente principal
const App = () => {
  return (
    <div>
      <Home /> {/* Renderiza apenas a página inicial */}
    </div>
  );
};

export default App;