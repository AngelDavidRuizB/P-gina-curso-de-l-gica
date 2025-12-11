import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { Play, RotateCcw, Repeat } from 'lucide-react';

const defaultCode = `// 3. Ciclo For
// Repite una acción un número determinado de veces

for (let i = 0; i < 5; i++) {
    // ¡Visualiza cada paso!
    animarCicloFor(i, 5);
    console.log("Iteración número: " + i);
}`;

const ForLoop = () => {
  const [code, setCode] = useState(defaultCode);
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState(null);

  const handleRun = () => {
    setSteps([]);
    setError(null);

    try {
      // Mock function to capture loop steps
      const animarCicloFor = (i, total) => {
        setSteps(prev => [...prev, { i, total }]);
      };

      // Mock console.log
      const console = { log: () => {} };

      // Execute user code
      const runUserCode = new Function('animarCicloFor', 'console', `
        try {
          ${code}
        } catch (e) {
          throw e;
        }
      `);

      runUserCode(animarCicloFor, console);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setCode(defaultCode);
    setSteps([]);
    setError(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto h-full flex flex-col">
      <header className="mb-6">
        <div className="flex items-center gap-2 text-orange-400 mb-2">
          <Repeat size={20} />
          <span className="font-bold uppercase tracking-wider text-sm">Concepto 03</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Ciclo For</h2>
        <p className="text-slate-400 mb-6">Domina la repetición de tareas controlada.</p>

        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-slate-300 space-y-4 shadow-lg">
            <div>
                <h3 className="text-xl font-semibold text-white mb-2">¿Qué es un Ciclo For?</h3>
                <p className="leading-relaxed">
                    Imagina que tienes que dar 5 vueltas a una cancha. Sabes exactamente cuántas vueltas son: 1, 2, 3, 4 y 5. 
                    El <strong>Ciclo For</strong> es la herramienta perfecta para situaciones donde sabes de antemano cuántas veces quieres repetir una acción.
                </p>
            </div>
            
            <div>
                <p className="leading-relaxed">
                    Tiene 3 partes clave que funcionan como un contador:
                </p>
                <ol className="list-decimal list-inside mt-2 space-y-1 ml-2 text-slate-400">
                    <li><strong>Inicio:</strong> Donde empieza el contador (ej: <code className="text-orange-400">let i = 0</code>).</li>
                    <li><strong>Condición:</strong> Hasta cuándo sigue (ej: <code className="text-orange-400">i &lt; 5</code>).</li>
                    <li><strong>Actualización:</strong> Cómo cambia en cada paso (ej: <code className="text-orange-400">i++</code>, que significa sumar 1).</li>
                </ol>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                    Ejemplo concreto:
                </h4>
                <div className="bg-slate-800 p-3 rounded border border-slate-700">
                    <div className="text-xs text-slate-500 uppercase mb-1 font-bold">Contar hasta 5</div>
                    <code className="text-sm block font-mono text-slate-300">
                        <span className="text-purple-400">for</span> (let i = 1; i &lt;= 5; i++) {'{'}<br/>
                        &nbsp;&nbsp;console.log(<span className="text-green-400">"Vuelta número: "</span> + i);<br/>
                        {'}'}
                    </code>
                </div>
            </div>
        </div>
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
        <div className="flex flex-col bg-secondary rounded-xl overflow-hidden border border-slate-800 shadow-xl">
          <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-800">
            <span className="text-slate-300 font-medium text-sm">Pista de Iteraciones</span>
          </div>
          
          <div className="flex-1 p-6 bg-secondary/50 relative overflow-auto">
            {steps.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600">
                <Repeat size={48} className="mb-4 opacity-20" />
                <p>Ejecuta el ciclo para ver los pasos</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4 items-center justify-start content-start">
                {steps.map((step, index) => {
                  const isLast = index === steps.length - 1;
                  return (
                    <div 
                      key={index}
                      className={`
                        relative w-16 h-16 flex items-center justify-center rounded-xl font-mono text-xl font-bold border-2 transition-all duration-500
                        ${isLast 
                          ? 'bg-orange-500 text-white border-orange-400 scale-110 shadow-[0_0_20px_rgba(249,115,22,0.4)] z-10' 
                          : 'bg-slate-800 text-slate-500 border-slate-700 scale-100'
                        }
                      `}
                    >
                      {step.i}
                      
                      {/* Connector Line (except for first item) */}
                      {index > 0 && (
                        <div className="absolute right-full top-1/2 w-4 h-0.5 bg-slate-700 -mr-0.5"></div>
                      )}
                      
                      {/* Step Label */}
                      <div className={`absolute -bottom-6 text-[10px] uppercase tracking-wider font-sans ${isLast ? 'text-orange-400' : 'text-slate-600'}`}>
                        Paso {index + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForLoop;
