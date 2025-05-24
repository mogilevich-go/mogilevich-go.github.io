let clickCount = 0;
const colors = ["#FF5733", "#33FF57", "#3357FF", "#F033FF", "#FF33A8"];
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

// Автовоспроизведение с разрешения пользователя
document.addEventListener("click", function() {
    // Счётчик кликов
    clickCount++;
    document.getElementById("clickCount").textContent = clickCount;
    
    // Смена фона
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Попытка запустить музыку при первом клике
    if (music.paused) {
        music.play().catch(e => console.log("Click to play"));
    }
});

// Кнопка вкл/выкл музыки
musicToggle.addEventListener("click", function(e) {
    e.stopPropagation(); // Чтобы не считалось за клик по странице
    
    if (music.paused) {
        music.play();
        this.textContent = "music - OFF";
    } else {
        music.pause();
        this.textContent = "music - ON";
    }
});
// Вместо music.play() используйте:
function playMusic() {
    music.volume = 0.3; // Уменьшаем громкость
    music.play()
        .then(() => musicToggle.textContent = "Music - OFF")
        .catch(e => console.log("ERROR:", e));
}
// Настройки частиц
const PARTICLE_COUNT = 100;
const COLORS = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];

// Инициализация canvas
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Хранение позиции мыши
let mouseX = null;
let mouseY = null;

// Класс частицы
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 2;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }
    
    update() {
        // "Убегание" от мыши
        if (mouseX && mouseY) {
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                this.x += dx / distance * 2;
                this.y += dy / distance * 2;
            }
        }
        
        // Движение частицы
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Отскок от границ
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Создаём частицы
let particles = [];
for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
}

// Обработчик движения мыши
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Обработчик клика (создаём взрыв частиц)
window.addEventListener('click', (e) => {
    for (let i = 0; i < 20; i++) {
        const p = new Particle();
        p.x = e.clientX;
        p.y = e.clientY;
        p.speedX = Math.random() * 6 - 3;
        p.speedY = Math.random() * 6 - 3;
        particles.push(p);
    }
});

// Анимация
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    
    requestAnimationFrame(animate);
}

// Запуск анимации и обработка ресайза
animate();
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});