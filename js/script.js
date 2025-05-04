document.addEventListener('DOMContentLoaded', function() {
    // Initialize music player
    initMusicPlayer();
    
    // Create a confetti effect when the page loads
    createConfetti();
    
    // Add more colorful hearts that float up when scrolling
    createFloatingHearts();
    
    // Add twinkling stars effect
    createTwinklingStars();
    
    // Add parallax effect to the floating elements
    window.addEventListener('mousemove', function(e) {
        const flowers = document.querySelectorAll('.flower');
        const hearts = document.querySelectorAll('.heart');
        const butterflies = document.querySelectorAll('.butterfly');
        
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        flowers.forEach(flower => {
            const speed = parseFloat(flower.getAttribute('data-speed') || 0.05);
            const x = (window.innerWidth - e.clientX * speed) * 0.1;
            const y = (window.innerHeight - e.clientY * speed) * 0.1;
            
            flower.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
        
        butterflies.forEach(butterfly => {
            const speed = parseFloat(butterfly.getAttribute('data-speed') || 0.08);
            const x = (window.innerWidth - e.clientX * speed) * 0.15;
            const y = (window.innerHeight - e.clientY * speed) * 0.15;
            
            butterfly.style.transform += ` translateX(${x}px) translateY(${y}px)`;
        });
        
        document.querySelector('.title').style.textShadow = `
            ${(mouseX - 0.5) * 10}px ${(mouseY - 0.5) * 10}px 5px rgba(255, 64, 129, 0.3)
        `;
        
        document.querySelector('.subtitle').style.textShadow = `
            ${(mouseX - 0.5) * 5}px ${(mouseY - 0.5) * 5}px 5px rgba(156, 39, 176, 0.3)
        `;
    });
    
    // Music player functionality
    function initMusicPlayer() {
        const musicButton = document.getElementById('music-toggle');
        const backgroundMusic = document.getElementById('background-music');
        const musicText = musicButton.querySelector('.music-text');
        
        // Check if audio file exists
        backgroundMusic.addEventListener('error', function() {
            musicButton.disabled = true;
            musicText.textContent = 'Music Unavailable';
            musicButton.style.opacity = '0.5';
            musicButton.style.cursor = 'not-allowed';
            
            // Show notification about adding music
            const notice = document.createElement('div');
            notice.className = 'music-notice';
            notice.innerHTML = '<p>Please add an MP3 file to the "music" folder and name it "background-music.mp3"</p>';
            notice.style.cssText = `
                background-color: rgba(255, 255, 255, 0.9);
                padding: 10px;
                text-align: center;
                position: fixed;
                top: 70px;
                right: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                z-index: 2000;
                font-size: 12px;
                max-width: 300px;
            `;
            document.body.appendChild(notice);
            
            // Remove notice after 8 seconds
            setTimeout(() => {
                notice.style.opacity = '0';
                notice.style.transition = 'opacity 1s ease';
                setTimeout(() => notice.remove(), 1000);
            }, 8000);
        });
        
        // Toggle music play/pause
        musicButton.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play()
                    .then(() => {
                        musicButton.classList.add('playing');
                        musicText.textContent = 'Pause Music';
                    })
                    .catch(error => {
                        console.error('Error playing music:', error);
                        // Handle autoplay restrictions
                        if (error.name === 'NotAllowedError') {
                            alert('Please interact with the page first before playing music (browser policy).');
                        }
                    });
            } else {
                backgroundMusic.pause();
                musicButton.classList.remove('playing');
                musicText.textContent = 'Play Music';
            }
        });
        
        // Add volume controls with keyboard
        document.addEventListener('keydown', function(e) {
            // Volume up with Arrow Up
            if (e.key === 'ArrowUp') {
                backgroundMusic.volume = Math.min(1, backgroundMusic.volume + 0.1);
            }
            // Volume down with Arrow Down
            if (e.key === 'ArrowDown') {
                backgroundMusic.volume = Math.max(0, backgroundMusic.volume - 0.1);
            }
            // Mute/unmute with 'M'
            if (e.key === 'm' || e.key === 'M') {
                backgroundMusic.muted = !backgroundMusic.muted;
            }
        });
    }
    
    // Add data-speed attribute to flowers for parallax effect
    const flowers = document.querySelectorAll('.flower');
    flowers.forEach((flower, index) => {
        flower.setAttribute('data-speed', 0.03 + (index * 0.01));
    });
    
    // Add data-speed attribute to butterflies for parallax effect
    const butterflies = document.querySelectorAll('.butterfly');
    butterflies.forEach((butterfly, index) => {
        butterfly.setAttribute('data-speed', 0.08 + (index * 0.02));
    });
    
    // Add pulsing effect to photos
    const photos = document.querySelectorAll('.photo img');
    photos.forEach(photo => {
        photo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.filter = 'brightness(1.1)';
        });
        
        photo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.filter = 'brightness(1)';
        });
    });
    
    // Add glowing effect to son's photo
    const sonPhoto = document.querySelector('.son-photo img');
    if (sonPhoto) {
        sonPhoto.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.2) contrast(1.1)';
            this.parentElement.style.boxShadow = '0 0 20px rgba(255, 64, 129, 0.8)';
        });
        
        sonPhoto.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) contrast(1)';
            this.parentElement.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
    }
    
    // Function to create confetti effect
    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random position, size, and color
            const left = Math.random() * 100;
            const width = Math.random() * 10 + 5;
            const height = Math.random() * 10 + 5;
            const backgroundColor = getRandomColor();
            
            // Random animation duration and delay
            const animationDuration = Math.random() * 3 + 2;
            const animationDelay = Math.random() * 5;
            
            confetti.style.cssText = `
                position: fixed;
                left: ${left}vw;
                top: -5vh;
                width: ${width}px;
                height: ${height}px;
                background-color: ${backgroundColor};
                z-index: 1000;
                opacity: 0;
                pointer-events: none;
                animation: fall ${animationDuration}s ease-in ${animationDelay}s infinite;
            `;
            
            document.body.appendChild(confetti);
        }
        
        // Add the animation to the stylesheet
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = `
            @keyframes fall {
                0% { transform: translateY(0) rotate(0); opacity: 1; }
                100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // Function to create floating hearts
    function createFloatingHearts() {
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = `
            @keyframes floatUp {
                0% { transform: translateY(100vh) scale(0); opacity: 0; }
                20% { opacity: 1; }
                80% { opacity: 1; }
                100% { transform: translateY(-20vh) scale(1.5); opacity: 0; }
            }
            
            .floating-heart {
                position: fixed;
                z-index: 999;
                pointer-events: none;
                animation: floatUp 10s linear infinite;
            }
        `;
        document.head.appendChild(styleSheet);
        
        // Create 20 floating hearts
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 1500);
        }
        
        // Create a new floating heart every 3 seconds
        setInterval(createFloatingHeart, 3000);
    }
    
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        
        // Random size and position
        const size = Math.random() * 20 + 10;
        const left = Math.random() * 100;
        
        // Random animation duration
        const duration = Math.random() * 5 + 8;
        
        // Create SVG heart with random color
        const color = getRandomColor();
        heart.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>`;
        
        heart.style.cssText = `
            left: ${left}vw;
            bottom: -50px;
            animation-duration: ${duration}s;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        document.body.appendChild(heart);
        
        // Remove the heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, duration * 1000 + 2000);
    }
    
    // Function to create twinkling stars
    function createTwinklingStars() {
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = `
            @keyframes twinkle {
                0%, 100% { opacity: 0.2; transform: scale(0.8); }
                50% { opacity: 1; transform: scale(1.2); }
            }
            
            .star {
                position: fixed;
                background-color: white;
                border-radius: 50%;
                pointer-events: none;
                z-index: 998;
                box-shadow: 0 0 5px white;
                animation: twinkle linear infinite;
            }
        `;
        document.head.appendChild(styleSheet);
        
        // Create stars
        for (let i = 0; i < 30; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random position, size, and animation
            const size = Math.random() * 3 + 1;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            
            star.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                top: ${top}vh;
                left: ${left}vw;
                animation-duration: ${duration}s;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            document.body.appendChild(star);
        }
    }
    
    // Function to get random color
    function getRandomColor() {
        const colors = [
            '#ff4081', '#e91e63', '#9c27b0', '#673ab7',
            '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
            '#009688', '#4caf50', '#8bc34a', '#cddc39',
            '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'
        ];
        
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Handle image errors - show default image if the specified ones are not available
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.onerror = function() {
            // Set placeholder image or styling for failed images
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f3f3f3"/><text x="50%" y="50%" font-family="Arial" font-size="14" text-anchor="middle" fill="%23999">Image Placeholder</text></svg>';
            
            // Add a message to notify user to add images
            if (!document.querySelector('.image-notice')) {
                const notice = document.createElement('div');
                notice.className = 'image-notice';
                notice.innerHTML = '<p>Please add your photos to the "images" folder and name them as shown in the HTML file.</p>';
                notice.style.cssText = `
                    background-color: rgba(255, 255, 255, 0.9);
                    padding: 10px;
                    text-align: center;
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                    z-index: 2000;
                `;
                document.body.appendChild(notice);
                
                // Remove notice after 10 seconds
                setTimeout(() => {
                    notice.style.opacity = '0';
                    notice.style.transition = 'opacity 1s ease';
                    setTimeout(() => notice.remove(), 1000);
                }, 10000);
            }
        };
    });
});
