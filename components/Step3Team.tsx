import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StepProps } from '../types';

const Step3Team: React.FC<StepProps> = ({ formData, updateData, errors, clearError, setError, isActive }) => {
  const [packersSpecific, setPackersSpecific] = useState(false);

  // Sync state with formData if the user had typed something and went back
  useEffect(() => {
    if (formData.hasPackers && formData.packersItems && formData.packersItems !== 'Material para todos os itens') {
        setPackersSpecific(true);
    }
  }, []);

  const updateQty = (key: 'qtyOrigin' | 'qtyDest', delta: number) => {
    const newVal = Math.max(0, Math.min(10, formData[key] + delta));
    updateData({ [key]: newVal });
  };

  const btnClass = "w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 hover:scale-105 active:scale-95 transition-all font-bold text-2xl shadow-md border-none";

  return (
    <div className="step-content animate-fadeIn pr-2 relative">
      <div className="flex items-center mb-4">
        <span className="material-symbols-outlined text-brand-gold mr-3 text-2xl">groups</span>
        <h3 className="text-lg font-bold text-white">3. Seleção de Equipe</h3>
      </div>
      
      <div className="space-y-4 pb-2">
        {/* Helpers Section */}
        <div className="p-3 rounded-xl border border-white/10 bg-transparent">
          <div className="mb-2">
            <h4 className="text-white font-bold text-sm">Ajudantes</h4>
            <p className="text-[10px] text-gray-400">Carregamento e descarga</p>
          </div>
          
          <div className="space-y-2">
            
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-200 font-medium">Ajudantes na Origem</span>
                <div className="flex items-center gap-4">
                  <button onClick={() => updateQty('qtyOrigin', -1)} className={btnClass} title="Diminuir">-</button>
                  <span className="text-white font-extrabold w-6 text-center text-2xl">{formData.qtyOrigin}</span>
                  <button onClick={() => updateQty('qtyOrigin', 1)} className={btnClass} title="Aumentar">+</button>
                </div>
              </div>
            
            
            
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-200 font-medium">Ajudantes no Destino</span>
                <div className="flex items-center gap-4">
                  <button onClick={() => updateQty('qtyDest', -1)} className={btnClass} title="Diminuir">-</button>
                  <span className="text-white font-extrabold w-6 text-center text-2xl">{formData.qtyDest}</span>
                  <button onClick={() => updateQty('qtyDest', 1)} className={btnClass} title="Aumentar">+</button>
                </div>
              </div>
            
          </div>
        </div>

        {/* Assembly Section */}
        <div className="p-3 rounded-xl border border-white/10 bg-transparent">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white font-bold text-sm">Serviço de Montagem</h4>
            <span className="material-symbols-outlined text-brand-gold text-sm">build</span>
          </div>
          <div className="space-y-2">
            
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group w-max">
                  <input
                    type="checkbox"
                    checked={formData.needDisassembly}
                    onChange={(e) => {
                        updateData({ needDisassembly: e.target.checked });
                        if (!e.target.checked) clearError('disassemblyItems');
                    }}
                    className="rounded border-white/20 bg-white/10 text-brand-gold focus:ring-0"
                  />
                  <span className="text-sm text-white group-hover:text-brand-gold transition-colors font-medium">Desmontagem (na Origem)</span>
                </label>
                <AnimatePresence>
                {formData.needDisassembly && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pl-7 overflow-hidden"
                  >
                    <textarea
                      maxLength={5000}
                      value={formData.disassemblyItems}
                      onChange={(e) => {
                          updateData({ disassemblyItems: e.target.value });
                          clearError('disassemblyItems');
                      }}
                      onBlur={() => {
                          if (!formData.disassemblyItems.trim()) {
                              setError('disassemblyItems');
                          }
                      }}
                      className={`w-full bg-transparent border rounded-lg text-white text-sm p-3 focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none h-20 placeholder:text-gray-500 shadow-none ${
                          errors.disassemblyItems ? 'border-red-500 animate-shake focus:ring-red-500 focus:border-red-500' : 'border-white/20'
                      }`}
                      placeholder="Liste os móveis a serem desmontados..."
                    ></textarea>
                    <div className="flex justify-between items-start mt-1">
                        {errors.disassemblyItems && (
                            <span className="text-red-400 text-xs font-bold animate-fadeIn">Por favor, descreva os itens para desmontagem.</span>
                        )}
                        <span className="text-[10px] text-gray-500 uppercase font-bold ml-auto">
                            {formData.disassemblyItems.length} / 5000
                        </span>
                    </div>
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
            

            
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group w-max">
                  <input
                    type="checkbox"
                    checked={formData.needAssembly}
                    onChange={(e) => {
                        updateData({ needAssembly: e.target.checked });
                        if (!e.target.checked) clearError('assemblyItems');
                    }}
                    className="rounded border-white/20 bg-white/10 text-brand-gold focus:ring-0"
                  />
                  <span className="text-sm text-white group-hover:text-brand-gold transition-colors font-medium">Montagem (no Destino)</span>
                </label>
                <AnimatePresence>
                {formData.needAssembly && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pl-7 overflow-hidden"
                  >
                    <textarea
                      maxLength={5000}
                      value={formData.assemblyItems}
                      onChange={(e) => {
                          updateData({ assemblyItems: e.target.value });
                          clearError('assemblyItems');
                      }}
                      onBlur={() => {
                          if (!formData.assemblyItems.trim()) {
                              setError('assemblyItems');
                          }
                      }}
                      className={`w-full bg-transparent border rounded-lg text-white text-sm p-3 focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none h-20 placeholder:text-gray-500 shadow-none ${
                          errors.assemblyItems ? 'border-red-500 animate-shake focus:ring-red-500 focus:border-red-500' : 'border-white/20'
                      }`}
                      placeholder="Liste os móveis a serem montados..."
                    ></textarea>
                    <div className="flex justify-between items-start mt-1">
                        {errors.assemblyItems && (
                            <span className="text-red-400 text-xs font-bold animate-fadeIn">Por favor, descreva os itens para montagem.</span>
                        )}
                        <span className="text-[10px] text-gray-500 uppercase font-bold ml-auto">
                            {formData.assemblyItems.length} / 5000
                        </span>
                    </div>
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
            
          </div>
        </div>

        {/* Packers Section */}
        
            <div className="p-3 rounded-xl border border-white/10 bg-transparent">
            <div className="flex justify-between items-center mb-2">
                <div>
                <h4 className="text-white font-bold text-sm">Material de Embalagem</h4>
                <p className="text-[9px] text-brand-gold uppercase font-bold tracking-tight">Disponível apenas na Origem</p>
                </div>
                <input
                type="checkbox"
                checked={formData.hasPackers}
                onChange={(e) => {
                    const checked = e.target.checked;
                    updateData({ 
                        hasPackers: checked,
                        packersItems: checked && !packersSpecific ? 'Material para todos os itens' : ''
                    });
                    if (!checked) clearError('packersItems');
                }}
                className="rounded border-white/20 bg-white/10 text-brand-gold focus:ring-0"
                />
            </div>
            <AnimatePresence>
            {formData.hasPackers && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 overflow-hidden pt-2"
                >
                <div className="flex flex-col gap-3 mb-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="packer_type" 
                      value="all"
                      checked={!packersSpecific}
                      onChange={() => {
                          setPackersSpecific(false);
                          updateData({ packersItems: 'Material para todos os itens' });
                          clearError('packersItems');
                      }}
                      className="text-brand-gold bg-white/10 border-white/20 focus:ring-brand-gold focus:ring-offset-brand-dark" 
                    />
                    <span className="text-sm text-white group-hover:text-brand-gold transition-colors">Material para todos os itens</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="packer_type" 
                      value="specific"
                      checked={packersSpecific}
                      onChange={() => {
                          setPackersSpecific(true);
                          updateData({ packersItems: '' });
                      }}
                      className="text-brand-gold bg-white/10 border-white/20 focus:ring-brand-gold focus:ring-offset-brand-dark" 
                    />
                    <span className="text-sm text-white group-hover:text-brand-gold transition-colors">Material para itens específicos</span>
                  </label>
                </div>
                
                <AnimatePresence>
                {packersSpecific && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                    <textarea
                        maxLength={5000}
                        value={formData.packersItems === 'Material para todos os itens' ? '' : formData.packersItems}
                        onChange={(e) => {
                            updateData({ packersItems: e.target.value });
                            clearError('packersItems');
                        }}
                        onBlur={() => {
                            if (!formData.packersItems.trim()) {
                                setError('packersItems');
                            }
                        }}
                        className={`w-full bg-transparent border rounded-lg text-white text-sm p-3 focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none h-20 placeholder:text-gray-500 shadow-none ${
                            errors.packersItems ? 'border-red-500 animate-shake focus:ring-red-500 focus:border-red-500' : 'border-white/20'
                        }`}
                        placeholder="Liste os itens específicos para embalar..."
                    ></textarea>
                    <div className="flex justify-between items-start mt-1">
                        {errors.packersItems && (
                            <span className="text-red-400 text-xs font-bold animate-fadeIn">Por favor, liste o que precisa ser embalado.</span>
                        )}
                        <span className="text-[10px] text-gray-500 uppercase font-bold ml-auto">
                            {formData.packersItems.length} / 5000
                        </span>
                    </div>
                    </motion.div>
                )}
                </AnimatePresence>
                </motion.div>
            )}
            </AnimatePresence>
            </div>
        
      </div>
    </div>
  );
};

export default Step3Team;