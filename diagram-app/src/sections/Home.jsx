import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const Home = ({ onNavigate }) => {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
          <Sparkles size={14} />
          <span>Bienvenida</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Introducción a la <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Lógica de Programación</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Tu punto de partida en el mundo del código. Aprende, experimenta y visualiza cómo funciona la programación por dentro.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-secondary/50 border border-slate-800 rounded-2xl p-8 hover:border-primary/30 transition-colors">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">🎯</span>
            Objetivo del Laboratorio
          </h3>
          <p className="text-slate-400 leading-relaxed">
            Este laboratorio interactivo está diseñado para ayudarte a comprender los fundamentos de la lógica de programación de una manera visual y práctica. Aquí no solo escribirás código, sino que verás cómo funciona por dentro mediante simulaciones en tiempo real.
          </p>
        </div>

        <div className="bg-secondary/50 border border-slate-800 rounded-2xl p-8 hover:border-purple-500/30 transition-colors">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">⚡</span>
            ¿Qué puedes hacer?
          </h3>
          <p className="text-slate-400 leading-relaxed">
            En cada sección encontrarás un editor de código donde podrás escribir JavaScript real. Al ejecutarlo, verás animaciones que representan lo que ocurre en la memoria de la computadora o en el flujo del programa.
          </p>
        </div>
      </div>

      <div className="bg-secondary border border-slate-800 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-white mb-6">¿Qué encontrarás aquí?</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Variables', desc: 'Cómo se guardan los datos en memoria', id: 'variables', color: 'blue' },
            { title: 'Condicionales', desc: 'Toma de decisiones en el código', id: 'condicionales', color: 'green' },
            { title: 'Ciclos', desc: 'Repetición de tareas (For/While)', id: 'for', color: 'orange' },
            { title: 'Arrays', desc: 'Organización de datos complejos', id: 'estructuras', color: 'pink' },
            { title: 'Funciones', desc: 'Bloques de código reutilizables', id: 'funciones', color: 'indigo' },
            { title: 'Diagramas', desc: 'Diseño visual de algoritmos', id: 'diagrama', color: 'cyan' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="group text-left p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 transition-all"
            >
              <h4 className={`font-bold text-${item.color}-400 mb-1 group-hover:text-${item.color}-300`}>
                {item.title}
              </h4>
              <p className="text-sm text-slate-400 mb-3">{item.desc}</p>
              <div className="flex items-center text-xs font-medium text-slate-500 group-hover:text-white transition-colors">
                Explorar <ArrowRight size={12} className="ml-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
