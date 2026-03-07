import React from 'react';

const RealSimulation: React.FC = () => {
  return (
    <section id="simulacao" className="relative w-full bg-gradient-to-b from-[#0e1e3e] to-[#172a50] py-24 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-gold/5 blur-[120px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-brand-gold text-xs font-bold uppercase tracking-[0.3em] mb-6 border border-brand-gold/30 rounded-full px-4 py-1 backdrop-blur-sm">
            Demonstração Interativa
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter">
            Cotação Inteligente{' '}
            <span className="text-brand-gold">na palma da mão</span>
          </h2>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            Veja como é simples e rápido cotar sua mudança diretamente pelo celular, em menos de 2 minutos.
          </p>
        </div>
        <div className="flex justify-center items-center mt-8">
          <div className="relative w-[285px] h-[615px] md:w-[342px] md:h-[738px] lg:w-[380px] lg:h-[820px] transition-all duration-300">
            <iframe
              src="/simulation.html"
              className="absolute top-0 left-0 w-[380px] h-[820px] border-none bg-transparent origin-top-left pointer-events-auto transition-transform duration-300 scale-[0.75] md:scale-[0.9] lg:scale-100"
              title="Simulação iPhone - Rotta Brasil Express"
              scrolling="no"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealSimulation;
