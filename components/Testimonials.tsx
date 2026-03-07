
import React, { useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from 'motion/react';

const reviews = [
  // Linha 1 (Direção Normal)
  {
    id: 1,
    name: "Ana Clara Silva",
    location: "São Paulo, SP",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    text: "Amei o serviço! Chegaram na hora e embalaram tudo com muito cuidado. A equipe é super educada. 😍",
    delay: "0s"
  },
  {
    id: 2,
    name: "Carlos Eduardo",
    location: "Rio de Janeiro, RJ",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    text: "Top dms! Resolveram a burocracia do condomínio rapidinho e carregaram tudo sem reclamar. Nota 10.",
    delay: "0s"
  },
  {
    id: 3,
    name: "Mariana Costa",
    location: "Belo Horizonte, MG",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    text: "Melhor mudança que já fiz. Preço justo e zero dor de cabeça. Recomendo pra todo mundo!",
    delay: "0s"
  },
  {
    id: 4,
    name: "Ricardo Mendes",
    location: "Curitiba, PR",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    text: "Profissionais msm. Nada quebrado, tudo organizado e o caminhão era novinho. 🚛",
    delay: "0s"
  },
  {
    id: 5,
    name: "Fernanda Alves",
    location: "Salvador, BA",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=150",
    text: "Atendimento nota 1000!! Ajudaram mto com a desmontagem do guarda-roupa.",
    delay: "0s"
  },
  {
    id: 6,
    name: "João Pedro",
    location: "Porto Alegre, RS",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
    text: "Recomendo de olhos fechados. Fui de SP pro Sul e chegou tudo intero. Serviço de primeira.", // Typo intero
    delay: "0s"
  },
  {
    id: 7,
    name: "Beatriz Lima",
    location: "Florianópolis, SC",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    text: "Mto rapido, fiquei impressionada com a agilidade dos meninos.", // Typo rapido
    delay: "0s"
  },
  {
    id: 8,
    name: "Paulo Roberto",
    location: "Brasília, DF",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    text: "Serviço de primeira. A frota é impecável e o rastreamento funciona mesmo.",
    delay: "0s"
  },
  {
    id: 9,
    name: "Juliana Santos",
    location: "Goiânia, GO",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
    text: "Pessoal educado e prestativo. Valeu cada centavo 🙌 Obrigada Rotta Brasil Express!",
    delay: "0s"
  },
  {
    id: 10,
    name: "Marcos Vinícius",
    location: "Recife, PE",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150",
    text: "Excelente empresa. Cumpriu o prazo certinho e o motorista foi super gente fina.",
    delay: "0s"
  },
  
  // Linha 2 (Reverse)
  {
    id: 11,
    name: "Larissa Dias",
    location: "Vitória, ES",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    text: "Tava com medo da cristaleira, mas embalaram perfeitamente. Chegou intacta! 🍷",
    delay: "0s"
  },
  {
    id: 12,
    name: "Rafael Souza",
    location: "Cuiabá, MT",
    image: "https://images.unsplash.com/photo-1522075469751-3a3694c60e9e?auto=format&fit=crop&q=80&w=150",
    text: "Agilidade total. Carregaram o caminhão num piscar de olhos. Profissionais dms.",
    delay: "0s"
  },
  {
    id: 13,
    name: "Camila Rocha",
    location: "Campo Grande, MS",
    image: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=150",
    text: "Obrigada a toda equipe! Vcs são show. Facilitaram minha vida na mudança.",
    delay: "0s"
  },
  {
    id: 14,
    name: "Bruno Ferreira",
    location: "Fortaleza, CE",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=150",
    text: "Tudo serto na entrega, nada a reclamar. Contrataria novamente com certeza.", // Typo serto
    delay: "0s"
  },
  {
    id: 15,
    name: "Patrícia Gomes",
    location: "Manaus, AM",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=150",
    text: "Muito organizados. O inventário digital ajuda demais a conferir tudo no final.",
    delay: "0s"
  },
  {
    id: 16,
    name: "Rodrigo Xavier",
    location: "Belém, PA",
    image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=150",
    text: "Show de bola. Atendimento via zap foi mt agil e tiraram todas as dúvidas.", // Typo agil
    delay: "0s"
  },
  {
    id: 17,
    name: "Vanessa Oliveira",
    location: "Natal, RN",
    image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&q=80&w=150",
    text: "5 estrelas é pouco. Fizeram um milagre caber tudo haha. Gratidão! 🙏",
    delay: "0s"
  },
  {
    id: 18,
    name: "Thiago Martins",
    location: "João Pessoa, PB",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150",
    text: "Honestidade e transparência. O valor do orçamento foi exatamente o cobrado.",
    delay: "0s"
  },
  {
    id: 19,
    name: "Amanda Ribeiro",
    location: "Maceió, AL",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
    text: "Adorei! ❤️ Equipe super simpática e cuidadosa com meus gatos durante a mudança.",
    delay: "0s"
  },
  {
    id: 20,
    name: "Felipe Nunes",
    location: "Aracaju, SE",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=150",
    text: "Mudança tranquila, sem estresse. A montagem dos móveis ficou perfeita.",
    delay: "0s"
  }
];

const ReviewCard: React.FC<{ review: typeof reviews[0] }> = ({ review }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  useAnimationFrame(() => {
    if (!cardRef.current) return;
    
    if (isHovered.current) {
      cardRef.current.style.transform = `perspective(1000px) translateZ(50px) rotateY(0deg) scale(1.05)`;
      cardRef.current.style.opacity = `1`;
      cardRef.current.style.zIndex = `50`;
      cardRef.current.style.filter = `blur(0px)`;
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();
    const center = window.innerWidth / 2;
    const cardCenter = rect.left + rect.width / 2;
    const distance = cardCenter - center;
    
    const maxDistance = window.innerWidth / 2;
    const normalizedDistance = Math.max(-1, Math.min(1, distance / maxDistance));
    
    const scale = 1 - Math.abs(normalizedDistance) * 0.15;
    const rotateY = normalizedDistance * 35; // Curvatura cilíndrica
    const translateZ = -Math.abs(normalizedDistance) * 150; 
    const rotateZ = window.innerWidth < 640 ? normalizedDistance * 5 : 0; // Leve inclinação no mobile
    
    cardRef.current.style.transform = `perspective(1000px) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
    let opacity = 1 - Math.abs(normalizedDistance) * 0.6;
    
    cardRef.current.style.setProperty('--distance-opacity', `${opacity}`);
    cardRef.current.style.zIndex = `20`;
  });

  return (
    <div 
      ref={cardRef}
      onMouseEnter={() => isHovered.current = true}
      onMouseLeave={() => isHovered.current = false}
      className="review-card flex-shrink-0 w-[240px] sm:w-[350px] p-4 sm:p-6 rounded-2xl bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-md transition-all duration-300 relative group/card cursor-pointer"
      style={{ opacity: 'var(--distance-opacity, 1)' }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-brand-gold/0 group-hover/card:bg-brand-gold/10 group-hover/card:shadow-[0_0_30px_rgba(245,130,32,0.4)] border border-transparent group-hover/card:border-brand-gold/60 transition-all duration-300 pointer-events-none"></div>
      
      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 relative z-10">
        <img 
          src={review.image} 
          alt={review.name} 
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-brand-gold/30"
        />
        <div>
          <h4 className="text-white font-bold text-xs sm:text-sm">{review.name}</h4>
          <p className="text-gray-400 text-[10px] sm:text-xs">{review.location}</p>
        </div>
        <div className="ml-auto flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="material-symbols-outlined text-brand-gold text-[10px] sm:text-sm fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          ))}
        </div>
      </div>
      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed italic relative z-10">"{review.text}"</p>
    </div>
  );
};

const MarqueeRow = ({ items, direction = 1 }: { items: any[], direction?: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const baseX = useMotionValue(direction === 1 ? -50 : 0);
  const velocity = useSpring(direction * 4, { damping: 50, stiffness: 400 });
  
  React.useEffect(() => {
    velocity.set(isHovered ? 0 : direction * 4);
  }, [isHovered, direction, velocity]);

  useAnimationFrame((t, delta) => {
    let moveBy = velocity.get() * (delta / 1000);
    let newX = baseX.get() + moveBy;
    if (direction === -1) {
      if (newX <= -50) newX += 50;
    } else {
      if (newX >= 0) newX -= 50;
    }
    baseX.set(newX);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  const duplicatedItems = [...items, ...items];

  return (
    <div 
      className="flex w-max group/marquee"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="flex gap-6 py-4" style={{ x }}>
        {duplicatedItems.map((item, idx) => (
           <ReviewCard key={`${item.id}-${idx}`} review={item} />
        ))}
      </motion.div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  // Dividir em duas linhas
  const row1 = reviews.slice(0, 10);
  const row2 = reviews.slice(10, 20);

  return (
    <section id="depoimentos" className="relative w-full py-16 sm:py-24 bg-[#050505] border-t border-white/5 overflow-hidden">
      <style>{`
        .group\\/marquee:hover .review-card:not(:hover) {
          opacity: calc(var(--distance-opacity, 1) * 0.3) !important;
          filter: blur(2px);
        }
      `}</style>

      {/* Background Padronizado (Preto + Mapa) */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
          alt="Malha Logística Background" 
          className="w-full h-full object-cover opacity-20 filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-[1920px] mx-auto">
        <div className="text-center mb-10 sm:mb-16 px-4">
          <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] sm:text-xs pl-1 block mb-3">Prova Social</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-overlay-shadow">
             O que dizem nossos <span className="text-brand-gold">Clientes</span>
          </h2>
        </div>

        {/* Gradientes Laterais para Suavizar a Entrada/Saída */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-20 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-20 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none"></div>

        <div className="flex flex-col gap-2 sm:gap-4 overflow-hidden" style={{ perspective: "1000px" }}>
          {/* Linha 1 */}
          <MarqueeRow items={row1} direction={-1} />

          {/* Linha 2 */}
          <MarqueeRow items={row2} direction={1} />
        </div>

        <div className="text-center mt-12 px-4 relative z-20">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-6 py-2 backdrop-blur-sm">
                <span className="text-green-500 font-bold text-lg">4.9/5</span>
                <span className="text-gray-400 text-xs uppercase tracking-wider">Média de avaliações no Google</span>
                <div className="flex -space-x-1">
                     <span className="material-symbols-outlined text-brand-gold text-sm fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                     <span className="material-symbols-outlined text-brand-gold text-sm fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                     <span className="material-symbols-outlined text-brand-gold text-sm fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                     <span className="material-symbols-outlined text-brand-gold text-sm fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                     <span className="material-symbols-outlined text-brand-gold text-sm fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
