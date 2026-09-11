const API_URL = 'http://localhost:5163/api/characters';
const BASE_URL = API_URL.replace('/api/characters', '');

const characterImage = document.getElementById('characterImage');
const characterGlow = document.getElementById('characterGlow');
const heroContainer = document.querySelector('.character-hero-container');
const prevButton = document.getElementById('prevSlide');
const nextButton = document.getElementById('nextSlide');
const dotsContainer = document.querySelector('.mt-4.flex.items-center.gap-2');

let characters = [];
let currentIndex = 0;
let isAnimating = false;

const ANIM_IN  = 'animate-slide-in-right';
const ANIM_OUT = 'animate-slide-out-left';
const OUT_DURATION = 350;   // deve bater com o tempo da animação no CSS
const IN_DURATION  = 800;  // deve bater com o tempo da animação no CSS

function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function retriggerAnimation(element, animationClass) {
    if (!element) return;
    element.classList.remove(ANIM_IN, ANIM_OUT);
    void element.offsetWidth;
    element.classList.add(animationClass);
}

async function fetchCharacters() {
    try {
        console.log("Buscando dados da API...");
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        
        characters = await response.json();
        console.log("Personagens recebidos:", characters);
        
        createDots();
        updateCharacter(true);
    } catch (error) {
        console.error("Erro ao buscar personagens:", error);
    }
}

function updateCharacter(isFirstLoad = false) {
    if (characters.length === 0 || isAnimating) return;

    const character = characters[currentIndex];
    
    if (isFirstLoad) {
        characterGlow.style.backgroundColor = hexToRgba(character.glowColor, 0.2);
        characterImage.src = `${BASE_URL}${character.imageUrl}`;
        updateDots();
        return;
    }
    
    isAnimating = true;
    
    retriggerAnimation(heroContainer, ANIM_OUT);
   
    setTimeout(() => {
        characterImage.src = `${BASE_URL}${character.imageUrl}`;
        characterGlow.style.backgroundColor = hexToRgba(character.glowColor, 0.2);
        
        retriggerAnimation(heroContainer, ANIM_IN);

        setTimeout(() => {
            isAnimating = false;
        }, IN_DURATION);

    }, OUT_DURATION);

    updateDots();
}

function updateDots() {
    const dots = dotsContainer.querySelectorAll('span');
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.className = 'h-1.5 w-8 rounded-full bg-yellow-500';
        } else {
            dot.className = 'h-1.5 w-4 rounded-full bg-zinc-700 transition-all duration-300 hover:bg-zinc-500';
        }
    });
}

function createDots() {
    dotsContainer.innerHTML = ''; 
    characters.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = `h-1.5 rounded-full cursor-pointer transition-all duration-300 ${index === 0 ? 'w-8 bg-yellow-500' : 'w-4 bg-zinc-700'}`;
        dot.addEventListener('click', () => {
            if (index === currentIndex) return;
            currentIndex = index;
            updateCharacter();
        });
        dotsContainer.appendChild(dot);
    });
}

prevButton.addEventListener('click', () => {
    if (characters.length === 0) return;
    currentIndex = (currentIndex - 1 + characters.length) % characters.length;
    updateCharacter();
});

nextButton.addEventListener('click', () => {
    if (characters.length === 0) return;
    currentIndex = (currentIndex + 1) % characters.length;
    updateCharacter();
});

document.addEventListener('DOMContentLoaded', fetchCharacters);