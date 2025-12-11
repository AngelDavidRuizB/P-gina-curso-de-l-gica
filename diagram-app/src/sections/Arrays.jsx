import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { Play, RotateCcw, Grid } from 'lucide-react';

const defaultCode = `// 6. Arrays (Arreglos)
// Listas ordenadas de datos

let frutas = ["Manzana", "Banana", "Cereza"];

// Visualiza el array completo
animarArray(frutas);

// Modifica un elemento
frutas[1] = "Uva";
animarArray(frutas);

// Agrega un elemento
frutas.push("Naranja");
animarArray(frutas);`;

const Arrays = () => {
  const [code, setCode] = useState(defaultCode);
  const [snapshots, setSnapshots] = useState([]);
  const [error, setError] = useState(null);

  const handleRun = () => {
    setSnapshots([]);
    setError(null);

    try {
      // Mock function to capture array states
      const animarArray = (arr) => {
        // Deep copy the array to capture state at this moment
        setSnapshots(prev => [...prev, JSON.parse(JSON.stringify(arr))]);
      };

      // Mock console.log
      const console = { log: () => {} };

      // Execute user code
      const runUserCode = new Function('animarArray', 'console', `
        try {
          ${code}
        } catch (e) {
          throw e;
        }
      `);

      runUserCode(animarArray, console);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setCode(defaultCode);
    setSnapshots([]);
    setError(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto h-full flex flex-col">
      <header className="mb-6">
        <div className="flex items-center gap-2 text-cyan-400 mb-2">
          <Grid size={20} />
          <span className="font-bold uppercase tracking-wider text-sm">Concepto 06</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Arrays</h2>
        <p className="text-slate-400">Organiza colecciones de datos en una sola variable.</p>
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
            <span className="text-slate-300 font-medium text-sm">Visualización de Arrays</span>
          </div>
          
          <div className="flex-1 p-6 bg-slate-900/50 relative overflow-auto space-y-8">
            {snapshots.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600">
                <Grid size={48} className="mb-4 opacity-20" />
                <p>Ejecuta el código para ver los arrays</p>
              </div>
            ) : (
              snapshots.map((arr, snapIndex) => (
                <div key={snapIndex} className="animate-in slide-in-from-left duration-500 fade-in">
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2">
                    Estado {snapIndex + 1}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {arr.map((item, index) => (
                      <div key={index} className="flex flex-col items-center group">
                        <div className="h-12 min-w-[3rem] px-3 flex items-center justify-center bg-slate-800 border border-slate-700 rounded-lg text-cyan-300 font-mono shadow-sm group-hover:border-cyan-500/50 group-hover:bg-slate-800/80 transition-all">
                          {typeof item === 'string' ? `"${item}"` : item}
                        </div>
                        <div className="mt-1 text-[10px] text-slate-600 font-mono group-hover:text-cyan-500/70 transition-colors">
                          [{index}]
                        </div>
                      </div>
                    ))}
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

export default Arrays;
