import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  applyEdgeChanges, 
  applyNodeChanges,
  addEdge,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

// Code Editor
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; // Dark theme

import { StartEndNode, ProcessNode, IONode, DecisionNode } from './CustomNodes';
import { parseCodeToFlow } from './FlowParser';

const nodeTypes = {
  startEnd: StartEndNode,
  process: ProcessNode,
  io: IONode,
  decision: DecisionNode,
};

const defaultCode = `// Tu algoritmo aquí
let edad = 18;

if (edad >= 18) {
  console.log("Es mayor");
} else {
  console.log("Es menor");
}

console.log("Fin");`;

function App() {
  const [code, setCode] = useState(defaultCode);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const handleGenerate = () => {
    try {
      const { nodes: layoutedNodes, edges: layoutedEdges } = parseCodeToFlow(code);
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
      
      // Scroll suave hacia el diagrama
      setTimeout(() => {
        document.getElementById('diagram-view')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error("Error parsing code:", error);
    }
  };

  // Generate on mount
  useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-slate-900">
      {/* Editor Panel */}
      <div className="w-full h-[90vh] flex-shrink-0 flex flex-col border-b border-slate-700 bg-[#1e1e1e] shadow-2xl z-20">
        {/* Header */}
        <div className="h-12 flex items-center px-4 bg-[#252526] border-b border-slate-700">
          <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
            <span className="text-yellow-400">JS</span>
            <span>script.js</span>
          </div>
        </div>

        {/* Editor Area */}
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
            textareaClassName="focus:outline-none"
          />
        </div>
        
        {/* Footer / Actions */}
        <div className="p-4 bg-[#252526] border-t border-slate-700">
          <button
            onClick={handleGenerate}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Generar Diagrama
          </button>
          <p className="text-xs text-slate-500 mt-2 text-center">
            Soporta: variables, if/else, while, console.log
          </p>
        </div>
      </div>

      {/* Diagram Panel */}
      <div id="diagram-view" className="w-full h-screen relative bg-slate-50">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={{
            type: 'smoothstep',
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#64748b',
            },
            style: { stroke: '#64748b', strokeWidth: 2 },
            animated: true,
          }}
          fitView
          attributionPosition="bottom-right"
          className="bg-slate-50"
        >
          <Background color="#94a3b8" gap={25} size={1} variant="dots" />
          <Controls className="bg-white border-slate-200 shadow-xl text-slate-600 rounded-lg overflow-hidden" />
        </ReactFlow>
        
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 text-xs font-medium text-slate-500 pointer-events-none select-none">
          Vista Previa
        </div>
      </div>
    </div>
  );
}

export default App;
