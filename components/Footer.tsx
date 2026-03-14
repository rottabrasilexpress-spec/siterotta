import React from 'react';
import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#020202] pt-0 border-t border-white/5 overflow-hidden z-10">
      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
      
      {/* Main Footer Content */}
      <div className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex flex-col items-start">
              <a href="#" onClick={handleScrollToTop} className="group cursor-pointer inline-block">
                <img 
                  src="https://a.imagem.app/GACreP.png" 
                  alt="Rotta Brasil Express" 
                  className="h-28 sm:h-36 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </a>
              <div className="h-1 w-20 bg-brand-gold mt-6 rounded-full opacity-50"></div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-light pr-4">
              Redefinindo o padrão de mudanças residenciais e corporativas no Brasil. Segurança, tecnologia e atendimento humanizado em cada quilômetro.
            </p>
            <div className="pt-2">
              <a 
                href="https://wa.me/5511940884812?text=Olá! Gostaria de falar com um especialista sobre a minha mudança."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-500 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 group"
              >
                <img src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="WhatsApp" className="w-5 h-5" />
                Falar com Especialista
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
            <div className="flex gap-4 pt-4">
              <a 
                href="https://www.instagram.com/rotta.brasil.express/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#E1306C] hover:bg-[#E1306C]/10 hover:border-[#E1306C]/50 transition-all duration-300 group shadow-lg hover:shadow-[#E1306C]/20"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://wa.me/5511940884812?text=Olá! Gostaria de falar com um especialista sobre a minha mudança."
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]/50 transition-all duration-300 group shadow-lg hover:shadow-[#25D366]/20"
                aria-label="WhatsApp"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5 fill-current transform group-hover:scale-110 transition-transform"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
              <a 
                href="https://share.google/QHuCORTFCVMN7gt5H"
                target="_blank"
                rel="noopener noreferrer"
                className="w-auto px-3 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center gap-1.5 hover:bg-white/10 hover:border-white/30 transition-all duration-300 group shadow-lg"
                title="Avalie-nos no Google"
              >
                <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
                <div className="flex -space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-yellow-400 text-xs fill-current flex items-center" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-brand-gold rounded-full shadow-[0_0_10px_#F58220]"></span>
              Navegação
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'Início', id: 'inicio' },
                { name: 'Como Funciona', id: 'simulacao' },
                { name: 'Diferenciais', id: 'diferenciais' },
                { name: 'Galeria', id: 'galeria' },
                { name: 'Depoimentos', id: 'depoimentos' },
                { name: 'FAQ', id: 'faq' }
              ].map((item) => (
                <li key={item.name}>
                  <a href={`#${item.id}`} className="text-gray-400 hover:text-brand-gold text-sm transition-all duration-300 flex items-center gap-3 group translate-x-0 hover:translate-x-2">
                    <span className="w-1 h-px bg-white/20 group-hover:bg-brand-gold group-hover:w-3 transition-all"></span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Help */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-brand-gold rounded-full shadow-[0_0_10px_#F58220]"></span>
              Institucional
            </h3>
            <ul className="space-y-4">
              {['Sobre a Empresa', 'Política de Privacidade', 'Termos de Uso', 'Trabalhe Conosco', 'Área do Cliente'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-brand-gold text-sm transition-all duration-300 flex items-center gap-3 group translate-x-0 hover:translate-x-2">
                    <span className="w-1 h-px bg-white/20 group-hover:bg-brand-gold group-hover:w-3 transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-brand-gold rounded-full shadow-[0_0_10px_#F58220]"></span>
              Contato
            </h3>
            <div className="space-y-6">
              <a href="https://wa.me/5511940884812?text=Olá! Gostaria de falar com um especialista sobre a minha mudança." target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/10 group-hover:border-brand-gold/50 transition-all duration-300">
                    <span className="material-symbols-outlined text-brand-gold/80 group-hover:text-brand-gold group-hover:scale-110 transition-transform">phone_in_talk</span>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1 group-hover:text-brand-gold transition-colors">Central 24h</span>
                  <span className="text-white group-hover:text-brand-gold transition-colors font-medium text-lg">(11) 94088-4812</span>
                </div>
              </a>
              
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/10 group-hover:border-brand-gold/50 transition-all duration-300">
                    <span className="material-symbols-outlined text-brand-gold/80 group-hover:text-brand-gold group-hover:scale-110 transition-transform">mail</span>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1 group-hover:text-brand-gold transition-colors">Cotações Online</span>
                  <a href="mailto:rottabrasilexpress@gmail.com" className="text-white hover:text-brand-gold transition-colors font-medium text-sm break-all">rottabrasilexpress@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/10 group-hover:border-brand-gold/50 transition-all duration-300">
                    <span className="material-symbols-outlined text-brand-gold/80 group-hover:text-brand-gold group-hover:scale-110 transition-transform">public</span>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1 group-hover:text-brand-gold transition-colors">Abrangência Nacional</span>
                  <p className="text-gray-400 text-sm leading-snug">Atendimento especializado em todos os estados do Brasil.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-gray-500 text-xs">
              © {year} Rotta Brasil Express Logística Ltda. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-3 justify-center md:justify-start mt-2">
                <p className="text-gray-600 text-[10px]">
                  CNPJ: 63.818.211/0001-56
                </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 opacity-100 transition-all duration-500">
             <div className="flex items-center gap-2 border-r border-white/10 pr-6">
                <span className="material-symbols-outlined text-green-500 text-lg">lock</span>
                <div className="flex flex-col">
                    <span className="text-[9px] text-gray-300 font-bold uppercase leading-none">Ambiente</span>
                    <span className="text-[9px] text-gray-300 font-bold uppercase leading-none">100% Seguro</span>
                </div>
             </div>
             <div className="flex gap-4">
                 <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6 hover:-translate-y-1 transition-transform"/>
                 <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-6 hover:-translate-y-1 transition-transform"/>
                 <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" className="h-6 hover:-translate-y-1 transition-transform"/>
                 <img src="https://img.icons8.com/color/48/pix.png" alt="Pix" className="h-6 hover:-translate-y-1 transition-transform"/>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;