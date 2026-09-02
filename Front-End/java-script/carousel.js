// ⚠️ TROQUE O 7199 PELA SUA PORTA QUE APARECEU NO TERMINAL
const API_URL = 'http://localhost:5163/api/characters';

const characterImage = document.getElementById('characterImage');
const characterGlow = document.getElementById('characterGlow');
const prevButton = document.getElementById('prevSlide');
const nextButton = document.getElementById('nextSlide');
const dotsContainer = document.querySelector('.mt-4.flex.items-center.gap-2'); // Ajustei aqui

let characters = [];
let currentIndex = 0;

async function fetchCharacters() {
    try {
        console.log("Buscando dados da API...");
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        
        characters = await response.json();
        console.log("Personagens recebidos:", characters);
        
        createDots();
        updateCharacter();
    } catch (error) {
        console.error("Erro ao buscar personagens (verifique se o dotnet está rodando):", error);
    }
}

function updateCharacter() {
    if (characters.length === 0) return;

    const character = characters[currentIndex];
    
    // Monta a URL completa da imagem (Localhost do Backend + caminho do JSON)
    // Se a API retorna "/images/MeguminAsset.png", aqui vira "https://localhost:7199/images/MeguminAsset.png"
    characterImage.src = `${API_URL.replace('/api/characters', '')}${character.imageUrl}`;
    
    // Atualiza o Glow
    characterGlow.style.backgroundColor = character.glowColor;
    
    // Atualiza as bolinhas
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
            currentIndex = index;
            updateCharacter();
        });
        dotsContainer.appendChild(dot);
    });
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + characters.length) % characters.length;
    updateCharacter();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % characters.length;
    updateCharacter();
});

document.addEventListener('DOMContentLoaded', fetchCharacters);