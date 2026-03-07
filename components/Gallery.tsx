
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Maximize2, ChevronDown, Filter, ArrowUpRight, Camera, Truck, Package, Box, Home, X } from 'lucide-react';

const allWorks = [
  // Destaques (aparecem primeiro)
  {
    id: 1,
    url: 'https://a.imagem.app/GoMTna.png',
    category: 'Embalagem',
    title: 'Proteção Máxima',
    description: 'Embalagem cuidadosa com caixas reforçadas para máxima segurança.'
  },
  {
    id: 2,
    url: 'https://a.imagem.app/GoMFEC.png',
    category: 'Montagem',
    title: 'Desmontagem Técnica',
    description: 'Profissionais equipados para desmontar e montar móveis com precisão.'
  },
  {
    id: 3,
    url: 'https://a.imagem.app/GoM5JJ.png',
    category: 'Carga/Descarga',
    title: 'Manuseio Cuidadoso',
    description: 'Equipe treinada para carregar seus pertences com zelo e agilidade.'
  },
  {
    id: 4,
    url: 'https://a.imagem.app/GoMXOY.png',
    category: 'Veículos',
    title: 'Frota Completa',
    description: 'Caminhões e vans higienizados, prontos para qualquer tamanho de mudança.'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800',
    category: 'Montagem',
    title: 'Casa Pronta',
    description: 'Deixamos seus móveis montados e prontos para uso no novo lar.'
  },
  {
    id: 6,
    url: 'https://a.imagem.app/GoMqr9.png',
    category: 'Embalagem',
    title: 'Itens Frágeis',
    description: 'Técnicas especiais de proteção para louças, cristais e eletrônicos.'
  },
  // Galeria Completa
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1560448204-13103775b084?auto=format&fit=crop&q=80&w=800',
    category: 'Residencial',
    title: 'Novo Capítulo',
    description: 'Entendemos que uma mudança é o início de uma nova história.'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800',
    category: 'Veículos',
    title: 'Transporte Rodoviário',
    description: 'Segurança total no trajeto, seja local ou interestadual.'
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=800',
    category: 'Embalagem',
    title: 'Organização de Roupas',
    description: 'Transporte de vestuário mantendo a organização do seu closet.'
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1580901368919-7738ef31f9ea?auto=format&fit=crop&q=80&w=800',
    category: 'Carga/Descarga',
    title: 'Logística Vertical',
    description: 'Experiência em mudanças em prédios e locais de difícil acesso.'
  },
  {
    id: 11,
    url: 'https://images.unsplash.com/photo-1506306466983-a7bf7c54d193?auto=format&fit=crop&q=80&w=800',
    category: 'Veículos',
    title: 'Pontualidade',
    description: 'Rotas planejadas para garantir a chegada no horário combinado.'
  },
  {
    id: 12,
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
    category: 'Residencial',
    title: 'Ambientes',
    description: 'Cuidado extremo com pisos, paredes e áreas comuns do condomínio.'
  },
  {
    id: 13,
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=800',
    category: 'Embalagem',
    title: 'Setorização',
    description: 'Caixas identificadas por ambiente para facilitar a organização.'
  },
  {
    id: 14,
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    category: 'Montagem',
    title: 'Escritórios',
    description: 'Montagem rápida de estações de trabalho e mobiliário corporativo.'
  },
  {
    id: 15,
    url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
    category: 'Carga/Descarga',
    title: 'Equipe Dedicada',
    description: 'Profissionais comprometidos com a satisfação do cliente.'
  }
];

const categories = ['Todos', 'Residencial', 'Montagem', 'Embalagem', 'Carga/Descarga', 'Veículos'];

const Gallery: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const fullGalleryRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: horizontalScrollRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  // Apenas os 6 primeiros para a visualização inicial
  const previewWorks = allWorks.slice(0, 6);

  // Filtra itens para a galeria completa
  const filteredWorks = activeCategory === 'Todos' 
    ? allWorks 
    : allWorks.filter(work => work.category === activeCategory);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    // Pequeno delay para permitir que o DOM atualize a altura antes do scroll
    if (!isExpanded) {
        setTimeout(() => {
            fullGalleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
  };

  return (
    <section id="galeria" className="relative w-full bg-gradient-to-b from-[#0e1e3e] to-[#172a50] border-t border-white/5">
      
      {/* Horizontal Scroll Section */}
      <div ref={horizontalScrollRef} className="h-[300vh] relative">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-12">
            {/* Cabeçalho */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight text-overlay-shadow">
                    Nosso <span className="text-brand-gold">Trabalho</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                    Confira a qualidade técnica de nossos serviços, desde a embalagem até o transporte final.
                </p>
            </motion.div>
          </div>

          <motion.div style={{ x }} className="flex gap-4 sm:gap-6 px-4 sm:px-8 w-max">
            {previewWorks.map((work, index) => (
                <motion.div 
                    key={work.id} 
                    layoutId={`gallery-image-${work.id}`}
                    onClick={() => setSelectedImage(work)}
                    className="group relative h-[220px] w-[140px] sm:h-[300px] sm:w-[280px] md:h-[400px] md:w-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl flex-shrink-0"
                >
                    <img 
                        src={work.url} 
                        alt={work.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-75 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-3 sm:p-6 text-center border-2 border-transparent group-hover:border-brand-gold/30 rounded-2xl m-2 sm:m-4 transform scale-95 group-hover:scale-100">
                        <span className="text-brand-gold text-[8px] sm:text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2">{work.category}</span>
                        <h3 className="text-sm sm:text-2xl font-bold text-white mb-1 sm:mb-3">{work.title}</h3>
                        <p className="text-gray-300 text-[10px] sm:text-sm leading-tight sm:leading-relaxed hidden sm:block">{work.description}</p>
                    </div>
                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 group-hover:opacity-0 transition-opacity duration-300">
                        <span className="text-brand-gold text-[10px] sm:text-xs font-bold uppercase tracking-wider block mb-1">{work.category}</span>
                        <h4 className="text-white font-bold text-sm sm:text-xl">{work.title}</h4>
                    </div>
                </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Lightbox Fluida */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div 
              layoutId={`gallery-image-${selectedImage.id}`}
              className="relative max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain bg-black"
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-brand-gold text-white hover:text-brand-dark rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
              >
                <X size={24} />
              </button>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-8">
                <span className="text-brand-gold text-sm font-bold uppercase tracking-widest mb-2 block">{selectedImage.category}</span>
                <h3 className="text-3xl font-bold text-white mb-2">{selectedImage.title}</h3>
                <p className="text-gray-300 text-lg max-w-2xl">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
