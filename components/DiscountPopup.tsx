import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const DiscountPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [whatsapp, setWhatsapp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initial load effect
  useEffect(() => {
    const hasFilled = sessionStorage.getItem('hasFilledDiscount');
    
    if (!hasFilled) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setStep(1);
      }, 1500); // 1.5 seconds delay on load/refresh
      return () => clearTimeout(timer);
    }
  }, []);

  // 1-minute recurring timer if closed
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!isOpen) {
      interval = setInterval(() => {
        const hasFilled = sessionStorage.getItem('hasFilledDiscount');
        if (!hasFilled) {
          setIsOpen(true);
          setStep(1);
        }
      }, 60000); // 1 minute
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen]);

  const handleCloseAttempt = () => {
    if (step === 1) {
      setStep(2); // Show confirmation
    } else {
      setIsOpen(false);
    }
  };

  const handleConfirmClose = () => {
    setIsOpen(false);
  };

  const handleStay = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (whatsapp.replace(/\D/g, '').length < 10) {
      setError('Informe um WhatsApp válido com DDD.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const payload = {
        origem: "popup_10_off",
        empresa: "Rotta Brasil Express",
        evento: "lead_desconto_popup",
        whatsapp: whatsapp,
        nome: "",
        cupom: "10OFF",
        desconto_prometido: "10%",
        pagina_origem: window.location.href,
        consentimento_whatsapp: true,
        timestamp: new Date().toISOString(),
        utm_source: urlParams.get('utm_source') || "",
        utm_medium: urlParams.get('utm_medium') || "",
        utm_campaign: urlParams.get('utm_campaign') || "",
        utm_content: urlParams.get('utm_content') || "",
        utm_term: urlParams.get('utm_term') || ""
      };

      const response = await fetch('https://saas.via-cargo.com/webhook/rotta-popup-10-off', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        sessionStorage.setItem('hasFilledDiscount', 'true');
        setStep(3); // Success step
      } else {
        throw new Error('Falha na requisição');
      }
    } catch (err) {
      setError('Não conseguimos registrar agora. Confira o número e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhone = (val: string) => {
    let v = val.replace(/\D/g, '');
    if (v.length > 11) v = v.substring(0, 11);
    if (v.length > 2) v = `(${v.substring(0, 2)}) ${v.substring(2)}`;
    if (v.length > 9) v = `${v.substring(0, 10)}-${v.substring(10)}`;
    return v;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-dark/85 backdrop-blur-md px-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className="bg-[#0a162e] border-2 border-brand-gold/40 p-6 sm:p-8 rounded-[2rem] w-full max-w-md relative shadow-[0_0_40px_rgba(245,130,32,0.15)]"
          >
            {/* Close Button */}
            {step !== 3 && (
              <button
                onClick={handleCloseAttempt}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"
                disabled={isLoading}
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            )}

            {step === 1 && (
              <div className="text-center mt-2">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(245,130,32,0.4)]">
                  <span className="material-symbols-outlined text-brand-dark text-4xl">local_offer</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Ganhe 10% OFF!</h2>
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  Estamos na semana de descontos especiais. Insira seu WhatsApp abaixo para garantir <strong className="text-brand-gold">10% de desconto</strong> no valor final do seu orçamento!
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <input
                      type="tel"
                      placeholder="(00) 00000-0000"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
                      disabled={isLoading}
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-brand-gold transition-colors text-center text-xl font-medium shadow-inner disabled:opacity-50"
                    />
                    {error && <p className="text-red-400 text-xs mt-2 text-left">{error}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-brand-gold text-brand-dark font-bold py-4 rounded-xl hover:bg-brand-goldHover transition-all shadow-lg text-lg transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {isLoading ? 'Garantindo desconto...' : 'Garantir Meu Desconto'}
                  </button>
                  <p className="text-[10px] text-gray-400 mt-1 leading-tight px-2">
                    Ao clicar, você autoriza a Rotta Brasil Express a chamar você no WhatsApp para continuar seu orçamento e garantir o desconto.
                  </p>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="text-center mt-2">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                  <span className="material-symbols-outlined text-white text-4xl">warning</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Espere!</h2>
                <p className="text-gray-200 mb-8 text-sm leading-relaxed">
                  Se você sair agora sem deixar o seu WhatsApp, irá <strong className="text-red-400 text-base">perder definitivamente um SUPER DESCONTO de 10%</strong> no seu orçamento! É uma oportunidade única.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleConfirmClose}
                    className="flex-1 bg-transparent border border-white/20 text-gray-300 font-semibold py-3 px-4 rounded-xl hover:bg-white/5 hover:text-white transition-all text-sm"
                  >
                    Sim, quero perder
                  </button>
                  <button
                    onClick={handleStay}
                    className="flex-[2] bg-brand-gold text-brand-dark font-bold py-3 px-4 rounded-xl hover:bg-brand-goldHover transition-all shadow-lg text-sm transform hover:scale-[1.02]"
                  >
                    Não, quero o desconto!
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center mt-2">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                  <span className="material-symbols-outlined text-white text-4xl">check_circle</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Desconto garantido!</h2>
                <p className="text-gray-300 mb-8 text-sm leading-relaxed">
                  Desconto garantido! Vamos chamar você no WhatsApp em instantes.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-brand-gold text-brand-dark font-bold py-4 rounded-xl hover:bg-brand-goldHover transition-all shadow-lg text-lg transform hover:scale-[1.02]"
                >
                  Desconto Garantido!
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DiscountPopup;
