import React from 'react';
import { BookOpen } from 'lucide-react';

const DiagramExplanation = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
          <BookOpen size={14} />
          <span>Referencia Visual</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          ¿Qué es un Diagrama de Flujo?
        </h1>
        <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-8">
          Es un lenguaje visual universal (Estándar ISO 5807) que permite representar algoritmos de forma gráfica. 
          Antes de escribir una sola línea de código, los programadores usan estos diagramas para planear la lógica.
        </p>

        <div className="max-w-4xl mx-auto bg-slate-800/50 p-8 rounded-2xl border border-slate-700 text-left shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">¿Por qué son tan importantes?</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        Imagina que quieres construir una casa. No empiezas poniendo ladrillos al azar; primero haces un <strong>plano</strong>. 
                        Un diagrama de flujo es exactamente eso: el plano de tu programa.
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                        Te permite visualizar el camino que seguirán los datos, identificar posibles errores de lógica (bugs) antes de que ocurran 
                        y comunicar tus ideas a otros programadores sin importar qué lenguaje de programación usen (Python, Java, C++, etc.).
                    </p>
                </div>
                <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/50">
                    <h4 className="font-semibold text-white mb-3">Beneficios clave:</h4>
                    <ul className="space-y-3 text-slate-400">
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span><strong>Claridad:</strong> Convierte procesos complejos en pasos simples.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span><strong>Universalidad:</strong> Se entiende en cualquier idioma.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span><strong>Depuración:</strong> Ayuda a encontrar "callejones sin salida" en tu lógica.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Inicio / Fin */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:-translate-y-2 transition-transform duration-300 group">
          <div className="h-32 bg-slate-50 border-b border-slate-100 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
            <div className="px-6 py-2 bg-white border-2 border-slate-800 rounded-full font-bold text-slate-800 shadow-sm group-hover:scale-110 group-hover:shadow-primary/20 group-hover:border-primary group-hover:text-primary transition-all duration-300">
              INICIO
            </div>
          </div>
          <div className="p-6">
            <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-3">
              Terminal
            </span>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Inicio / Fin</h3>
            <p className="text-sm text-slate-600 mb-4">
              Marca los límites absolutos de tu algoritmo. Todo programa necesita saber dónde empezar y dónde terminar.
            </p>
            <div className="bg-slate-100 rounded p-3 text-xs font-mono text-slate-500 border border-slate-200">
              // No tiene código directo,<br/>
              // representa el archivo entero.
            </div>
          </div>
        </div>

        {/* Proceso */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:-translate-y-2 transition-transform duration-300 group">
          <div className="h-32 bg-slate-50 border-b border-slate-100 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
            <div className="px-6 py-3 bg-white border-2 border-slate-800 font-bold text-slate-800 shadow-sm group-hover:scale-105 group-hover:border-slate-600 transition-all duration-300">
              x = x + 1
            </div>
          </div>
          <div className="p-6">
            <span className="inline-block px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider mb-3">
              Proceso
            </span>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Acción / Cálculo</h3>
            <p className="text-sm text-slate-600 mb-4">
              Representa una operación interna. Aquí ocurren las matemáticas y las asignaciones.
            </p>
            <div className="bg-slate-100 rounded p-3 text-xs font-mono text-slate-500 border border-slate-200">
              let vidas = 3;<br/>
              puntos = puntos + 100;
            </div>
          </div>
        </div>

        {/* Entrada / Salida */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:-translate-y-2 transition-transform duration-300 group">
          <div className="h-32 bg-slate-50 border-b border-slate-100 flex items-center justify-center group-hover:bg-yellow-50 transition-colors">
            <div className="px-6 py-3 bg-white border-2 border-slate-800 font-bold text-slate-800 shadow-sm -skew-x-12 group-hover:scale-110 group-hover:bg-yellow-50 group-hover:border-yellow-600 group-hover:text-yellow-800 transition-all duration-300">
              <span className="skew-x-12 inline-block">Leer Nombre</span>
            </div>
          </div>
          <div className="p-6">
            <span className="inline-block px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase tracking-wider mb-3">
              E / S
            </span>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Entrada / Salida</h3>
            <p className="text-sm text-slate-600 mb-4">
              Comunicación con el exterior. Entrada (Teclado) o Salida (Pantalla).
            </p>
            <div className="bg-slate-100 rounded p-3 text-xs font-mono text-slate-500 border border-slate-200">
              let nombre = prompt();<br/>
              console.log(nombre);
            </div>
          </div>
        </div>

        {/* Decisión */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:-translate-y-2 transition-transform duration-300 group">
          <div className="h-32 bg-slate-50 border-b border-slate-100 flex items-center justify-center group-hover:bg-green-50 transition-colors">
            <div className="w-16 h-16 bg-white border-2 border-slate-800 rotate-45 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-green-50 group-hover:border-green-600 group-hover:text-green-700 transition-all duration-300">
              <span className="-rotate-45 font-bold text-xl">?</span>
            </div>
          </div>
          <div className="p-6">
            <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider mb-3">
              Decisión
            </span>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Condicional</h3>
            <p className="text-sm text-slate-600 mb-4">
              Evalúa una pregunta de Sí o No. El flujo toma un camino diferente según la respuesta.
            </p>
            <div className="bg-slate-100 rounded p-3 text-xs font-mono text-slate-500 border border-slate-200">
              if (edad &gt;= 18) &#123;<br/>
              &nbsp;&nbsp;// Camino Sí<br/>
              &#125; else &#123; ... &#125;
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DiagramExplanation;
