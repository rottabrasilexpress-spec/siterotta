import React from 'react';
import { motion } from 'motion/react';

interface SidebarProps {
  currentStep: number;
  goToStep: (step: number) => void;
}

const steps = [
  { id: 1, title: 'Endereços', subtitle: 'Origem e Destino' },
  { id: 2, title: 'Data da Mudança', subtitle: 'Escolha uma data' },
  { id: 3, title: 'Equipe', subtitle: 'Ajudantes e Montagem' },
  { id: 4, title: 'Lista de Itens', subtitle: 'Detalhar inventário' },
];

const Sidebar: React.FC<SidebarProps> = ({ currentStep, goToStep }) => {
  // Calculate progress percentage based on currentStep (1 to 4)
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="hidden lg:flex w-full lg:w-2/5 xl:w-1/3 flex-col items-start justify-center pl-8 relative">
      {/* Animated Pathway */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[80%] w-1.5 bg-white/10 rounded-full z-0 transform translate-x-1/2 overflow-hidden">
        <motion.div 
          className="w-full bg-gradient-to-b from-brand-gold via-[#fbb06c] to-brand-gold absolute top-0 left-0"
          initial={{ height: "0%" }}
          animate={{ height: `${progressPercentage}%` }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
        />
      </div>
      
      {/* Glowing Dot */}
      <motion.div 
        className="absolute left-0 w-3 h-3 bg-white rounded-full z-10 transform translate-x-[calc(50%-3px)] shadow-[0_0_15px_rgba(245,130,32,1)]"
        initial={{ top: "10%" }}
        animate={{ top: `calc(10% + ${progressPercentage * 0.8}%)` }}
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
      />
      
      <div className="relative z-10 w-full space-y-8">
        {steps.map((step, index) => {
          let statusClass = '';
          let iconContent: React.ReactNode = step.id;
          let iconClass = 'bg-gray-600';

          if (currentStep === step.id) {
            statusClass = 'step-active-sidebar';
            iconClass = 'bg-brand-gold';
          } else if (currentStep > step.id) {
            statusClass = ''; // Completed steps are normal but with check icon
            iconClass = 'bg-green-500';
            iconContent = (
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  d="M20 6L9 17l-5-5"
                />
              </svg>
            );
          } else {
            statusClass = 'step-inactive-sidebar';
            iconClass = 'bg-gray-600';
          }

          return (
            <div 
              key={step.id} 
              className={`flex items-center group cursor-pointer sidebar-item ${statusClass} relative`}
              onClick={() => goToStep(step.id)}
            >
              <motion.div 
                layout
                className={`step-icon w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md z-10 flex-shrink-0 transition-colors duration-300 ${iconClass}`}
              >
                {iconContent}
              </motion.div>
              <motion.div 
                layout
                className="ml-4 p-4 rounded-xl card-bg-gradient w-full transition-all duration-300 ease-in-out step-card bg-transparent"
              >
                <h4 className="text-lg font-bold text-white mb-1 leading-tight">{step.title}</h4>
                <p className="text-sm text-gray-300">{step.subtitle}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;