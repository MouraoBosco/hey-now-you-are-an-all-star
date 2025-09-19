document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    const playButton = document.createElement("button");
    playButton.id = "play-button";
    playButton.textContent = "Jogar Agora";
    app.appendChild(playButton);

    const fadeOverlay = document.createElement("div");
    fadeOverlay.classList.add("fade-overlay");
    document.body.appendChild(fadeOverlay);

    const emoticon = document.createElement("img");
    emoticon.src = "thumbs-up-emoji.png";
    emoticon.alt = "Thumbs up emoji";
    emoticon.classList.add("emoticon");
    document.body.appendChild(emoticon);

    // Gerar estrelas
    for (let i = 0; i < 50; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 60}%`;
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.opacity = Math.random() * 0.8 + 0.2;
        star.style.animationDelay = `${Math.random() * 3}s`;
        app.appendChild(star);
    }

    // Gerar estrelas cadentes
    setInterval(() => {
        const shootingStar = document.createElement("div");
        shootingStar.classList.add("shooting-star");
        const startX = Math.random() * 100;
        const startY = Math.random() * 30;
        shootingStar.style.left = `${startX}%`;
        shootingStar.style.top = `${startY}%`;
        const duration = Math.random() * 2 + 1;
        shootingStar.style.animationDuration = `${duration}s`;
        app.appendChild(shootingStar);

        setTimeout(() => {
            shootingStar.remove();
        }, duration * 1000);
    }, 3000 + Math.random() * 5000);

    playButton.addEventListener("click", () => {
        fadeOverlay.style.opacity = 0.8;
        emoticon.style.transform = "translate(-50%, -50%) scale(1)";
        playButton.style.display = "none";

        setTimeout(() => {
            fadeOverlay.style.opacity = 0;
            emoticon.style.transform = "translate(-50%, -50%) scale(0)";
            playButton.style.display = "block";
        }, 3000);
    });
});

