const images = [
    "https://placehold.co/180x180?text=1",
    "https://placehold.co/180x180?text=2",
    "https://placehold.co/180x180?text=3"
];
let current = 0;

function showSlide(idx) {
    const img = document.getElementById('slider-img');
    img.src = images[idx];
}

function prevSlide() {
    current = (current - 1 + images.length) % images.length;
    showSlide(current);
}

function nextSlide() {
    current = (current + 1) % images.length;
    showSlide(current);
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    showSlide(current);
    if (window.location.hash) {
        window.scrollTo(0, 0);
        history.replaceState(null, '', window.location.pathname);
    }
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    history.replaceState(null, '', window.location.pathname);
                }, 400); // чуть позже, чтобы скролл завершился
            }
        }
    });
});

const originalTitle = document.title;
const typeTitle = 'Вернись!';
let typingInterval;
let typeIndex = 0;

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        typeIndex = 0;
        clearInterval(typingInterval);
        document.title = '\u200B';
        typingInterval = setInterval(() => {
            if (typeIndex < typeTitle.length) {
                document.title = typeTitle.slice(0, typeIndex + 1);
                typeIndex++;
            } else {
                typeIndex = 0;
                document.title = '\u200B';
            }
        }, 25); // очень быстро
    } else {
        clearInterval(typingInterval);
        document.title = originalTitle;
    }
});

// Анимация появления skill-блоков и иконок при скролле
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

