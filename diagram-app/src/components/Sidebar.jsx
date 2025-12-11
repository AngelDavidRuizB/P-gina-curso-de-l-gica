import React from 'react';
import logo from '../assets/logo.jpeg';
import { 
  Home, 
  Box, 
  Split, 
  Repeat, 
  RotateCw, 
  Layers, 
  Grid, 
  FunctionSquare, 
  BookOpen, 
  Network 
} from 'lucide-react';

const menuItems = [
  { id: 'inicio', label: 'Inicio', icon: Home },
  { id: 'variables', label: '1. Variables', icon: Box },
  { id: 'condicionales', label: '2. Condicionales', icon: Split },
  { id: 'for', label: '3. Ciclo For', icon: Repeat },
  { id: 'while', label: '4. Ciclo While', icon: RotateCw },
  { id: 'anidados', label: '5. Ciclos Anidados', icon: Layers },
  { id: 'estructuras', label: '6. Arrays', icon: Grid },
  { id: 'funciones', label: '7. Funciones', icon: FunctionSquare },
  { id: 'explicacion-diagramas', label: '8. Explicación Diagramas', icon: BookOpen },
  { id: 'diagrama', label: '9. Generar diagrama', icon: Network },
];

const Sidebar = ({ activeSection, onNavigate }) => {
  return (
    <aside className="w-64 bg-secondary border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 z-10">
      <div className="h-24 border-b border-slate-800 flex items-center justify-center p-4 bg-black/20">
        <img 
          src={logo} 
          alt="Logo Institucional" 
          className="h-full w-auto object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300 rounded-lg" 
        />
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-white' : 'text-slate-500'} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-lg p-3">
          <p className="text-xs text-slate-500 text-center">
            © 2024 Unidad de Informática
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
