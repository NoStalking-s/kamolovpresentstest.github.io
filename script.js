const slides = [
    "https://placehold.co/500x500?text=1",
    "https://placehold.co/500x500?text=2",
    "https://placehold.co/500x500?text=3"
];
let currentSlide = 0;
const sliderImg = document.getElementById('slider-img');

function showSlide(idx) {
    sliderImg.style.opacity = 0;
    setTimeout(() => {
        sliderImg.src = slides[idx];
        sliderImg.onload = () => {
            sliderImg.style.opacity = 1;
        };
    }, 250);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Автослайд
let autoSlideInterval = setInterval(nextSlide, 5000);

// Остановить автослайд при ручном переключении и запустить заново
document.querySelector('.slider-btn.left').onclick = () => {
    prevSlide();
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
};
document.querySelector('.slider-btn.right').onclick = () => {
    nextSlide();
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
};

// Инициализация
showSlide(currentSlide);

document.addEventListener('DOMContentLoaded', () => {
    const skillBlocks = document.querySelectorAll('.skill-block');
    const htmlcssIcon = document.querySelector('.skills-icon-htmlcss-inline');
    const uiuxIcon = document.querySelector('.skills-icon-uiux-inline');
    const jsIcon = document.querySelector('.skills-icon-js-inline');
    const otherIcon = document.querySelector('.skills-icon-other-inline');
    const revealOnScroll = () => {
        skillBlocks.forEach((block, i) => {
            const rect = block.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                setTimeout(() => block.classList.add('visible'), i * 200);
                if (block.classList.contains('skill-html') && htmlcssIcon) {
                    setTimeout(() => htmlcssIcon.classList.add('visible'), i * 200 + 100);
                }
                if (block.classList.contains('skill-design') && uiuxIcon) {
                    setTimeout(() => uiuxIcon.classList.add('visible'), i * 200 + 100);
                }
                if (block.classList.contains('skill-js') && jsIcon) {
                    setTimeout(() => jsIcon.classList.add('visible'), i * 200 + 100);
                }
                if (block.classList.contains('skill-other') && otherIcon) {
                    setTimeout(() => otherIcon.classList.add('visible'), i * 200 + 100);
                }
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});

// Сброс transform при ресайзе/скролле (чтобы не накапливался)
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.querySelectorAll('.eye-icon').forEach((eye, i) => {
        // Сохраняем базовый transform только один раз
        if (!eye.dataset.baseTransform) {
            // Получаем transform из стилей (inline или computed)
            const style = window.getComputedStyle(eye);
            eye.dataset.baseTransform = style.transform === 'none' ? '' : style.transform;
        }
        const base = eye.dataset.baseTransform;
        const speed = 0.1 + (i % 4) * 0.07;
        // Добавляем только translateY к базовому transform
        eye.style.transform = `${base} translateY(${scrollY * speed}px)`;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const setIcon = () => {
        if (document.body.classList.contains('light-theme')) {
            // Луна для светлой темы
            themeToggle.innerHTML = `
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M22 18.5A10 10 0 0 1 9.5 6c0-.5 0-1 .1-1.5A10 10 0 1 0 22 18.5Z" fill="#232a34" />
              </svg>
            `;
        } else {
            // Солнце для темной темы
            themeToggle.innerHTML = `
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="6" fill="#ffd700" stroke="#ffd700" stroke-width="2"/>
                <g stroke="#ffd700" stroke-width="2">
                    <line x1="14" y1="2" x2="14" y2="6"/>
                    <line x1="14" y1="22" x2="14" y2="26"/>
                    <line x1="2" y1="14" x2="6" y2="14"/>
                    <line x1="22" y1="14" x2="26" y2="14"/>
                    <line x1="5.1" y1="5.1" x2="8" y2="8"/>
                    <line x1="20" y1="20" x2="22.9" y2="22.9"/>
                    <line x1="5.1" y1="22.9" x2="8" y2="20"/>
                    <line x1="20" y1="8" x2="22.9" y2="5.1"/>
                </g>
              </svg>
            `;
        }
    };
    setIcon();

    // Устанавливаем тему из localStorage при загрузке
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
    setIcon();

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        setIcon();
        if (document.body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });

    // Плавный скролл по якорям меню
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const scrollTopBtn = document.getElementById('scroll-top-btn');
    const skillsSection = document.getElementById('skills');

    function toggleScrollTopBtn() {
        if (!scrollTopBtn || !skillsSection) return;
        const skillsTop = skillsSection.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY + window.innerHeight / 2 >= skillsTop) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.pointerEvents = 'none';
        }
    }

    // Скрыть кнопку по умолчанию
    if (scrollTopBtn) {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.pointerEvents = 'none';
        scrollTopBtn.style.transition = 'opacity 0.4s';
    }

    window.addEventListener('scroll', toggleScrollTopBtn);
    toggleScrollTopBtn();
});

// Меняем title, если пользователь ушёл с вкладки
const originalTitle = document.title;
let typingInterval = null;
let typingLoopActive = false;

function typeAndEraseTitleLoop(text, speed = 25, pause = 700) {
    let i = 0;
    let typing = true;
    clearInterval(typingInterval);
    typingLoopActive = true;

    function loop() {
        if (!typingLoopActive) return;
        if (typing) {
            typingInterval = setInterval(() => {
                document.title = text.slice(0, i + 1);
                i++;
                if (i > text.length) {
                    clearInterval(typingInterval);
                    setTimeout(() => {
                        typing = false;
                        i = text.length;
                        loop();
                    }, pause);
                }
            }, speed);
        } else {
            typingInterval = setInterval(() => {
                document.title = text.slice(0, i - 1);
                i--;
                if (i <= 1) { // <= 1 вместо < 0
                    clearInterval(typingInterval);
                    setTimeout(() => {
                        typing = true;
                        i = 0;
                        loop();
                    }, pause);
                }
            }, speed);
        }
    }
    loop();
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        typeAndEraseTitleLoop('Вернись!', 25, 700);
    } else {
        typingLoopActive = false;
        clearInterval(typingInterval);
        document.title = originalTitle;
    }
});

document.getElementById('scroll-top-btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const typingPhrases = [
    "Фронтенд разработчик",
    "Веб-дизайнер",
    "UI/UX специалист",
    "Создатель интерфейсов",
    "Люблю чистый код",
    "Делаю сайты удобными",
    "Работаю с Figma и GitHub"
];
const typingText = document.getElementById('typing-text');
let phraseIndex = 0;
let charIndex = 0;
let typing = true;

function typeEraseLoop() {
    if (!typingText) return;
    if (typing) {
        if (charIndex < typingPhrases[phraseIndex].length) {
            typingText.textContent = typingPhrases[phraseIndex].slice(0, charIndex + 1);
            charIndex++;
            setTimeout(typeEraseLoop, 85); // Медленнее печать
        } else {
            typing = false;
            setTimeout(typeEraseLoop, 1200); // Пауза после печати
        }
    } else {
        if (charIndex > 0) {
            typingText.textContent = typingPhrases[phraseIndex].slice(0, charIndex - 1);
            charIndex--;
            setTimeout(typeEraseLoop, 45); // Медленнее стирание
        } else {
            typing = true;
            phraseIndex = (phraseIndex + 1) % typingPhrases.length;
            setTimeout(typeEraseLoop, 1000); // Пауза перед новой фразой
        }
    }
}
typeEraseLoop();

let secretBuffer = '';

document.addEventListener('keydown', (e) => {
    secretBuffer += e.key.toLowerCase();
    if (secretBuffer.length > 6) secretBuffer = secretBuffer.slice(-6);
    if (secretBuffer === 'secret') {
        window.open('https://adult.noodlemagazine.com/video/porn+porno', '_blank');
        secretBuffer = '';
    }
});
