import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';

const Magnetic: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Diferenciais', href: '#diferenciais' },
    { name: 'Abrangência', href: '#abrangencia' },
    { name: 'Galeria', href: '#galeria' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'FAQ', href: '#faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => link.href.replace('#', ''));
      let current = activeSection;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section;
          }
        }
      }
      if (current !== activeSection) {
        setActiveSection(current);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 100; // Compensação para o cabeçalho fixo + respiro
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#020202]/60 backdrop-blur-2xl py-4 shadow-lg border-b border-white/10' 
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
        style={{
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
          boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo Small */}
            <a 
              href="#inicio" 
              onClick={(e) => handleNavClick(e, '#inicio')}
              className="flex items-center group -ml-2 sm:-ml-4"
            >
              <img 
                src="https://a.imagem.app/GACreP.png" 
                alt="Rotta Brasil Express" 
                className="h-[104px] sm:h-[145px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2">
              {/* Social Links */}
              <div className="flex items-center gap-1 mr-4 border-r border-white/10 pr-4">
                <Magnetic>
                  <a 
                    href="https://www.instagram.com/rotta.brasil.express/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-[#E1306C] hover:scale-110 transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a 
                    href="https://wa.me/5511940884812?text=Olá! Gostaria de falar com um especialista sobre a minha mudança."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-[#25D366] hover:scale-110 transition-all duration-300"
                    aria-label="WhatsApp"
                  >
                    <svg 
                      viewBox="0 0 24 24" 
                      className="w-5 h-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>
                </Magnetic>
              </div>

              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <Magnetic key={link.name}>
                    <a 
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`relative px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavPill"
                          className="absolute inset-0 bg-white/10 rounded-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{link.name}</span>
                    </a>
                  </Magnetic>
                );
              })}

              {/* CTA Button */}
            </div>
            <div className="hidden md:block">
              <Magnetic>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  href="#inicio" 
                  onClick={(e) => handleNavClick(e, '#inicio')}
                  className="px-6 py-2.5 rounded-full border border-brand-gold/50 text-brand-gold text-xs font-bold uppercase tracking-wider hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 inline-block shadow-[0_0_15px_rgba(245,130,32,0.1)] hover:shadow-[0_0_25px_rgba(245,130,32,0.3)]"
                >
                  Cotação
                </motion.a>
              </Magnetic>
            </div>

            {/* Mobile Toggle */}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="material-symbols-outlined text-3xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-[#020202]/95 backdrop-blur-xl transition-all duration-500 md:hidden flex flex-col items-center justify-center space-y-8 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        {navLinks.map((link) => (
          <a 
            key={link.name}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="text-xl text-white font-light tracking-widest hover:text-brand-gold transition-colors"
          >
            {link.name}
          </a>
        ))}
        <a 
          href="https://wa.me/5511940884812?text=Olá! Gostaria de falar com um especialista sobre a minha mudança."
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-[#25D366] font-bold tracking-widest flex items-center gap-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.06 3.973L0 16l4.104-1.076a7.863 7.863 0 0 0 3.888 1.029h.003c4.369 0 7.926-3.559 7.93-7.93a7.856 7.856 0 0 0-2.325-5.697zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
          </svg>
          WhatsApp
        </a>
        <a 
          href="https://www.instagram.com/rotta.brasil.express/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-[#E1306C] font-bold tracking-widest flex items-center gap-3"
        >
          <Instagram className="w-6 h-6" />
          Instagram
        </a>
      </div>
    </>
  );
};

export default Header;