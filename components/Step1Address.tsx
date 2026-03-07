import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StepProps } from '../types';

const floors = Array.from({ length: 30 }, (_, i) => i + 1);

const FloatingInput: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onFocus: () => void;
  label: string;
  icon: string;
  error?: boolean;
  type?: string;
  required?: boolean;
}> = ({ value, onChange, onBlur, onFocus, label, icon, error, type = "text", required }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <div className="relative mt-4">
      <motion.label
        initial={false}
        animate={{
          y: isActive ? -24 : 8,
          scale: isActive ? 0.85 : 1,
          color: isActive ? '#F58220' : '#9CA3AF',
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`absolute left-4 origin-left pointer-events-none text-sm px-1 z-10 rounded-sm transition-all ${isActive ? 'bg-[#0e1e3e] shadow-[0_0_10px_#0e1e3e] backdrop-blur-md' : 'bg-transparent'}`}
      >
        {label}
      </motion.label>
      <input
        value={value}
        onChange={onChange}
        onFocus={() => {
          setIsFocused(true);
          onFocus();
        }}
        onBlur={() => {
          setIsFocused(false);
          onBlur();
        }}
        className={`w-full px-4 py-2 border rounded-lg bg-transparent text-white focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold text-sm transition-all relative z-0 shadow-none ${
          error ? 'border-red-500 animate-shake focus:ring-red-500 focus:border-red-500' : 'border-white/30'
        }`}
        type={type}
        required={required}
      />
      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none z-10">{icon}</span>
    </div>
  );
};

const Step1Address: React.FC<StepProps> = ({ formData, updateData, errors, clearError, setError, isActive }) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleBlur = (field: 'originAddress' | 'destAddress' | 'name' | 'whatsapp', value: string) => {
    // Validação básica
    if (!value.trim() || (field === 'whatsapp' && value.length < 14)) {
      setError(field);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    // Máscara (XX) XXXXX-XXXX
    if (value.length > 2) {
      value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
    }
    if (value.length > 10) {
      value = `${value.substring(0, 10)}-${value.substring(10)}`;
    }
    
    updateData({ whatsapp: value });
    if (errors.whatsapp) clearError('whatsapp');
  };

  return (
    <div className="step-content animate-fadeIn pr-2 relative">
      <div className="flex items-center mb-4 relative z-10">
        <span className="material-symbols-outlined text-brand-gold mr-3 text-2xl">contact_mail</span>
        <h3 className="text-lg font-bold text-white">1. Contato e Endereços</h3>
      </div>
      
      <div className="space-y-4 relative z-10">
        
        {/* Contact Section */}
        <div className="space-y-2 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2 text-white/80 text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Dados de Contato
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            
                <div>
                  <FloatingInput
                    label="Seu Nome Completo"
                    icon="person"
                    value={formData.name}
                    onChange={(e) => {
                      updateData({ name: e.target.value });
                      if (errors.name) clearError('name');
                    }}
                    onFocus={() => setFocusedField('contact')}
                    onBlur={() => {
                      setFocusedField(null);
                      handleBlur('name', formData.name);
                    }}
                    error={errors.name}
                    required
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1 font-bold animate-fadeIn pl-1">Por favor, informe seu nome.</p>
                  )}
                </div>
            

            
                <div>
                  <FloatingInput
                    label="(DDD) 99999-9999"
                    icon="call"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={handlePhoneChange}
                    onFocus={() => setFocusedField('contact')}
                    onBlur={() => {
                      setFocusedField(null);
                      handleBlur('whatsapp', formData.whatsapp);
                    }}
                    error={errors.whatsapp}
                    required
                  />
                  {errors.whatsapp && (
                    <p className="text-red-400 text-xs mt-1 font-bold animate-fadeIn pl-1">WhatsApp obrigatório.</p>
                  )}
                </div>
            
          </div>
        </div>

        {/* Origin Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white/80 text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span> Origem
          </div>
          
          
            <div className="mt-2">
              <FloatingInput
                label="Rua, Número, Bairro, Cidade - SP"
                icon="location_on"
                value={formData.originAddress}
                onChange={(e) => {
                  updateData({ originAddress: e.target.value });
                  if (errors.originAddress) clearError('originAddress');
                }}
                onFocus={() => setFocusedField('origin')}
                onBlur={() => {
                  setFocusedField(null);
                  handleBlur('originAddress', formData.originAddress);
                }}
                error={errors.originAddress}
                required
              />
              {errors.originAddress && (
                <p className="text-red-400 text-xs mt-1 font-bold animate-fadeIn pl-1">Por favor, informe o endereço completo de origem.</p>
              )}
            </div>
          

          
            <div className={`flex gap-3 ${errors.originType ? 'animate-shake rounded-lg ring-1 ring-red-500 p-0.5' : ''}`}>
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="origin_type"
                  checked={formData.originType === 'casa'}
                  onChange={() => {
                      updateData({ originType: 'casa' });
                      clearError('originType');
                  }}
                  className="hidden peer"
                />
                <div className="text-center py-2 border border-white/20 rounded-lg bg-transparent text-white peer-checked:bg-brand-gold peer-checked:border-brand-gold transition-all text-xs font-bold uppercase hover:bg-white/10">Casa</div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="origin_type"
                  checked={formData.originType === 'apartamento'}
                  onChange={() => {
                      updateData({ originType: 'apartamento' });
                      clearError('originType');
                  }}
                  className="hidden peer"
                />
                <div className="text-center py-2 border border-white/20 rounded-lg bg-transparent text-white peer-checked:bg-brand-gold peer-checked:border-brand-gold transition-all text-xs font-bold uppercase hover:bg-white/10">Apto</div>
              </label>
            </div>
            {errors.originType && (
              <p className="text-red-400 text-xs mt-1 font-bold animate-fadeIn pl-1">Selecione o tipo de imóvel.</p>
            )}
          
          
          <AnimatePresence>
          {formData.originType === 'apartamento' && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-3 overflow-hidden"
            >
              <select
                value={formData.originFloor}
                onChange={(e) => updateData({ originFloor: e.target.value })}
                className="w-full px-3 py-2 border border-white/30 rounded-lg bg-transparent text-white text-xs appearance-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none"
              >
                <option value="" disabled>Andar?</option>
                <option value="Térreo">Térreo</option>
                {floors.map(i => (
                  <option key={i} value={`${i}º`}>{i}º Andar</option>
                ))}
              </select>
              <select
                value={formData.originAccess}
                onChange={(e) => updateData({ originAccess: e.target.value })}
                className="w-full px-3 py-2 border border-white/30 rounded-lg bg-transparent text-white text-xs appearance-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none"
              >
                <option value="" disabled>Acesso?</option>
                <option value="Elevador">Elevador</option>
                <option value="Escadas">Escadas</option>
              </select>
            </motion.div>
          )}
          </AnimatePresence>
        </div>

        {/* Destination Section */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <div className="flex items-center gap-2 text-white/80 text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Destino
          </div>
          
          
            <div className="mt-2">
              <FloatingInput
                label="Rua, Número, Bairro, Cidade - SP"
                icon="flag"
                value={formData.destAddress}
                onChange={(e) => {
                  updateData({ destAddress: e.target.value });
                  if (errors.destAddress) clearError('destAddress');
                }}
                onFocus={() => setFocusedField('dest')}
                onBlur={() => {
                  setFocusedField(null);
                  handleBlur('destAddress', formData.destAddress);
                }}
                error={errors.destAddress}
                required
              />
              {errors.destAddress && (
                <p className="text-red-400 text-xs mt-1 font-bold animate-fadeIn pl-1">Por favor, informe o endereço completo de destino.</p>
              )}
            </div>
          

          
            <div className={`flex gap-3 ${errors.destType ? 'animate-shake rounded-lg ring-1 ring-red-500 p-0.5' : ''}`}>
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="dest_type"
                  checked={formData.destType === 'casa'}
                  onChange={() => {
                      updateData({ destType: 'casa' });
                      clearError('destType');
                  }}
                  className="hidden peer"
                />
                <div className="text-center py-2 border border-white/20 rounded-lg bg-transparent text-white peer-checked:bg-brand-gold peer-checked:border-brand-gold transition-all text-xs font-bold uppercase hover:bg-white/10">Casa</div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="dest_type"
                  checked={formData.destType === 'apartamento'}
                  onChange={() => {
                      updateData({ destType: 'apartamento' });
                      clearError('destType');
                  }}
                  className="hidden peer"
                />
                <div className="text-center py-2 border border-white/20 rounded-lg bg-transparent text-white peer-checked:bg-brand-gold peer-checked:border-brand-gold transition-all text-xs font-bold uppercase hover:bg-white/10">Apto</div>
              </label>
            </div>
            {errors.destType && (
              <p className="text-red-400 text-xs mt-1 font-bold animate-fadeIn pl-1">Selecione o tipo de imóvel.</p>
            )}
          

          <AnimatePresence>
          {formData.destType === 'apartamento' && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-3 overflow-hidden"
            >
              <select
                value={formData.destFloor}
                onChange={(e) => updateData({ destFloor: e.target.value })}
                className="w-full px-3 py-2 border border-white/30 rounded-lg bg-transparent text-white text-xs appearance-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none"
              >
                <option value="" disabled>Andar?</option>
                <option value="Térreo">Térreo</option>
                {floors.map(i => (
                  <option key={i} value={`${i}º`}>{i}º Andar</option>
                ))}
              </select>
              <select
                value={formData.destAccess}
                onChange={(e) => updateData({ destAccess: e.target.value })}
                className="w-full px-3 py-2 border border-white/30 rounded-lg bg-transparent text-white text-xs appearance-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none"
              >
                <option value="" disabled>Acesso?</option>
                <option value="Elevador">Elevador</option>
                <option value="Escadas">Escadas</option>
              </select>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Step1Address;