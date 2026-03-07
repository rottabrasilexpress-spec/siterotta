import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';

// Mapa de regiões -> estados (siglas)
const regionStates: Record<string, string[]> = {
  sudeste:  ['SP', 'RJ', 'MG', 'ES'],
  sul:      ['PR', 'SC', 'RS'],
  centro:   ['DF', 'GO', 'MT', 'MS'],
  nordeste: ['BA', 'PE', 'CE', 'RN', 'PB', 'AL', 'SE', 'PI', 'MA'],
  norte:    ['AM', 'PA', 'TO', 'RR', 'RO', 'AC', 'AP'],
};

// Cores de destaque para cada região quando ativa
const highlightColors: Record<string, string> = {
  sudeste:  '#f9821d', // Laranja
  sul:      '#22c55e', // Verde
  centro:   '#3b82f6', // Azul
  nordeste: '#ec4899', // Rosa
  norte:    '#ef4444', // Vermelho
};

// Cores base de cada região (quando não ativa)
const regionColors: Record<string, string> = {
  sudeste:  '#1d4ed8',
  sul:      '#047857',
  centro:   '#b45309',
  nordeste: '#be123c',
  norte:    '#4338ca',
};

const regions = [
  {
    id: 'sudeste',
    name: 'Sudeste',
    states: 'SP, RJ, MG, ES',
    time: '1 a 2 dias',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=200&h=200',
    highlight: true,
    color: highlightColors.sudeste
  },
  {
    id: 'sul',
    name: 'Sul',
    states: 'PR, SC, RS',
    time: '1 a 3 dias',
    image: 'https://a.imagem.app/BUvYFm.png',
    highlight: false,
    color: highlightColors.sul
  },
  {
    id: 'centro',
    name: 'Centro-Oeste',
    states: 'DF, GO, MT, MS',
    time: '2 a 4 dias',
    image: 'https://a.imagem.app/BUvFl0.png',
    highlight: false,
    color: highlightColors.centro
  },
  {
    id: 'nordeste',
    name: 'Nordeste',
    states: 'BA, PE, CE, outros',
    time: '3 a 6 dias',
    image: 'https://a.imagem.app/BUv0pb.png',
    highlight: false,
    color: highlightColors.nordeste
  },
  {
    id: 'norte',
    name: 'Norte',
    states: 'AM, PA, TO, outros',
    time: '4 a 10 dias',
    image: 'https://a.imagem.app/BUvnQX.png',
    highlight: false,
    color: highlightColors.norte
  }
];

const geoUrl = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

const markers = [
  { markerOffset: -15, name: "São Paulo", coordinates: [-46.6333, -23.5505] },
  { markerOffset: 15,  name: "Rio de Janeiro", coordinates: [-43.1729, -22.9068] },
  { markerOffset: 15,  name: "Curitiba", coordinates: [-49.2731, -25.4284] },
  { markerOffset: -15, name: "Brasília", coordinates: [-47.9292, -15.7801] },
  { markerOffset: 15,  name: "Salvador", coordinates: [-38.5124, -12.9714] },
  { markerOffset: -15, name: "Manaus", coordinates: [-60.0217, -3.1190] }
];

const routes = [
  { start: [-46.6333, -23.5505], end: [-43.1729, -22.9068] },
  { start: [-46.6333, -23.5505], end: [-49.2731, -25.4284] },
  { start: [-46.6333, -23.5505], end: [-47.9292, -15.7801] },
  { start: [-46.6333, -23.5505], end: [-38.5124, -12.9714] },
  { start: [-46.6333, -23.5505], end: [-60.0217, -3.1190] },
  { start: [-46.6333, -23.5505], end: [-43.9378, -19.9208] },
  { start: [-46.6333, -23.5505], end: [-51.2287, -30.0277] },
  { start: [-46.6333, -23.5505], end: [-34.8811, -8.0476]  },
  { start: [-46.6333, -23.5505], end: [-38.5267, -3.7319]  },
];

const CoverageMap: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getStateFill = (sigla: string) => {
    // Find which region owns this state
    const ownerEntry = Object.entries(regionStates).find(([, states]) => states.includes(sigla));
    if (!ownerEntry) return "#1a1a1a";
    const [regionId] = ownerEntry;
    const baseColor = regionColors[regionId] ?? "#1a1a1a";

    if (!activeRegion) return baseColor;
    if (activeRegion === regionId) return highlightColors[regionId] || "#f9821d"; 
    return "#1a1a1a"; // dim other regions
  };

  const handleRegionClick = (id: string) => {
    setActiveRegion(prev => (prev === id ? null : id));
  };

  return (
    <section id="abrangencia" className="relative w-full py-28 overflow-hidden bg-[#050505]">
      <style>{`
        @keyframes mapPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(245, 130, 32, 0);
            border-color: rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 30px 5px rgba(245, 130, 32, 0.15);
            border-color: rgba(245, 130, 32, 0.5);
          }
        }
        .animate-map-pulse {
          animation: mapPulse 4s infinite ease-in-out;
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          alt="Malha Logística Brasil"
          className="w-full h-full object-cover opacity-20 filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column – Title + Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-xs pl-1">Abrangência Nacional</span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                Conexão <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-brand-gold animate-pulse">Brasil Total</span>
              </h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md border-l-2 border-brand-gold/30 pl-6">
                Nossa malha logística cobre 100% do território nacional. Utilizamos rotas inteligentes para garantir a entrega mais rápida do mercado.
              </p>
            </div>

            {/* Interactive Map Container */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative w-full rounded-3xl bg-[#080808]/80 border border-white/10 overflow-hidden shadow-2xl group backdrop-blur-sm animate-map-pulse transition-transform duration-500 flex items-center justify-center"
              style={{ minHeight: '420px' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-10"></div>

              {/* Active-region label */}
              {activeRegion && (
                <motion.div
                  key={activeRegion}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-5 left-1/2 -translate-x-1/2 z-20 bg-brand-gold/90 backdrop-blur-md px-5 py-1.5 rounded-full shadow-lg pointer-events-none"
                >
                  <span className="text-brand-dark font-bold text-sm uppercase tracking-wider">
                    {regions.find(r => r.id === activeRegion)?.name}
                  </span>
                </motion.div>
              )}

              {mounted && (
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{
                    scale: 700,
                    center: [-55, -15]
                  }}
                  className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ width: '100%', height: '480px' }}
                >
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const sigla = geo.properties.sigla;
                        const name = geo.properties.name;
                        const fillColor = getStateFill(sigla);
                        const isHighlighted = activeRegion !== null &&
                          regionStates[activeRegion]?.includes(sigla);

                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={fillColor}
                            stroke={isHighlighted ? "#fff" : "#333"}
                            strokeWidth={isHighlighted ? 1.2 : 0.4}
                            onMouseEnter={() => {
                              setTooltipContent(`${name} (${sigla})`);
                            }}
                            onMouseLeave={() => {
                              setTooltipContent("");
                            }}
                            style={{
                              default: {
                                outline: "none",
                                transition: "all 300ms ease",
                                filter: isHighlighted ? 'drop-shadow(0 0 6px rgba(249,130,29,0.8))' : 'none',
                              },
                              hover: { fill: "#f9821d", outline: "none", transition: "all 250ms" },
                              pressed: { outline: "none" }
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>

                  {/* Rotas Animadas */}
                  {routes.map((route, index) => (
                    <g key={`route-${index}`}>
                      <Line
                        from={route.start as [number, number]}
                        to={route.end as [number, number]}
                        stroke="#f9821d"
                        strokeWidth={1}
                        strokeLinecap="round"
                        className="opacity-30"
                      />
                      <motion.circle
                        r={2}
                        fill="#fff"
                        initial={{ offsetDistance: "0%" } as any}
                        animate={{ offsetDistance: "100%" } as any}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          ease: "linear",
                          delay: Math.random() * 2
                        }}
                        style={{
                          offsetPath: `path('M ${route.start[0]} ${route.start[1]} L ${route.end[0]} ${route.end[1]}')`,
                          filter: 'drop-shadow(0 0 4px #f9821d)'
                        }}
                      />
                    </g>
                  ))}

                  {/* Marcadores */}
                  {markers.map(({ name, coordinates, markerOffset }) => (
                    <Marker key={name} coordinates={coordinates as [number, number]}>
                      <circle r={3} fill="#f9821d" stroke="#fff" strokeWidth={1} />
                      <text
                        textAnchor="middle"
                        y={markerOffset}
                        style={{ fontFamily: "Inter", fill: "#fff", fontSize: "10px", fontWeight: "bold" }}
                      >
                        {name}
                      </text>
                    </Marker>
                  ))}
                </ComposableMap>
              )}

              {/* Tooltip */}
              {tooltipContent && (
                <div className="absolute top-6 right-6 z-20 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 shadow-lg pointer-events-none">
                  <span className="text-white font-bold text-sm">{tooltipContent}</span>
                </div>
              )}

              {/* Monitoramento Badge */}
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                <span className="text-[10px] text-white font-bold uppercase tracking-widest">Monitoramento 24h</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column – Region Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.2
                }
              }
            }}
            className="relative"
          >
            {/* Vertical Decorative Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-gold/30 to-transparent lg:block hidden"></div>

            <div className="space-y-5 relative">
              {regions.map((region) => {
                const isActive = activeRegion === region.id;
                return (
                  <motion.div
                    key={region.id}
                    variants={{
                      hidden: { opacity: 0, x: 50 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { type: "spring", stiffness: 100, damping: 15 }
                      }
                    }}
                    onClick={() => handleRegionClick(region.id)}
                    className={`group relative flex items-center p-1 transition-all duration-500 hover:scale-[1.02] cursor-pointer select-none ${region.highlight ? 'ml-0' : 'lg:ml-8'}`}
                  >
                    {/* Connector (Desktop) */}
                    <div 
                      className="absolute left-[-2rem] top-1/2 w-8 h-px transition-all duration-300 group-hover:w-12 lg:block hidden" 
                      style={{ 
                        backgroundColor: isActive ? region.color : 'rgba(245, 130, 32, 0.3)',
                        width: isActive ? '3rem' : '2rem' 
                      }}
                    ></div>
                    <div 
                      className="absolute left-[-2.2rem] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border lg:block hidden transition-colors"
                      style={{ 
                        backgroundColor: isActive ? region.color : 'transparent',
                        borderColor: region.color || 'rgba(245, 130, 32, 0.5)'
                      }}
                    ></div>

                    {/* Card */}
                    <motion.div
                      animate={isActive
                        ? { scale: 1.03, boxShadow: `0 0 30px ${region.color}40` }
                        : { scale: 1, boxShadow: '0 0 0px rgba(0,0,0,0)' }
                      }
                      transition={{ duration: 0.3 }}
                      className={`
                        w-full flex items-center justify-between p-3 sm:p-5 rounded-2xl border backdrop-blur-md transition-all duration-300
                        ${isActive
                          ? 'bg-white/10'
                          : region.highlight
                            ? 'bg-gradient-to-r from-brand-gold/10 to-transparent border-brand-gold/50'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-brand-gold/30'
                        }
                      `}
                      style={isActive ? { borderColor: region.color, borderLeftWidth: '4px' } : {}}
                    >
                      <div className="flex items-center gap-3 sm:gap-5">
                        {/* Region Image */}
                        <div 
                          className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${isActive ? '' : region.highlight ? 'ring-2 ring-brand-gold/50' : 'ring-1 ring-white/10'}`}
                          style={isActive ? { boxShadow: `0 0 0 2px ${region.color}` } : {}}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                          <img
                            src={region.image}
                            alt={region.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        <div>
                          <h4 
                            className="font-bold text-sm sm:text-lg transition-colors"
                            style={{ color: isActive ? region.color : region.highlight ? 'white' : 'rgb(229, 231, 235)' }}
                          >
                            {region.name}
                          </h4>
                          <p className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-wide">{region.states}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="block text-[8px] sm:text-[9px] text-gray-500 font-bold uppercase mb-1 tracking-widest">Prazo</span>
                        <span 
                          className="text-sm sm:text-xl font-bold tracking-tight transition-colors"
                          style={{ color: isActive ? region.color : region.highlight ? 'var(--brand-gold)' : 'white' }}
                        >
                          {region.time}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-8 lg:ml-8 p-4 rounded-lg bg-blue-900/10 border border-blue-500/20 flex items-start gap-3 backdrop-blur-sm"
            >
              <span className="material-symbols-outlined text-blue-400">info</span>
              <p className="text-xs text-blue-200 leading-relaxed opacity-80">
                * Os prazos são estimados para capitais e regiões metropolitanas. Cidades do interior podem ter acréscimo de 24h a 48h.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CoverageMap;