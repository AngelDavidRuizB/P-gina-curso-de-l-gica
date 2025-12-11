import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './sections/Home';
import DiagramGenerator from './sections/DiagramGenerator';
import Variables from './sections/Variables';
import Conditionals from './sections/Conditionals';
import ForLoop from './sections/ForLoop';
import WhileLoop from './sections/WhileLoop';
import NestedLoops from './sections/NestedLoops';
import Arrays from './sections/Arrays';
import Functions from './sections/Functions';
import DiagramExplanation from './sections/DiagramExplanation';

function App() {
  const [activeSection, setActiveSection] = useState('inicio');

  const renderSection = () => {
    switch (activeSection) {
      case 'inicio':
        return <Home onNavigate={setActiveSection} />;
      case 'diagrama':
        return <DiagramGenerator />;
      case 'variables':
        return <Variables />;
      case 'condicionales':
        return <Conditionals />;
      case 'for':
        return <ForLoop />;
      case 'while':
        return <WhileLoop />;
      case 'anidados':
        return <NestedLoops />;
      case 'estructuras':
        return <Arrays />;
      case 'funciones':
        return <Functions />;
      case 'explicacion-diagramas':
        return <DiagramExplanation />;
      default:
        return <Home onNavigate={setActiveSection} />;
    }
  };

  return (
    <Layout activeSection={activeSection} onNavigate={setActiveSection}>
      {renderSection()}
    </Layout>
  );
}

export default App;
