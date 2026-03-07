import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StepProps } from '../types';

const Step2Date: React.FC<StepProps> = ({ formData, updateData, errors, clearError, setError, isActive }) => {
  const today = new Date().toISOString().split('T')[0];

  const handleDateChange = (date: string) => {
    updateData({ 
        movingDate: date,
        // If window is enabled but not set, auto-fill start/end
        ...(formData.enableWindow && !formData.windowDateStart ? { windowDateStart: date } : {}),
        ...(formData.enableWindow && !formData.windowDateEnd ? { windowDateEnd: date } : {})
    });
    clearError('movingDate');
  };

  return (
    <div className="step-content animate-fadeIn">
      <div className="flex items-center mb-4">
        <span className="material-symbols-outlined text-brand-gold mr-3 text-2xl">calendar_month</span>
        <h3 className="text-lg font-bold text-white">2. Data da Mudança</h3>
      </div>
      <div className="space-y-4">
        <p className="text-gray-300 text-sm">Selecione o dia planejado para o transporte dos seus itens.</p>
        
        <div className="space-y-4">
          
            <div className="relative">
              <label className="block text-white/70 text-[10px] font-bold uppercase mb-1">Data da Mudança</label>
              <input
                type="date"
                min={today}
                value={formData.movingDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className={`w-full px-4 py-2 border rounded-xl bg-transparent text-white focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold text-sm font-bold transition-all shadow-none ${
                  errors.movingDate ? 'border-red-500 animate-shake focus:ring-red-500 focus:border-red-500' : 'border-white/30'
                }`}
              />
            </div>
          

          <div className="pt-2">
            
              <label className="flex items-center gap-3 cursor-pointer group mb-4 w-max">
                <div className="relative inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.enableWindow}
                    onChange={(e) => {
                        const isChecked = e.target.checked;
                        updateData({ 
                            enableWindow: isChecked,
                            ...(isChecked && formData.movingDate && !formData.windowDateStart ? { windowDateStart: formData.movingDate } : {}),
                            ...(isChecked && formData.movingDate && !formData.windowDateEnd ? { windowDateEnd: formData.movingDate } : {})
                        });
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-gold"></div>
                </div>
                <span className="text-sm text-gray-200 group-hover:text-white transition-colors">Tenho flexibilidade de datas (Janela de Coleta)</span>
              </label>
            

            <AnimatePresence>
            {formData.enableWindow && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="relative p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/20 space-y-4">
                  <p className="text-brand-gold text-[10px] font-bold uppercase text-center">Podemos coletar entre os dias:</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/40 text-[9px] font-bold uppercase mb-1">Início (A partir de)</label>
                      <input
                        type="date"
                        min={today}
                        value={formData.windowDateStart}
                        onChange={(e) => {
                            updateData({ windowDateStart: e.target.value });
                            clearError('windowDateStart');
                        }}
                        className={`w-full px-3 py-2 border rounded-lg bg-transparent text-white focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold text-xs font-bold shadow-none ${
                            errors.windowDateStart ? 'border-red-500 animate-shake focus:ring-red-500 focus:border-red-500' : 'border-white/20'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-white/40 text-[9px] font-bold uppercase mb-1">Fim (Até)</label>
                      <input
                        type="date"
                        min={formData.windowDateStart || today}
                        value={formData.windowDateEnd}
                        onChange={(e) => {
                            updateData({ windowDateEnd: e.target.value });
                            clearError('windowDateEnd');
                        }}
                        className={`w-full px-3 py-2 border rounded-lg bg-transparent text-white focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold text-xs font-bold shadow-none ${
                            errors.windowDateEnd ? 'border-red-500 animate-shake focus:ring-red-500 focus:border-red-500' : 'border-white/20'
                        }`}
                      />
                    </div>
                  </div>
                  <p className="text-[9px] text-gray-500 text-center uppercase leading-tight italic">Use a janela para antecipar ou postergar a coleta conforme sua disponibilidade.</p>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
        {formData.movingDate && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center mt-2 overflow-hidden"
          >
            <div className="w-full p-4 rounded-xl border border-white/10 bg-transparent text-center">
              <span className="material-symbols-outlined text-brand-gold block mb-2">verified</span>
              <span className="text-xs text-gray-300">Disponibilidade</span>
              <span className="block text-white font-bold text-green-400 uppercase tracking-widest text-sm">Confirmada</span>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Step2Date;