import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// ==================================================================================
// CONFIGURAÇÃO
// ==================================================================================
const COMPANY_PHONE = "5511940884812"; // Substitua pelo número real da empresa
// Ex: 5511987654321 (DDI + DDD + Numero)

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isAction?: boolean; // Se true, renderiza um botão/ação especial
  actionLink?: string;
}

// Definição dos passos do fluxo
type ChatStep = 
  | 'NAME' 
  | 'WHATSAPP' 
  | 'ORIGIN_ADDRESS' 
  | 'ORIGIN_TYPE' 
  | 'DEST_ADDRESS' 
  | 'DEST_TYPE' 
  | 'DATE' 
  | 'INVENTORY' 
  | 'COMPLETED';

interface ChatData {
  name: string;
  whatsapp: string;
  originAddress: string;
  originType: string;
  destAddress: string;
  destType: string;
  date: string;
  inventory: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Estado para controlar o fluxo da conversa
  const [currentStep, setCurrentStep] = useState<ChatStep>('NAME');
  
  // Armazena as respostas do usuário
  const [chatData, setChatData] = useState<ChatData>({
    name: '',
    whatsapp: '',
    originAddress: '',
    originType: '',
    destAddress: '',
    destType: '',
    date: '',
    inventory: ''
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  // Mensagem inicial
  useEffect(() => {
    let timeout1: ReturnType<typeof setTimeout>;
    let timeout2: ReturnType<typeof setTimeout>;

    if (messages.length === 0) {
      timeout1 = setTimeout(() => {
        addBotMessage("Olá! Sou a assistente virtual da Rotta Brasil Express. 🚚💨");
        timeout2 = setTimeout(() => {
             addBotMessage("Vou te ajudar a fazer sua cotação rápida por aqui. Para começar, qual é o seu **Nome**?");
        }, 800);
      }, 500);
    }

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  const addBotMessage = (text: string, isAction = false, actionLink = "") => {
    setMessages(prev => [...prev, {
      id: Date.now() + Math.random(),
      text,
      sender: 'bot',
      timestamp: new Date(),
      isAction,
      actionLink
    }]);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now() + Math.random(),
      text,
      sender: 'user',
      timestamp: new Date()
    }]);
  };

  const processNextStep = (userText: string) => {
    // Pequeno delay para simular "digitando"
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      let nextStep: ChatStep = currentStep;
      let responseText = "";

      switch (currentStep) {
        case 'NAME':
          setChatData(prev => ({ ...prev, name: userText }));
          responseText = `Prazer, ${userText}! Para enviarmos o orçamento formalizado, qual seu número de **WhatsApp** (com DDD)?`;
          nextStep = 'WHATSAPP';
          break;

        case 'WHATSAPP':
          setChatData(prev => ({ ...prev, whatsapp: userText }));
          responseText = "Perfeito. Agora, qual é o endereço completo de **Origem** (Onde vamos retirar a mudança)?";
          nextStep = 'ORIGIN_ADDRESS';
          break;

        case 'ORIGIN_ADDRESS':
          setChatData(prev => ({ ...prev, originAddress: userText }));
          responseText = "Na origem, o imóvel é **Casa** ou **Apartamento**?";
          nextStep = 'ORIGIN_TYPE';
          break;

        case 'ORIGIN_TYPE':
          setChatData(prev => ({ ...prev, originType: userText }));
          responseText = "Entendido. E qual é o endereço completo de **Destino** (Onde vamos entregar)?";
          nextStep = 'DEST_ADDRESS';
          break;

        case 'DEST_ADDRESS':
          setChatData(prev => ({ ...prev, destAddress: userText }));
          responseText = "No destino, o imóvel é **Casa** ou **Apartamento**?";
          nextStep = 'DEST_TYPE';
          break;

        case 'DEST_TYPE':
          setChatData(prev => ({ ...prev, destType: userText }));
          responseText = "Qual a **Data** prevista para a mudança?";
          nextStep = 'DATE';
          break;

        case 'DATE':
          setChatData(prev => ({ ...prev, date: userText }));
          responseText = "Para finalizar: liste resumidamente os **principais itens** (Ex: Geladeira, Sofá, Cama, 20 caixas...).";
          nextStep = 'INVENTORY';
          break;

        case 'INVENTORY':
          setChatData(prev => ({ ...prev, inventory: userText }));
          // Aqui finalizamos e geramos o link
          nextStep = 'COMPLETED';
          
          // Construir a mensagem final
          const finalData = { ...chatData, inventory: userText }; // Garante que o ultimo dado esteja incluso
          const message = `Olá! Fiz a pré-cotação pelo site.\n\n*Nome:* ${finalData.name}\n*Zap:* ${finalData.whatsapp}\n*Origem:* ${finalData.originAddress} (${finalData.originType})\n*Destino:* ${finalData.destAddress} (${finalData.destType})\n*Data:* ${finalData.date}\n*Itens:* ${finalData.inventory}`;
          
          const encodedMessage = encodeURIComponent(message);
          const waLink = `https://wa.me/${COMPANY_PHONE}?text=${encodedMessage}`;

          addBotMessage("Tudo certo! 🎉 Coletei todas as informações.");
          setTimeout(() => {
             addBotMessage("Clique no botão abaixo para finalizar e receber seu orçamento diretamente no WhatsApp:", true, waLink);
          }, 600);
          
          setCurrentStep(nextStep);
          return; // Retorna aqui para evitar execução padrão abaixo
      }

      addBotMessage(responseText);
      setCurrentStep(nextStep);

    }, 1000);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const text = inputValue;
    setInputValue("");
    addUserMessage(text);
    
    // Processa a lógica baseada no passo atual
    processNextStep(text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  // Renderiza texto com negrito simples (**texto**)
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="text-brand-gold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      {/* SVG Filter for Gooey Effect */}
      <svg width="0" height="0" className="absolute hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none font-sans">
        
        {/* Janela do Chat (Morphing Container) */}
        <motion.div 
          layout
          initial={false}
          animate={{
            width: isOpen ? 350 : 64,
            height: isOpen ? 550 : 64,
            borderRadius: isOpen ? 16 : 32,
            backgroundColor: isOpen ? 'rgba(14, 30, 62, 0.95)' : '#f9821d',
            opacity: 1,
            y: 0
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            mass: 0.8
          }}
          className="pointer-events-auto backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col relative origin-bottom-right"
        >
          {/* Conteúdo do Botão Fechado */}
          <AnimatePresence>
            {!isOpen && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(true)}
                className="absolute inset-0 w-full h-full flex items-center justify-center text-[#050505] group"
              >
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75 animate-ping"></span>
                <div className="relative w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl absolute transition-all duration-300 opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-75">
                      local_shipping
                  </span>
                  <span className="material-symbols-outlined text-3xl absolute transition-all duration-300 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100">
                      forum
                  </span>
                </div>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Conteúdo do Chat Aberto */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex flex-col h-full w-full"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-brand-gold to-brand-goldHover p-4 flex justify-between items-center shadow-md flex-shrink-0">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                        <span className="material-symbols-outlined text-white text-lg">support_agent</span>
                     </div>
                     <div>
                       <h3 className="text-white font-bold text-sm leading-tight">Cotação Express</h3>
                       <span className="flex items-center gap-1 text-[10px] text-white/90 font-medium">
                         <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online
                       </span>
                     </div>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#080808]">
                  <div className="text-center text-[10px] text-gray-500 uppercase tracking-widest my-2 opacity-50">Início da conversa</div>
                  
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                      <motion.div 
                        key={msg.id}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 400, 
                          damping: 25,
                          mass: 0.8
                        }}
                        className={`flex w-full flex-col origin-bottom ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div 
                          className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm relative
                            ${msg.sender === 'user' 
                              ? 'bg-brand-gold text-brand-dark rounded-tr-sm font-medium' 
                              : 'bg-[#1c2e56] text-gray-200 rounded-tl-sm border border-white/5'}
                          `}
                        >
                          {renderText(msg.text)}
                          <span className={`text-[9px] block text-right mt-1 opacity-60 ${msg.sender === 'user' ? 'text-brand-dark' : 'text-gray-400'}`}>
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        {/* Botão de Ação (WhatsApp) */}
                        {msg.isAction && msg.actionLink && (
                          <motion.a 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                            href={msg.actionLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transition-all transform hover:scale-105"
                          >
                            <img src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="WhatsApp" className="w-5 h-5 filter brightness-0 invert" />
                            Solicitar Orçamento
                          </motion.a>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isTyping && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      className="flex justify-start"
                    >
                       <div className="bg-[#1c2e56] p-3 rounded-2xl rounded-tl-sm border border-white/5 flex gap-1 items-center h-10" style={{ filter: 'url(#goo)' }}>
                          <motion.span 
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                            className="w-2 h-2 bg-gray-300 rounded-full"
                          ></motion.span>
                          <motion.span 
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
                            className="w-2 h-2 bg-gray-300 rounded-full"
                          ></motion.span>
                          <motion.span 
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                            className="w-2 h-2 bg-gray-300 rounded-full"
                          ></motion.span>
                       </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                {currentStep !== 'COMPLETED' ? (
                  <div className="p-3 bg-[#0e1e3e] border-t border-white/10 flex-shrink-0">
                    <div className="flex items-center gap-2 bg-[#050505] rounded-full px-4 py-2 border border-white/10 focus-within:border-brand-gold/50 transition-colors">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Digite sua resposta..."
                        className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-gray-500"
                        disabled={isTyping}
                        autoFocus={isOpen}
                      />
                      <button 
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isTyping}
                        className="text-brand-gold hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <span className="material-symbols-outlined text-xl">send</span>
                      </button>
                    </div>
                    <div className="text-center mt-2">
                      <p className="text-[9px] text-gray-500">Protegido por criptografia de ponta a ponta.</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-[#0e1e3e] border-t border-white/10 text-center flex-shrink-0">
                     <p className="text-xs text-gray-400 mb-2">Atendimento finalizado.</p>
                     <button 
                       onClick={() => {
                         setMessages([]);
                         setCurrentStep('NAME');
                         setChatData({ name: '', whatsapp: '', originAddress: '', originType: '', destAddress: '', destType: '', date: '', inventory: '' });
                         setTimeout(() => addBotMessage("Olá! Vamos começar uma nova cotação. Qual seu **Nome**?"), 300);
                       }}
                       className="text-brand-gold text-xs font-bold uppercase hover:underline"
                     >
                       Iniciar Nova Cotação
                     </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </>
  );
};

export default ChatWidget;