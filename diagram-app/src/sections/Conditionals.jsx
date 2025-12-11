import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { Play, RotateCcw, Split } from 'lucide-react';

const defaultCode = `// 1. Define una condición
let edad = 18;

// 2. Toma una decisión
if (edad >= 18) {
    animarCondicional(true, "edad >= 18");
    console.log("Es mayor de edad");
} else {
    animarCondicional(false, "edad >= 18");
    console.log("Es menor de edad");
}`;

const Conditionals = () => {
  const [code, setCode] = useState(defaultCode);
  const [executionStep, setExecutionStep] = useState(null); // null, 'true', 'false'
  const [conditionText, setConditionText] = useState("Condición");
  const [error, setError] = useState(null);

  const handleRun = () => {
    setExecutionStep(null);
    setError(null);

    try {
      // Mock function to capture conditional logic
      const animarCondicional = (condicion, texto) => {
        setConditionText(texto || "Condición");
        setExecutionStep(condicion ? 'true' : 'false');
      };

      // Mock console.log to avoid errors if user uses it
      const console = { log: () => {} };

      // Execute user code
      const runUserCode = new Function('animarCondicional', 'console', `
        try {
          ${code}
        } catch (e) {
          throw e;
        }
      `);

      runUserCode(animarCondicional, console);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setCode(defaultCode);
    setExecutionStep(null);
    setConditionText("Condición");
    setError(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto h-full flex flex-col">
      <header className="mb-6">
        <div className="flex items-center gap-2 text-green-400 mb-2">
          <Split size={20} />
          <span className="font-bold uppercase tracking-wider text-sm">Concepto 02</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Condicionales</h2>
        <p className="text-slate-400 mb-6">Entiende cómo los programas toman decisiones (If / Else).</p>

        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-slate-300 space-y-4 shadow-lg">
            <div>
                <h3 className="text-xl font-semibold text-white mb-2">¿Qué son los condicionales?</h3>
                <p className="leading-relaxed">
                    En la vida real, tomamos decisiones todo el tiempo basándonos en situaciones: "Si llueve, llevo paraguas", "Si tengo hambre, como algo". 
                    Los condicionales permiten que nuestros programas hagan exactamente lo mismo: tomar decisiones.
                </p>
            </div>
            
            <div>
                <p className="leading-relaxed">
                    La estructura más común es el <strong>if / else</strong> (si / si no). Funciona como una bifurcación en el camino: 
                    el programa evalúa una pregunta (condición) que puede ser verdadera o falsa. Si es verdadera, toma un camino; si es falsa, puede tomar otro.
                </p>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                    Ejemplos concretos:
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-3 rounded border border-slate-700">
                        <div className="text-xs text-slate-500 uppercase mb-1 font-bold">Ejemplo 1: Clima</div>
                        <code className="text-sm block font-mono">
                            <span className="text-purple-400">if</span> (estaLloviendo) {'{'}<br/>
                            &nbsp;&nbsp;usarParaguas();<br/>
                            {'}'} <span className="text-purple-400">else</span> {'{'}<br/>
                            &nbsp;&nbsp;usarGafasDeSol();<br/>
                            {'}'}
                        </code>
                    </div>
                    <div className="bg-slate-800 p-3 rounded border border-slate-700">
                        <div className="text-xs text-slate-500 uppercase mb-1 font-bold">Ejemplo 2: Acceso</div>
                        <code className="text-sm block font-mono">
                            <span className="text-purple-400">if</span> (edad &gt;= 18) {'{'}<br/>
                            &nbsp;&nbsp;permitirEntrada();<br/>
                            {'}'} <span className="text-purple-400">else</span> {'{'}<br/>
                            &nbsp;&nbsp;denegarEntrada();<br/>
                            {'}'}
                        </code>
                    </div>
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
            <span className="text-slate-300 font-medium text-sm">Flujo del Programa</span>
          </div>
          
          <div className="flex-1 p-6 bg-secondary/50 relative overflow-auto flex items-center justify-center">
            {!executionStep ? (
              <div className="flex flex-col items-center justify-center text-slate-600">
                <Split size={48} className="mb-4 opacity-20" />
                <p>Ejecuta el código para ver la decisión</p>
              </div>
            ) : (
              <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                {/* Start Node */}
                <div className="px-4 py-2 bg-slate-700 rounded-full text-slate-300 text-sm font-mono mb-2 border border-slate-600">
                  Inicio
                </div>
                
                {/* Connector */}
                <div className="h-8 w-0.5 bg-slate-600"></div>

                {/* Condition Label */}
                <div className="text-xs text-slate-400 mb-1 font-mono bg-secondary px-2 py-0.5 rounded border border-slate-800">
                  {conditionText}
                </div>

                {/* Decision Diamond */}
                <div className="w-24 h-24 bg-yellow-500/10 border-2 border-yellow-500/50 rotate-45 flex items-center justify-center mb-8 relative z-10">
                  <span className="-rotate-45 text-yellow-500 font-bold text-xl">?</span>
                </div>

                {/* Branches Container */}
                <div className="flex gap-16 relative -mt-8 pt-8">
                  {/* True Branch */}
                  <div className={`flex flex-col items-center transition-opacity duration-500 ${executionStep === 'true' ? 'opacity-100' : 'opacity-30 grayscale'}`}>
                    {/* Line from Diamond */}
                    <div className="absolute top-0 left-1/2 w-[calc(50%+2px)] h-0.5 bg-slate-600 -translate-x-full origin-right -translate-y-[2px]" style={{ transform: 'translateX(-50%) rotate(0deg)' }}></div>
                    <div className="absolute top-0 left-[calc(50%-4rem)] w-0.5 h-8 bg-slate-600"></div>
                    
                    <span className="text-xs font-bold text-green-400 mb-2 mt-8">VERDADERO</span>
                    <div className="h-8 w-0.5 border-l-2 border-dashed border-green-500/50"></div>
                    <div className="px-4 py-3 bg-green-900/20 border border-green-500/50 rounded text-green-300 text-sm font-mono shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                      Ejecutar Bloque IF
                    </div>
                  </div>

                  {/* False Branch */}
                  <div className={`flex flex-col items-center transition-opacity duration-500 ${executionStep === 'false' ? 'opacity-100' : 'opacity-30 grayscale'}`}>
                    {/* Line from Diamond */}
                    <div className="absolute top-0 right-1/2 w-[calc(50%+2px)] h-0.5 bg-slate-600 translate-x-full origin-left -translate-y-[2px]" style={{ transform: 'translateX(50%) rotate(0deg)' }}></div>
                    <div className="absolute top-0 right-[calc(50%-4rem)] w-0.5 h-8 bg-slate-600"></div>

                    <span className="text-xs font-bold text-red-400 mb-2 mt-8">FALSO</span>
                    <div className="h-8 w-0.5 border-l-2 border-dashed border-red-500/50"></div>
                    <div className="px-4 py-3 bg-red-900/20 border border-red-500/50 rounded text-red-300 text-sm font-mono shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                      Ejecutar Bloque ELSE
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conditionals;
