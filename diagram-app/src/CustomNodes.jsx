import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const NodeBase = "px-4 py-3 shadow-lg text-sm font-medium text-center min-w-[150px] flex items-center justify-center transition-transform hover:scale-105 duration-200";

export const StartEndNode = memo(({ data }) => {
  return (
    <div className={`${NodeBase} rounded-full bg-gradient-to-r from-slate-700 to-slate-800 text-white border-2 border-slate-600`}>
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-none" />
      <span className="font-bold tracking-wide">{data.label}</span>
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-none" />
    </div>
  );
});

export const ProcessNode = memo(({ data }) => {
  return (
    <div className={`${NodeBase} bg-white border border-slate-200 rounded-lg text-slate-700`}>
      <Handle type="target" position={Position.Top} className="!bg-slate-400 !w-3 !h-3" />
      <div className="font-mono text-xs">{data.label}</div>
      <Handle type="source" position={Position.Bottom} className="!bg-slate-400 !w-3 !h-3" />
    </div>
  );
});

export const IONode = memo(({ data }) => {
  return (
    <div className="relative group">
      <div 
        className={`${NodeBase} bg-amber-50 border border-amber-200 text-amber-900`} 
        style={{ transform: 'skewX(-20deg)', borderRadius: '4px' }}
      >
        <div style={{ transform: 'skewX(20deg)' }} className="font-mono text-xs">
          {data.label}
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="!bg-amber-400 !w-3 !h-3" />
      <Handle type="source" position={Position.Bottom} className="!bg-amber-400 !w-3 !h-3" />
    </div>
  );
});

export const DecisionNode = memo(({ data }) => {
  return (
    <div className="relative w-[140px] h-[100px] flex items-center justify-center group">
      {/* Diamond Shape */}
      <div 
        className="absolute inset-0 bg-indigo-50 border-2 border-indigo-200 shadow-md transition-colors group-hover:border-indigo-400"
        style={{ transform: 'rotate(45deg) scale(0.7)', borderRadius: '8px' }}
      >
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-indigo-900 font-bold text-xs px-2 text-center max-w-[100px] leading-tight">
        {data.label}
      </div>
      
      <Handle type="target" position={Position.Top} className="!bg-indigo-500 !w-3 !h-3 -mt-2" />
      
      {/* Salida True (Derecha) */}
      <Handle 
        type="source" 
        position={Position.Right} 
        id="true"
        className="!bg-emerald-500 !w-3 !h-3 -mr-2" 
      />
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-[10px] font-bold text-emerald-600 bg-white/80 px-1.5 py-0.5 rounded border border-emerald-100 shadow-sm">SÍ</div>

      {/* Salida False (Izquierda) */}
      <Handle 
        type="source" 
        position={Position.Left} 
        id="false"
        className="!bg-rose-500 !w-3 !h-3 -ml-2" 
      />
      <div className="absolute -left-10 top-1/2 -translate-y-1/2 text-[10px] font-bold text-rose-600 bg-white/80 px-1.5 py-0.5 rounded border border-rose-100 shadow-sm">NO</div>
    </div>
  );
});
