import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { Play, RotateCcw, FunctionSquare, ArrowRight } from 'lucide-react';

const defaultCode = `// 7. Funciones
// Bloques de código reutilizables

function sumar(a, b) {
    let resultado = a + b;
    // Visualiza: (nombre, entradas, salida)
    animarFuncion("sumar", [a, b], resultado);
    return resultado;
}

sumar(5, 3);
sumar(10, 20);
sumar(-5, 8);`;

const Functions = () => {
  const [code, setCode] = useState(defaultCode);
  const [calls, setCalls] = useState([]);
  const [error, setError] = useState(null);

  const handleRun = () => {
    setCalls([]);
    setError(null);

    try {
      // Mock function to capture function calls
      const animarFuncion = (nombre, entradas, salida) => {
        setCalls(prev => [...prev, { nombre, entradas, salida }]);
      };

      // Mock console.log
      const console = { log: () => {} };

      // Execute user code
      const runUserCode = new Function('animarFuncion', 'console', `
        try {
          ${code}
        } catch (e) {
          throw e;
        }
      `);

      runUserCode(animarFuncion, console);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setCode(defaultCode);
    setCalls([]);
    setError(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto h-full flex flex-col">
      <header className="mb-6">
        <div className="flex items-center gap-2 text-indigo-400 mb-2">
          <FunctionSquare size={20} />
          <span className="font-bold uppercase tracking-wider text-sm">Concepto 07</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Funciones</h2>
        <p className="text-slate-400">Crea tus propias herramientas reutilizables.</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Editor Column */}
        <div className="flex flex-col bg-[#1e1e1e] rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-slate-700">
            <span className="text-slate-300 font-medium text-sm">Editor de Código</span>
            <div className="flex gap-2">
              <button 
                onClick={handleReset}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                title="Restablecer código"
              >
                <RotateCcw size={16} />
              </button>
              <button 
                onClick={handleRun}
                className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-md transition-colors"
              >
                <Play size={16} />
                Ejecutar
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto custom-scrollbar relative">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => highlight(code, languages.javascript)}
              padding={20}
              className="font-mono text-sm min-h-full"
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 14,
                backgroundColor: '#1e1e1e',
                color: '#d4d4d4',
              }}
            />
          </div>
          {error && (
            <div className="p-4 bg-red-900/20 border-t border-red-900/50 text-red-400 text-sm font-mono">
              Error: {error}
            </div>
          )}
        </div>

        {/* Visualization Column */}
        <div className="flex flex-col bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-xl">
          <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-800">
            <span className="text-slate-300 font-medium text-sm">Máquina de Procesamiento</span>
          </div>
          
          <div className="flex-1 p-6 bg-slate-900/50 relative overflow-auto space-y-6">
            {calls.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600">
                <FunctionSquare size={48} className="mb-4 opacity-20" />
                <p>Ejecuta una función para verla en acción</p>
              </div>
            ) : (
              calls.map((call, index) => (
                <div key={index} className="flex items-center gap-4 animate-in slide-in-from-left duration-500 fade-in">
                  {/* Input */}
                  <div className="flex flex-col items-center">
                    <div className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-300 font-mono text-sm mb-1">
                      {JSON.stringify(call.entradas)}
                    </div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Entrada</span>
                  </div>

                  {/* Arrow */}
                  <ArrowRight size={20} className="text-slate-600" />

                  {/* Machine */}
                  <div className="flex-1 bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-4 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                    <FunctionSquare size={24} className="text-indigo-400 mb-2" />
                    <span className="font-mono font-bold text-indigo-300">{call.nombre}()</span>
                  </div>

                  {/* Arrow */}
                  <ArrowRight size={20} className="text-slate-600" />

                  {/* Output */}
                  <div className="flex flex-col items-center">
                    <div className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-green-400 font-mono text-sm mb-1 font-bold">
                      {JSON.stringify(call.salida)}
                    </div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Salida</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Functions;
