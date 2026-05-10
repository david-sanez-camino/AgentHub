import React from 'react';

const AgentCard = ({ name, description, icon, tag }) => {
  return (
    <div className="group relative p-8 rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-xl hover:bg-white/15 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 overflow-hidden">
      {/* Glow effect on hover */}
      <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <span className="material-symbols-outlined text-[#136dec] text-4xl p-2 bg-blue-500/10 rounded-xl">
            {icon}
          </span>
          {tag && (
            <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
              {tag}
            </span>
          )}
        </div>
        
        <h4 className="font-bold text-2xl mb-3 text-white tracking-tight group-hover:text-blue-400 transition-colors">
          {name}
        </h4>
        
        <p className="text-slate-200 text-base leading-relaxed font-medium">
          {description}
        </p>
        
        <div className="mt-6 flex items-center text-xs font-bold text-[#136dec] opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
          EXPLORAR AGENTE 
          <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
