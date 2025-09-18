// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏪 ¡Bienvenido al código del Kiosko VR! 🍭');
    console.log('🎮 ¿Desarrollador curioso? ¡Nos encanta la curiosidad! 🚀');
    console.log('✨ Este proyecto fue hecho con mucho amor y muchas golosinas virtuales ✨');
    
    initializeAnimations();
    initializeInteractions();
});

// ===== NAVEGACIÓN SUAVE =====
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== NAVBAR DINÁMICO =====
function initializeNavbar() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const scrolled = window.scrollY;
        
        if (scrolled > 100) {
            navbar.style.background = 'rgba(255, 107, 157, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.transform = 'translateY(0)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #FF6B9D, #C44569, #F8B500)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
}

// ===== ANIMACIONES DE SCROLL =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Animación escalonada para tarjetas
                if (entry.target.classList.contains('card')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) rotate(0deg)';
                    }, index * 100);
                } else {
                    entry.target.classList.add('visible');
                }
                
                // Animación especial para elementos de timeline
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.animationPlayState = 'running';
                }
            }
        });
    }, observerOptions);

    // Observar todos los elementos animados
    document.querySelectorAll('.card, .timeline-item, .fade-in-up').forEach((el, index) => {
        if (el.classList.contains('card')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(80px) rotate(-5deg)';
            el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }
        observer.observe(el);
    });
}

// ===== NAVEGACIÓN ACTIVA CON EMOJIS =====
function initializeActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-item a');
        
    window.addEventListener('scroll', () => {
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.floatOffsetTop;
            if (scrollY >= sectionTop - 60) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`)
                item.classList.add('active'); {
            }
        });
    });
}

// ===== SNACKS FLOTANTES INTERACTIVOS =====
function initializeFloatingSnacks() {
    document.querySelectorAll('.floating-snack').forEach((snack, index) => {
        snack.addEventListener('mouseenter', () => {
            snack.style.fontSize = '3rem';
            snack.style.animation = 'none';
            snack.style.transform = 'scale(1.5) rotate(0deg)';
            snack.style.opacity = '0.5';
            snack.style.pointerEvents = 'auto';
        });
        
        snack.addEventListener('mouseleave', () => {
            snack.style.fontSize = '2rem';
            snack.style.animation = `float 15s infinite`;
            snack.style.animationDelay = `${index * -2}s`;
            snack.style.opacity = '0.1';
            snack.style.pointerEvents = 'none';
        });

        // Hacer clickeable para diversión extra
        snack.addEventListener('click', () => {
            createSnackExplosion(snack);
        });
    });
}

// ===== INTERACCIONES DE TARJETAS =====
function initializeCardInteractions() {
    document.querySelectorAll('.card').forEach(card => {
        // Animación de flotación sutil
        let floatAnimation;
        
        const startFloating = () => {
            floatAnimation = setInterval(() => {
                if (!card.matches(':hover')) {
                    const currentTransform = card.style.transform || '';
                    const floatOffset = Math.sin(Date.now() / 1000) * 2;
                    card.style.transform = currentTransform.replace(/translateY\([^)]*\)/, '') + 
                                         ` translateY(${floatOffset}px)`;
                }
            }, 50);
        };

        // Efectos de hover mejorados
        card.addEventListener('mouseenter', () => {
            clearInterval(floatAnimation);
            card.style.transform = 'scale(1.05)';
            
            // Añadir emoji de snack aleatorio
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            startFloating();
        });

        // Iniciar animación de flotación
        startFloating();
    });
}

// ===== EFECTOS ESPECIALES DEL TIMELINE =====
function initializeTimelineEffects() {
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            const dot = item.querySelector('.timeline-dot');
            if (dot) {
                dot.style.background = 'linear-gradient(45deg, #FF6B9D, #C44569)';
                dot.style.transform = 'translateX(-50%) scale(1.5)';
                dot.style.boxShadow = '0 8px 25px rgba(255, 107, 157, 0.6)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const dot = item.querySelector('.timeline-dot');
            if (dot) {
                dot.style.background = 'linear-gradient(45deg, #FFD93D, #FFA726)';
                dot.style.transform = 'translateX(-50%) scale(1)';
                dot.style.boxShadow = '0 4px 15px rgba(255, 215, 61, 0.4)';
            }
        });
    });
}

// ===== PLACEHOLDERS DE MEDIA INTERACTIVOS =====
function initializeMediaPlaceholders() {
    document.querySelectorAll('.media-placeholder').forEach(placeholder => {
        const originalText = placeholder.textContent;
        
        placeholder.addEventListener('click', () => {
            // Animación de "carga" divertida
            placeholder.innerHTML = '🎬 ¡Cargando diversión! 🎮';
            placeholder.style.background = 'linear-gradient(45deg, #FF6B9D, #FFD93D)';
            placeholder.style.color = 'white';
            placeholder.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                placeholder.innerHTML = '📹 ¡Aquí iría tu contenido increíble!';
                setTimeout(() => {
                    placeholder.innerHTML = originalText;
                    placeholder.style.background = 'linear-gradient(45deg, #FFE4E6, #E8F4FD, #FFF2CC)';
                    placeholder.style.color = '#C44569';
                    placeholder.style.transform = 'scale(1)';
                }, 2000);
            }, 1000);
        });

        // Efecto de hover mejorado
        placeholder.addEventListener('mouseenter', () => {
            if (!placeholder.classList.contains('loading')) {
                placeholder.style.transform = 'scale(1.02) rotate(1deg)';
            }
        });

        placeholder.addEventListener('mouseleave', () => {
            if (!placeholder.classList.contains('loading')) {
                placeholder.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// ===== SISTEMA DE SPARKLES =====
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: fixed;
        font-size: 1rem;
        pointer-events: none;
        z-index: 9999;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        animation: sparkleFloat 3s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 3000);
}

function initializeSparkles() {
    // Crear sparkles periódicamente
    setInterval(createSparkle, 3000);
    
    // Sparkles al hacer clic en cualquier parte
    document.addEventListener('click', (e) => {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const clickSparkle = document.createElement('div');
                clickSparkle.innerHTML = '✨';
                clickSparkle.style.cssText = `
                    position: fixed;
                    font-size: 1.2rem;
                    pointer-events: none;
                    z-index: 9999;
                    left: ${e.clientX + (Math.random() - 0.5) * 100}px;
                    top: ${e.clientY + (Math.random() - 0.5) * 100}px;
                    animation: sparkleFloat 2s ease-out forwards;
                `;
                document.body.appendChild(clickSparkle);
                setTimeout(() => clickSparkle.remove(), 2000);
            }, i * 100);
        }
    });
}

// ===== FUNCIONES AUXILIARES =====
function addRandomSnackEmoji(card) {
    const snacks = ['🍿', '🍭', '🥤', '🍪', '🧁', '🍫', '🍩', '🍰'];
    const randomSnack = snacks[Math.floor(Math.random() * snacks.length)];
    
    if (!card.querySelector('.hover-snack')) {
        const snackElement = document.createElement('div');
        snackElement.className = 'hover-snack';
        snackElement.innerHTML = randomSnack;
        snackElement.style.cssText = `
            position: absolute;
            top: -10px;
            right: -10px;
            font-size: 1.5rem;
            animation: bounce 0.6s ease-out;
            z-index: 10;
            pointer-events: none;
        `;
        card.appendChild(snackElement);
    }
}

function removeSnackEmoji(card) {
    const hoverSnack = card.querySelector('.hover-snack');
    if (hoverSnack) {
        hoverSnack.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => hoverSnack.remove(), 300);
    }
}

function createSnackExplosion(snack) {
    const rect = snack.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Crear múltiples snacks que explotan desde el centro
    for (let i = 0; i < 8; i++) {
        const explosionSnack = document.createElement('div');
        explosionSnack.innerHTML = snack.innerHTML;
        explosionSnack.style.cssText = `
            position: fixed;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 10000;
            left: ${centerX}px;
            top: ${centerY}px;
            animation: explode${i} 1s ease-out forwards;
        `;
        document.body.appendChild(explosionSnack);
        setTimeout(() => explosionSnack.remove(), 1000);
    }
    
    // Crear animaciones de explosión dinámicamente
    createExplosionAnimations();
}

function createExplosionAnimations() {
    const style = document.createElement('style');
    let animations = '';
    
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const distance = 100;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        animations += `
            @keyframes explode${i} {
                0% { 
                    transform: translate(0, 0) scale(1) rotate(0deg); 
                    opacity: 1; 
                }
                100% { 
                    transform: translate(${x}px, ${y}px) scale(0.5) rotate(360deg); 
                    opacity: 0; 
                }
            }
        `;
    }
    
    style.textContent = animations;
    document.head.appendChild(style);
    setTimeout(() => style.remove(), 2000);
}

// ===== EFECTOS DE TECLADO =====
function initializeKeyboardEffects() {
    document.addEventListener('keydown', (e) => {
        // Easter eggs con teclas
        if (e.key === ' ') { // Espacio
            createSparkle();
        }
        
        if (e.key.toLowerCase() === 's') { // Tecla S
            const randomSnack = document.querySelector('.floating-snack');
            if (randomSnack) {
                createSnackExplosion(randomSnack);
            }
        }
    });
}

// ===== INICIALIZACIÓN PRINCIPAL =====
function initializeAnimations() {
    initializeSmoothScrolling();
    initializeNavbar();
    initializeScrollAnimations();
    initializeActiveNavigation();
    initializeSparkles();
    initializeKeyboardEffects();
}

function initializeInteractions() {
    initializeFloatingSnacks();
    initializeCardInteractions();
    initializeTimelineEffects();
    initializeMediaPlaceholders();
}

// ===== RESIZE HANDLER =====
window.addEventListener('resize', () => {
    // Reajustar animaciones si es necesario
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.transform = 'translateY(0) rotate(0deg) scale(1)';
    });
});

// ===== VISIBILITY CHANGE HANDLER =====
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Reactivar animaciones cuando la página vuelva a ser visible
        console.log('🎮 ¡De vuelta al kiosko! 🍭');
    }
});

// ===== PERFORMANCE MONITOR =====
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            if (loadTime > 3000) {
                console.log('⚠️ Carga lenta detectada. Optimizando animaciones...');
                // Reducir animaciones en dispositivos lentos
                document.body.classList.add('reduced-motion');
            }
        });
    }
}

// Inicializar monitor de rendimiento
monitorPerformance(); 