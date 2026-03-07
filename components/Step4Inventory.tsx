import React from 'react';
import { motion } from 'motion/react';
import { StepProps } from '../types';

const Step4Inventory: React.FC<StepProps> = ({ formData, updateData, errors, clearError, setError, isActive }) => {
  return (
    <div className="step-content animate-fadeIn pr-2 relative">
      <div className="flex items-center mb-4">
        <span className="material-symbols-outlined text-brand-gold mr-3 text-2xl">list_alt</span>
        <h3 className="text-lg font-bold text-white leading-tight">4. Lista de Itens</h3>
      </div>
      
      <div className="space-y-4">
        <div className="p-3 rounded-xl border-l-4 border-brand-gold bg-brand-gold/10">
          <p className="text-[10px] text-gray-200 leading-relaxed">
            <span className="font-bold text-brand-gold uppercase block mb-1">Atenção</span>
            O tamanho do caminhão e o valor do orçamento dependem da precisão desta lista.
          </p>
        </div>

        {/* Quantidade de Caixas e Sacos */}
        <div className="grid grid-cols-2 gap-4">
            
                <div className="space-y-1">
                    <label className="text-white/70 text-[10px] font-bold uppercase tracking-wider pl-1">Caixas</label>
                    <select
                        value={formData.boxesAmount}
                        onChange={(e) => {
                            updateData({ boxesAmount: e.target.value });
                            clearError('boxesAmount');
                        }}
                        className={`w-full px-4 py-2 border rounded-xl bg-transparent text-white focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold text-sm appearance-none cursor-pointer shadow-none ${
                            errors.boxesAmount ? 'border-red-500 animate-shake focus:ring-red-500 focus:border-red-500' : 'border-white/30'
                        }`}
                    >
                        <option value="" disabled>Selecione...</option>
                        <option value="0">Nenhuma</option>
                        <option value="1-10">1 a 10</option>
                        <option value="11-20">11 a 20</option>
                        <option value="21-30">21 a 30</option>
                        <option value="31-50">31 a 50</option>
                        <option value="50+">Mais de 50</option>
                    </select>
                </div>
            

            
                <div className="space-y-1">
                    <label className="text-white/70 text-[10px] font-bold uppercase tracking-wider pl-1">Sacos</label>
                    <select
                        value={formData.bagsAmount}
                        onChange={(e) => {
                            updateData({ bagsAmount: e.target.value });
                            clearError('bagsAmount');
                        }}
                        className={`w-full px-4 py-2 border rounded-xl bg-transparent text-white focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold text-sm appearance-none cursor-pointer shadow-none ${
                            errors.bagsAmount ? 'border-red-500 animate-shake focus:ring-red-500 focus:border-red-500' : 'border-white/30'
                        }`}
                    >
                        <option value="" disabled>Selecione...</option>
                        <option value="0">Nenhum</option>
                        <option value="1-5">1 a 5</option>
                        <option value="6-10">6 a 10</option>
                        <option value="11-20">11 a 20</option>
                        <option value="20+">Mais de 20</option>
                    </select>
                </div>
            
        </div>

        <div className="space-y-2">
          
            <div>
                <label className="text-white/70 text-[10px] font-bold uppercase tracking-wider pl-1 block mb-1">Móveis e Eletrodomésticos</label>
                <textarea
                    maxLength={9000}
                    value={formData.inventoryList}
                    onChange={(e) => {
                        updateData({ inventoryList: e.target.value });
                        clearError('inventoryList');
                    }}
                    className={`w-full bg-transparent border rounded-xl text-white text-sm p-3 focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none h-24 placeholder:text-gray-500 transition-all shadow-none ${
                        errors.inventoryList ? 'border-red-500 animate-shake focus:ring-red-500 focus:border-red-500' : 'border-white/20'
                    }`}
                    placeholder="Ex: 1 Geladeira Inverse, 1 Sofá 3 lugares, 1 Cama Queen, 1 Máquina de Lavar, 1 Mesa de Jantar c/ 6 cadeiras..."
                ></textarea>
                <div className="flex justify-end text-[10px] text-gray-400 font-bold">
                    {formData.inventoryList.length} / 9000
                </div>
            </div>
          
        </div>

        <div className="pt-2">
          <label className={`flex items-start gap-3 cursor-pointer group p-2 rounded transition-all hover:bg-white/5 ${errors.privacyPolicy ? 'ring-1 ring-red-500 animate-shake' : ''}`}>
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                type="checkbox"
                checked={formData.privacyPolicy}
                onChange={(e) => {
                    updateData({ privacyPolicy: e.target.checked });
                    clearError('privacyPolicy');
                }}
                className="peer sr-only"
              />
              <div className="w-5 h-5 border-2 border-white/30 rounded bg-white/5 peer-checked:border-brand-gold transition-colors duration-300 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-brand-gold pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: formData.privacyPolicy ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    d="M20 6L9 17l-5-5"
                  />
                </svg>
              </div>
            </div>
            <span className="text-xs text-gray-300 group-hover:text-white transition-colors">Eu li e concordo com a <a href="#" className="text-brand-gold underline underline-offset-4 font-bold">Política de Privacidade</a>.</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Step4Inventory;