
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: "Quanto tempo antes devo agendar minha mudança?",
    answer: "Recomendamos agendar com pelo menos 1 a 2 semanas de antecedência para garantir a data desejada, especialmente se for no final do mês ou finais de semana."
  },
  {
    question: "Vocês fornecem as caixas e embalagens?",
    answer: "Sim! Podemos fornecer todo o material necessário. Se contratar o serviço de 'Embaladores' (Passo 3), nossa equipe leva e embala tudo para você no dia."
  },
  {
    question: "Meus itens possuem seguro durante o transporte?",
    answer: "Com certeza. Todas as nossas mudanças são cobertas por uma apólice de seguro completa contra avarias, roubos ou acidentes durante todo o trajeto."
  },
  {
    question: "Como é calculado o orçamento?",
    answer: "O valor baseia-se na distância entre os endereços, volume total dos itens (inventário), necessidade de serviços extras (montagem/embalagem) e dificuldade de acesso (escadas/elevador)."
  },
  {
    question: "Vocês realizam desmontagem e montagem de móveis?",
    answer: "Sim, possuímos marceneiros especializados na equipe. Basta selecionar as opções 'Desmontagem' e 'Montagem' durante o preenchimento do formulário."
  },
  {
    question: "Quais as formas de pagamento aceitas?",
    answer: "Aceitamos cartões de crédito em até 12x, PIX com desconto à vista e boleto bancário (mediante aprovação prévia para empresas)."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
} as const;

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full py-12 sm:py-20 bg-gradient-to-b from-[#0e1e3e] to-[#172a50] border-t border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Discreto */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-brand-gold font-bold uppercase tracking-[0.2em] text-[10px]">Tire suas dúvidas</span>
          <h2 className="text-xl sm:text-3xl font-bold text-white mt-2">Perguntas Frequentes</h2>
        </motion.div>

        {/* Lista Acordeão */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-3"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'bg-white/5 border-brand-gold/30 shadow-lg' 
                    : 'bg-transparent border-white/10 hover:bg-white/5 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none group"
                >
                  <span className={`text-sm sm:text-base font-medium transition-colors duration-300 ${isOpen ? 'text-brand-gold' : 'text-gray-200 group-hover:text-white'}`}>
                    {faq.question}
                  </span>
                  <motion.span 
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`material-symbols-outlined text-gray-400 transition-colors duration-300 ${isOpen ? 'text-brand-gold' : ''}`}
                  >
                    expand_more
                  </motion.span>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-3">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
        
        <div className="mt-10 text-center">
             <p className="text-gray-500 text-xs">
                Ainda tem dúvidas? <a href="https://wa.me/5511940884812?text=Olá! Gostaria de falar com um especialista sobre a minha mudança." target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">Fale no WhatsApp</a>
             </p>
        </div>

      </div>
    </section>
  );
};

export default FAQ;
