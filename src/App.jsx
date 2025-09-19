import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, Moon, Sparkles, Download, Github, Twitter } from 'lucide-react';
import './App.css';
import starryNightScene from '../public/starry-night-scene.png';
import thumbsUpEmoji from '../public/thumbs-up-emoji.png';

const StarfallValley = () => {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEmoticon, setShowEmoticon] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

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
    console.log('Play button clicked!');
    setIsPlaying(true);
    setFadeOut(true);
    setShowEmoticon(true);
    
    // Após 3 segundos, esconder o emoticon e voltar ao normal
    setTimeout(() => {
      setShowEmoticon(false);
      setFadeOut(false);
      setIsPlaying(false);
    }, 3000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-blue-900 to-purple-900">
      {/* Fundo de pixel art com parallax */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(/starry-night-scene.png)`,
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

        {/* Imagem da garota */}
        <motion.img
          src="/starry-night-scene.png"
          alt="Garota olhando as estrelas"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-auto w-full object-cover object-bottom"
          style={{ maxHeight: '80%', width: 'auto' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        />

        {/* Grama com animação de vento (simulada) */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-transparent overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-green-700 opacity-0 grass-animation" style={{ transformOrigin: 'bottom center' }}></div>
        </div>
      </div>

      {/* Estrelas cintilantes */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full star-twinkle-animation"
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
              x: [0, (shootingStar.endX - shootingStar.startX) * window.innerWidth / 100],
              y: [0, (shootingStar.endY - shootingStar.startY) * window.innerHeight / 100],
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

      {/* Overlay de fade quando o botão play é clicado */}
      <AnimatePresence>
        {fadeOut && (
          <motion.div
            className="fixed inset-0 bg-black z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      {/* Emoticon que aparece após o fade */}
      <AnimatePresence>
        {showEmoticon && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.img
              src="/thumbs-up-emoji.png"
              alt="Thumbs up emoji"
              className="w-64 h-64 md:w-80 md:h-80"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StarfallValley;
