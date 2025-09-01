import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, Moon, Sparkles, Download, Github, Twitter } from 'lucide-react';
import './App.css';
import pixelBackground from './assets/pixel_art_background.png';

const StarfallValley = () => {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Gerar estrelas aleatórias
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 50; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 60,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleDelay: Math.random() * 3
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  // Gerar estrelas cadentes periodicamente
  useEffect(() => {
    const interval = setInterval(() => {
      const newShootingStar = {
        id: Date.now(),
        startX: Math.random() * 100,
        startY: Math.random() * 30,
        endX: Math.random() * 100,
        endY: Math.random() * 30 + 40,
        duration: Math.random() * 2 + 1
      };
      
      setShootingStars(prev => [...prev, newShootingStar]);
      
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newShootingStar.id));
      }, newShootingStar.duration * 1000);
    }, 3000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePlayClick = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-blue-900 to-purple-900">
      {/* Fundo de pixel art com parallax */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${pixelBackground})`,
            filter: 'contrast(1.1) saturate(1.2)'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '2% 1%', '0% 0%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Overlay para melhor contraste */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Estrelas cintilantes */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 0.3, star.opacity]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: star.twinkleDelay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Estrelas cadentes */}
      <AnimatePresence>
        {shootingStars.map((shootingStar) => (
          <motion.div
            key={shootingStar.id}
            className="absolute w-1 h-1 bg-white rounded-full shadow-lg"
            style={{
              left: `${shootingStar.startX}%`,
              top: `${shootingStar.startY}%`,
              boxShadow: '0 0 6px #ffffff, 0 0 12px #ffffff'
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 0
            }}
            animate={{
              x: `${(shootingStar.endX - shootingStar.startX) * window.innerWidth / 100}px`,
              y: `${(shootingStar.endY - shootingStar.startY) * window.innerHeight / 100}px`,
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: shootingStar.duration,
              ease: "easeOut"
            }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo/Título */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 pixel-font tracking-wider">
            <span className="inline-block">
              <Sparkles className="inline-block w-12 h-12 md:w-16 md:h-16 mr-4 text-yellow-300" />
            </span>
            STARFALL
          </h1>
          <h2 className="text-3xl md:text-5xl font-semibold text-blue-200 pixel-font tracking-wide">
            VALLEY
          </h2>
        </motion.div>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed"
        >
          Uma jornada mágica através de vales estrelados onde cada passo revela novos mistérios
        </motion.p>

        {/* Botões de ação */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-6 mb-16"
        >
          <motion.button
            onClick={handlePlayClick}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center gap-3">
              <Play className="w-6 h-6" />
              {isPlaying ? 'Carregando...' : 'Jogar Agora'}
            </div>
          </motion.button>

          <motion.button
            className="group px-8 py-4 border-2 border-white/30 text-white font-bold text-lg rounded-lg hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center justify-center gap-3">
              <Download className="w-6 h-6" />
              Download
            </div>
          </motion.button>
        </motion.div>

        {/* Características do jogo */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl"
        >
          {[
            {
              icon: <Star className="w-8 h-8 text-yellow-400" />,
              title: "Pixel Art Detalhado",
              description: "Gráficos artesanais inspirados nos clássicos 16-bit"
            },
            {
              icon: <Moon className="w-8 h-8 text-blue-300" />,
              title: "Atmosfera Noturna",
              description: "Explore paisagens místicas sob céus estrelados"
            },
            {
              icon: <Sparkles className="w-8 h-8 text-purple-400" />,
              title: "Magia & Mistério",
              description: "Descubra segredos ocultos em cada vale"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Links sociais */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="flex gap-6 mt-16"
        >
          {[
            { icon: <Github className="w-6 h-6" />, label: "GitHub" },
            { icon: <Twitter className="w-6 h-6" />, label: "Twitter" }
          ].map((social, index) => (
            <motion.a
              key={index}
              href="#"
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Efeito de partículas flutuantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default StarfallValley;
