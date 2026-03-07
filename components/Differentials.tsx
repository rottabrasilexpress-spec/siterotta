
import React from 'react';
import { motion } from 'motion/react';

const differentials = [
  {
    title: 'Frota Completa',
    description: 'Caminhões novos, higienizados e equipados com suspensão a ar e plataforma hidráulica para máxima segurança da carga.',
    image: 'https://a.imagem.app/GoMSbP.png'
  },
  {
    title: 'Embalagem Completa',
    description: 'Utilizamos materiais de alta tecnologia e proteção específica para obras de arte, cristais, eletrônicos e móveis delicados.',
    image: 'https://a.imagem.app/GoMh6l.png'
  },
  {
    title: 'Segurança Total',
    description: 'Monitoramento via satélite 24h e apólice de seguro completa para todos os itens transportados, garantindo sua tranquilidade do início ao fim.',
    image: 'https://a.imagem.app/GoMkES.png'
  },
  {
    title: 'Pontualidade Garantida',
    description: 'Respeitamos seu tempo. Cronograma ajustado com precisão e acompanhamento em tempo real da chegada da equipe.',
    image: 'https://a.imagem.app/GoMzNv.png'
  },
  {
    title: 'Equipe Especializada',
    description: 'Nada de terceirizados. Nossos profissionais são contratados, treinados e uniformizados, seguindo rigorosos protocolos de conduta.',
    image: 'https://a.imagem.app/GoMYr3.png'
  },
  {
    title: 'Inventário Digital',
    description: 'Controle total. Você recebe um catálogo digital detalhado de todos os itens embarcados no momento da coleta.',
    image: 'https://a.imagem.app/GoMeJ8.png'
  }
];

const DiffCard = ({ item, index }: { item: any, index: number }) => {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 hover:border-brand-gold/30 transition-all duration-500 rounded-3xl overflow-hidden flex flex-col min-h-[380px]"
    >
      {/* Image Header */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-brand-gold/10 mix-blend-overlay group-hover:bg-brand-gold/20 transition-colors duration-500"></div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 p-8 pt-2 flex flex-col flex-grow justify-between">
        {/* Large Background Number */}
        <div className="absolute top-0 right-4 pointer-events-none select-none transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-2 group-hover:-translate-x-2">
          <span className="text-[120px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/5 to-transparent leading-none">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-1 bg-brand-gold/30 group-hover:bg-brand-gold group-hover:w-20 transition-all duration-500 rounded-full"></div>
            <span className="text-brand-gold font-mono text-sm font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              0{index + 1}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-brand-gold transition-colors duration-300">{item.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed font-medium group-hover:text-gray-300 transition-colors duration-300">
            {item.description}
          </p>
        </div>
      </div>
      
      {/* Subtle Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/0 to-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </motion.div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 20 
    }
  }
} as const;

const Differentials: React.FC = () => {
  return (
    <section id="diferenciais" className="relative w-full py-24 bg-[#050505] border-t border-white/5 overflow-hidden">
      
      {/* Background Padronizado (Preto + Mapa) */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
          alt="Malha Logística Background" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-10 filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight text-overlay-shadow">
                Nossos <span className="text-brand-gold">Diferenciais</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                Elevamos o padrão de mudanças no Brasil. Cada detalhe é pensado para oferecer uma experiência exclusiva e sem preocupações.
            </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {differentials.map((item, index) => (
                <DiffCard key={index} item={item} index={index} />
            ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Differentials;
