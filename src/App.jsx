import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import './App.css';

// Import dos sprites
import pixelBackground from './assets/pixel_art_background.png';
import girlIdle from './assets/girl_idle.png';
import girlSittingUp from './assets/girl_sitting_up.png';
import girlSitting from './assets/girl_sitting.png';
import girlReading from './assets/girl_reading.png';

const StarfallValley = () => {
  const pixiContainer = useRef(null);
  const appRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showNotebook, setShowNotebook] = useState(false);
  const [notebookPage, setNotebookPage] = useState(0);

  const notebookTexts = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt."
  ];

  useEffect(() => {
    const initApp = async () => {
      try {
        // Criar aplicação PIXI
        const app = new PIXI.Application();
        await app.init({
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: 0x1a1a2e,
          resizeTo: window
        });

        appRef.current = app;
        if (pixiContainer.current) {
          pixiContainer.current.appendChild(app.canvas);
        }

        // Container principal
        const mainContainer = new PIXI.Container();
        app.stage.addChild(mainContainer);

        // Carregar texturas
        const backgroundTexture = await PIXI.Assets.load(pixelBackground);
        const background = new PIXI.Sprite(backgroundTexture);
        background.width = app.screen.width;
        background.height = app.screen.height;
        mainContainer.addChild(background);

        // Sprites da garota
        const girlIdleTexture = await PIXI.Assets.load(girlIdle);
        const girlSittingUpTexture = await PIXI.Assets.load(girlSittingUp);
        const girlSittingTexture = await PIXI.Assets.load(girlSitting);
        const girlReadingTexture = await PIXI.Assets.load(girlReading);

        // Sprite da garota (posicionado no centro-inferior)
        const girlSprite = new PIXI.Sprite(girlIdleTexture);
        girlSprite.anchor.set(0.5, 1);
        girlSprite.x = app.screen.width * 0.5;
        girlSprite.y = app.screen.height * 0.8;
        girlSprite.scale.set(2);
        mainContainer.addChild(girlSprite);

        // Estrelas cintilantes
        const stars = [];
        for (let i = 0; i < 50; i++) {
          const star = new PIXI.Graphics();
          star.beginFill(0xffffff);
          star.drawCircle(0, 0, Math.random() * 2 + 1);
          star.endFill();
          star.x = Math.random() * app.screen.width;
          star.y = Math.random() * app.screen.height * 0.6;
          star.alpha = Math.random() * 0.8 + 0.2;
          mainContainer.addChild(star);
          stars.push(star);
        }

        // Animação das estrelas
        app.ticker.add(() => {
          stars.forEach((star, index) => {
            star.alpha = 0.2 + Math.sin(Date.now() * 0.001 + index) * 0.3;
          });
        });

        // Função para criar estrelas cadentes
        const createShootingStar = () => {
          const shootingStar = new PIXI.Graphics();
          shootingStar.beginFill(0xffffff);
          shootingStar.drawCircle(0, 0, 2);
          shootingStar.endFill();
          shootingStar.x = Math.random() * app.screen.width;
          shootingStar.y = Math.random() * app.screen.height * 0.3;
          
          const trail = new PIXI.Graphics();
          trail.lineStyle(2, 0xffffff, 0.5);
          trail.moveTo(0, 0);
          trail.lineTo(-20, -10);
          shootingStar.addChild(trail);
          
          mainContainer.addChild(shootingStar);

          // Animação da estrela cadente
          const speed = 3 + Math.random() * 2;
          const angle = Math.PI / 4 + Math.random() * Math.PI / 4;
          
          const animate = () => {
            shootingStar.x += Math.cos(angle) * speed;
            shootingStar.y += Math.sin(angle) * speed;
            shootingStar.alpha -= 0.01;
            
            if (shootingStar.alpha <= 0 || shootingStar.x > app.screen.width || shootingStar.y > app.screen.height) {
              mainContainer.removeChild(shootingStar);
            } else {
              requestAnimationFrame(animate);
            }
          };
          animate();
        };

        // Criar estrelas cadentes periodicamente
        setInterval(createShootingStar, 3000 + Math.random() * 5000);

        // Botão de interação
        const button = new PIXI.Graphics();
        button.beginFill(0x6b46c1);
        button.drawRoundedRect(0, 0, 200, 50, 10);
        button.endFill();
        button.x = app.screen.width / 2 - 100;
        button.y = app.screen.height - 100;
        button.interactive = true;
        button.cursor = 'pointer';
        
        const buttonText = new PIXI.Text('Levantar e Ler', {
          fontFamily: 'Arial',
          fontSize: 16,
          fill: 0xffffff,
          align: 'center'
        });
        buttonText.anchor.set(0.5);
        buttonText.x = 100;
        buttonText.y = 25;
        button.addChild(buttonText);
        
        mainContainer.addChild(button);

        // Animação stop-motion
        const animateGirl = async () => {
          if (isAnimating) return;
          setIsAnimating(true);
          
          // Sequência de sprites
          const sprites = [girlIdleTexture, girlSittingUpTexture, girlSittingTexture, girlReadingTexture];
          
          for (let i = 0; i < sprites.length; i++) {
            girlSprite.texture = sprites[i];
            await new Promise(resolve => setTimeout(resolve, 800));
          }
          
          // Remover botão e mostrar overlay do caderno
          mainContainer.removeChild(button);
          setShowNotebook(true);
          setIsAnimating(false);
        };

        button.on('pointerdown', animateGirl);

      } catch (error) {
        console.error('Erro ao inicializar PixiJS:', error);
      }
    };

    initApp();

    // Cleanup
    return () => {
      if (appRef.current) {
        appRef.current.destroy(true);
      }
    };
  }, []);

  const nextPage = () => {
    setNotebookPage((prev) => (prev + 1) % notebookTexts.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div ref={pixiContainer} className="w-full h-full" />
      
      {/* Overlay do caderno */}
      {showNotebook && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-yellow-100 p-8 rounded-lg max-w-md mx-4 relative">
            <div className="text-gray-800 text-sm leading-relaxed mb-4">
              {notebookTexts[notebookPage]}
            </div>
            <button
              onClick={nextPage}
              className="absolute bottom-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
            >
              ⮞
            </button>
            <div className="absolute top-4 right-4 text-xs text-gray-500">
              {notebookPage + 1} / {notebookTexts.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StarfallValley;

