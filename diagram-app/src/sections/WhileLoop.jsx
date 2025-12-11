import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { Play, RotateCcw, RotateCw } from 'lucide-react';

const defaultCode = `// 4. Ciclo While
// Repite MIENTRAS una condición sea verdadera

let energia = 3;

while (energia > 0) {
    // Visualiza: (condición verdadera, valor actual)
    animarCicloWhile(true, energia);
    console.log("Energía restante: " + energia);
    energia = energia - 1;
}

// Visualiza el final: (condición falsa, valor final)
animarCicloWhile(false, energia);
console.log("¡Sin energía!");`;

const WhileLoop = () => {
  const [code, setCode] = useState(defaultCode);
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState(null);

  const handleRun = () => {
    setSteps([]);
    setError(null);

    try {
      // Mock function to capture loop steps
      const animarCicloWhile = (condicion, valor) => {
        setSteps(prev => [...prev, { condicion, valor }]);
      };

      // Mock console.log
      const console = { log: () => {} };

      // Execute user code
      const runUserCode = new Function('animarCicloWhile', 'console', `
        try {
          ${code}
        } catch (e) {
          throw e;
        }
      `);

      runUserCode(animarCicloWhile, console);
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
        <div className="flex items-center gap-2 text-purple-400 mb-2">
          <RotateCw size={20} />
          <span className="font-bold uppercase tracking-wider text-sm">Concepto 04</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Ciclo While</h2>
        <p className="text-slate-400 mb-6">Repite acciones mientras se cumpla una condición.</p>

        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-slate-300 space-y-4 shadow-lg">
            <div>
                <h3 className="text-xl font-semibold text-white mb-2">¿Qué es un Ciclo While?</h3>
                <p className="leading-relaxed">
                    A diferencia del ciclo For (donde sabes cuántas veces repetir), el <strong>Ciclo While</strong> (Mientras) se usa cuando no sabes exactamente cuándo terminará la tarea, 
                    pero sí sabes qué condición debe cumplirse para continuar.
                </p>
            </div>
            
            <div>
                <p className="leading-relaxed">
                    Piensa en comer: sigues comiendo <strong>mientras</strong> tengas hambre. No sabes si serán 10 o 20 bocados, pero la condición es "tener hambre".
                    El ciclo se repite una y otra vez hasta que la condición se vuelve falsa.
                </p>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                    Ejemplo concreto:
                </h4>
                <div className="bg-slate-800 p-3 rounded border border-slate-700">
                    <div className="text-xs text-slate-500 uppercase mb-1 font-bold">Juego</div>
                    <code className="text-sm block font-mono text-slate-300">
                        <span className="text-purple-400">while</span> (vidas &gt; 0) {'{'}<br/>
                        &nbsp;&nbsp;jugarNivel();<br/>
                        &nbsp;&nbsp;<span className="text-slate-500">// Si pierdes, vidas disminuye</span><br/>
                        {'}'}<br/>
                        console.log(<span className="text-green-400">"Game Over"</span>);
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
            <span className="text-slate-300 font-medium text-sm">Verificación y Acción</span>
          </div>
          
          <div className="flex-1 p-6 bg-secondary/50 relative overflow-auto">
            {steps.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600">
                <RotateCw size={48} className="mb-4 opacity-20" />
                <p>Ejecuta el ciclo para ver el flujo</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-8 items-center justify-start content-start pt-4 pl-4">
                {steps.map((step, index) => {
                  const isLast = index === steps.length - 1;
                  return (
                    <div key={index} className="relative group">
                      {/* Diamond Shape */}
                      <div 
                        className={`
                          w-16 h-16 rotate-45 flex items-center justify-center border-2 transition-all duration-500 shadow-lg
                          ${step.condicion 
                            ? 'bg-green-900/20 border-green-500 text-green-400' 
                            : 'bg-red-900/20 border-red-500 text-red-400'
                          }
                          ${isLast ? 'scale-110 shadow-xl z-10' : 'scale-100 opacity-70'}
                        `}
                      >
                        {/* Content (Counter-rotated) */}
                        <span className="-rotate-45 font-bold text-lg">
                          {step.condicion ? step.valor : '🛑'}
                        </span>
                      </div>

                      {/* Connector Arrow */}
                      {index < steps.length - 1 && (
                        <div className="absolute top-1/2 left-full w-8 h-0.5 bg-slate-700 -translate-y-1/2 ml-1">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-slate-700 rotate-45"></div>
                        </div>
                      )}

                      {/* Label */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider font-sans text-slate-500 whitespace-nowrap">
                        {step.condicion ? 'Verdadero' : 'Falso'}
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

export default WhileLoop;
