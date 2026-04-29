import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import Lenis from 'lenis';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Step1Address from './components/Step1Address';
import Step2Date from './components/Step2Date';
import Step3Team from './components/Step3Team';
import Step4Inventory from './components/Step4Inventory';
import Differentials from './components/Differentials';
import Gallery from './components/Gallery';
import CoverageMap from './components/CoverageMap';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import RealSimulation from './components/RealSimulation';
import DiscountPopup from './components/DiscountPopup';
import { FormData, FormErrors } from './types';

const App: React.FC = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showInventoryWarning, setShowInventoryWarning] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [shakeBtn, setShakeBtn] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    whatsapp: '',
    originAddress: '',
    originType: null,
    originFloor: '',
    originAccess: '',
    destAddress: '',
    destType: null,
    destFloor: '',
    destAccess: '',
    movingDate: '',
    enableWindow: false,
    windowDateStart: '',
    windowDateEnd: '',
    ownHelp: false,
    qtyOrigin: 0,
    qtyDest: 0,
    needDisassembly: false,
    disassemblyItems: '',
    needAssembly: false,
    assemblyItems: '',
    hasPackers: false,
    packersItems: '',
    inventoryList: '',
    boxesAmount: '',
    bagsAmount: '',
    privacyPolicy: false,
  });

  const updateData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const clearError = (field: keyof FormData) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const setError = (field: keyof FormData) => {
    setErrors(prev => ({ ...prev, [field]: true }));
  };

  const triggerShake = () => {
    setShakeBtn(true);
    setTimeout(() => setShakeBtn(false), 400);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = true;
      if (!formData.whatsapp.trim() || formData.whatsapp.length < 11) newErrors.whatsapp = true; // Validação básica de tamanho
      if (!formData.originAddress.trim()) newErrors.originAddress = true;
      if (!formData.originType) newErrors.originType = true;
      if (!formData.destAddress.trim()) newErrors.destAddress = true;
      if (!formData.destType) newErrors.destType = true;
    } else if (step === 2) {
      if (!formData.movingDate) newErrors.movingDate = true;
      if (formData.enableWindow) {
        if (!formData.windowDateStart) newErrors.windowDateStart = true;
        if (!formData.windowDateEnd) newErrors.windowDateEnd = true;
      }
    } else if (step === 3) {
      if (formData.needDisassembly && !formData.disassemblyItems.trim()) newErrors.disassemblyItems = true;
      if (formData.needAssembly && !formData.assemblyItems.trim()) newErrors.assemblyItems = true;
      if (formData.hasPackers && !formData.packersItems.trim()) newErrors.packersItems = true;
    } else if (step === 4) {
      if (!formData.boxesAmount) newErrors.boxesAmount = true;
      if (!formData.bagsAmount) newErrors.bagsAmount = true;
      if (!formData.inventoryList.trim()) newErrors.inventoryList = true;
      if (!formData.privacyPolicy) newErrors.privacyPolicy = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      triggerShake();
      isValid = false;
    }

    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setDirection(1);
        setCurrentStep(prev => prev + 1);
      } else {
        if (formData.boxesAmount === "0" && formData.bagsAmount === "0") {
          setShowInventoryWarning(true);
        } else {
          setIsSuccess(true);
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ['0%', '30%']);
  const backgroundScale = useTransform(scrollY, [0, 1000], [1, 1.15]);

  const titleWords = ["Rotta", "Brasil", "Express"];

  const variants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.9,
      z: -100
    }),
    center: {
      zIndex: 1,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      z: 0
    },
    exit: (direction: number) => ({
      zIndex: 0,
      rotateY: direction < 0 ? 90 : -90,
      opacity: 0,
      scale: 0.9,
      z: -100
    })
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <>
      <Header />
      <main>
        <section id="inicio" className="relative w-full min-h-screen flex items-center overflow-hidden bg-brand-dark">
          <motion.div
            style={{ y: backgroundY }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-full h-[120%] -top-[10%]"
          >
            <img
              alt="Caminhão de mudança moderno em uma rodovia aberta"
              className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-125 saturate-150"
              src="https://a.imagem.app/GoPUwQ.png"
              style={{
                maskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0.95) 100%)',
                WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0.95) 100%)'
              }}
            />
          </motion.div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-brand-gold rounded-full opacity-30 shadow-[0_0_10px_rgba(245,130,32,0.8)]"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  y: [null, Math.random() * -500],
                  x: [null, (Math.random() - 0.5) * 200],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 10,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
            <div className="flex flex-col items-center justify-center w-full lg:w-3/5 xl:w-2/3 lg:pr-12 mt-32 sm:mt-24">

              {/* Big Hero Title Moved Here */}
              <div className="flex flex-col items-center justify-center text-center mb-6">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tighter text-overlay-shadow leading-tight sm:leading-none flex gap-3 flex-wrap justify-center">
                  {titleWords.map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{
                        duration: 1.5,
                        delay: 1.0 + (index * 0.8),
                        ease: [0.2, 0.65, 0.3, 0.9]
                      }}
                      className={word === "Express" ? "text-brand-gold" : ""}
                    >
                      {word}
                    </motion.span>
                  ))}
                </h1>
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: 3.5, ease: "easeOut" }}
                  className="text-brand-gold/80 text-xs sm:text-sm uppercase tracking-[0.4em] font-medium mt-4 ml-1 text-overlay-shadow border-t border-brand-gold/30 pt-4 px-12"
                >
                  Especialista em Mudanças Interestaduais
                </motion.p>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-sm sm:text-base text-gray-300 mb-8 max-w-2xl text-overlay-shadow text-center w-full mx-auto font-medium uppercase tracking-widest opacity-80"
              >
                Descubra o valor da sua mudança em segundos
              </motion.p>

              <div className="w-full max-w-xl text-left mx-auto perspective-1000">
                <motion.div
                  layout
                  onMouseMove={handleMouseMove}
                  className="w-full card-bg-gradient p-6 sm:p-8 rounded-2xl shadow-2xl overflow-hidden min-h-[450px] flex flex-col justify-between relative group"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Spotlight Effect */}
                  <div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(245,130,32,0.15), transparent 40%)`
                    }}
                  />

                  {/* Step Components */}
                  <div className="relative flex-1" style={{ transformStyle: 'preserve-3d' }}>
                    <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                      <motion.div
                        key={currentStep}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                          mass: 0.8,
                          opacity: { duration: 0.3 }
                        }}
                        className="w-full"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        {currentStep === 1 && (
                          <Step1Address
                            formData={formData}
                            updateData={updateData}
                            errors={errors}
                            clearError={clearError}
                            setError={setError}
                            isActive={true}
                          />
                        )}
                        {currentStep === 2 && (
                          <Step2Date
                            formData={formData}
                            updateData={updateData}
                            errors={errors}
                            clearError={clearError}
                            setError={setError}
                            isActive={true}
                          />
                        )}
                        {currentStep === 3 && (
                          <Step3Team
                            formData={formData}
                            updateData={updateData}
                            errors={errors}
                            clearError={clearError}
                            setError={setError}
                            isActive={true}
                          />
                        )}
                        {currentStep === 4 && (
                          <Step4Inventory
                            formData={formData}
                            updateData={updateData}
                            errors={errors}
                            clearError={clearError}
                            setError={setError}
                            isActive={true}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="mt-4 flex gap-4 relative z-10">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      onClick={handleBack}
                      className={`${currentStep === 1 ? 'hidden' : 'block'} flex-1 border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-full font-semibold btn-transition`}
                    >
                      Voltar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      onClick={handleNext}
                      className={`flex-[2] bg-brand-gold hover:bg-brand-goldHover text-white px-10 py-3 rounded-full font-semibold text-lg btn-transition shadow-lg hover:shadow-xl ${shakeBtn ? 'animate-shake' : ''}`}
                    >
                      {currentStep === 4 ? 'Finalizar Cotação' : 'Próximo Passo'}
                    </motion.button>
                  </div>

                </motion.div>
              </div>
            </div>

            {/* Sidebar (Progress Steps) */}
            <Sidebar currentStep={currentStep} goToStep={(step) => {
              if (step <= currentStep) setCurrentStep(step);
            }} />
          </div>
        </section>

        {/* Chat Widget Component Added Here */}
        <ChatWidget />
        <DiscountPopup />

        {/* Sections with IDs */}
        <Differentials />
        <RealSimulation />
        <CoverageMap />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Footer />
      </main>

      {/* Inventory Warning Modal */}
      <AnimatePresence>
        {showInventoryWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/95 backdrop-blur-md px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="bg-[#0a162e] p-8 sm:p-10 rounded-[2.5rem] text-center max-w-md w-full shadow-2xl border border-brand-gold/30"
            >
              <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-brand-gold text-4xl">inventory_2</span>
              </div>
              <h2 className="text-white text-2xl font-bold mb-4 tracking-tight">Tem certeza que não possui nenhuma caixa e nenhum saco?</h2>
              <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                A quantidade de caixas e sacos é muito importante para calcularmos o tamanho correto do caminhão para sua mudança.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowInventoryWarning(false)}
                  className="flex-1 bg-transparent border border-white/20 text-white font-bold py-3 px-6 rounded-full hover:bg-white/5 transition-all"
                >
                  Não, vou adicionar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowInventoryWarning(false);
                    setIsSuccess(true);
                  }}
                  className="flex-1 bg-brand-gold text-brand-dark font-bold py-3 px-6 rounded-full hover:bg-brand-goldHover transition-all shadow-lg"
                >
                  Sim, tenho certeza
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="bg-white p-10 rounded-[2.5rem] text-center max-w-sm shadow-2xl border-4 border-brand-gold/20"
            >
              <span className="material-symbols-outlined text-green-500 text-7xl mb-4">check_circle</span>
              <div className="flex justify-center mb-6">
                <img
                  src="https://a.imagem.app/GACreP.png"
                  alt="Rotta Brasil Express"
                  className="h-24 w-auto object-contain"
                />
              </div>
              <p className="text-gray-600 mb-8 font-medium">Sua cotação foi enviada com sucesso! Clique no botão abaixo para nos enviar os detalhes pelo WhatsApp e agilizar seu atendimento.</p>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const message = `Olá! Acabei de preencher o formulário de cotação no site.\n\n*Dados da Mudança:*\n*Nome:* ${formData.name}\n*WhatsApp:* ${formData.whatsapp}\n*Origem:* ${formData.originAddress} (${formData.originType}${formData.originFloor ? `, ${formData.originFloor} andar` : ''})\n*Destino:* ${formData.destAddress} (${formData.destType}${formData.destFloor ? `, ${formData.destFloor} andar` : ''})\n*Data:* ${formData.movingDate}\n*Itens:* ${formData.inventoryList}\n*Caixas:* ${formData.boxesAmount}\n*Sacos:* ${formData.bagsAmount}`;
                    const encodedMessage = encodeURIComponent(message);
                    window.open(`https://wa.me/5511940884812?text=${encodedMessage}`, '_blank');
                  }}
                  className="w-full bg-green-500 text-white font-bold py-4 rounded-full hover:bg-green-600 transition-all shadow-lg text-lg flex items-center justify-center gap-2"
                >
                  <img src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="WhatsApp" className="w-6 h-6 filter brightness-0 invert" />
                  Enviar via WhatsApp
                </motion.button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full text-gray-400 text-sm hover:text-gray-600 transition-colors"
                >
                  Voltar ao Início
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;