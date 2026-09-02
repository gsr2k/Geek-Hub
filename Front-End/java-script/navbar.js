const searchButton = document.getElementById("searchButton");
const searchBar = document.getElementById("searchBar");
const searchInput = document.getElementById("searchInput");

function toggleSearch() {
    
    const isOpen = searchBar.getAttribute('data-open') === 'true';

    if (isOpen) {
        
        searchBar.removeAttribute('data-open');
        searchInput.blur(); // Remove o foco do input
    } else {
        
        searchBar.setAttribute('data-open', 'true');
        searchInput.focus(); // Foca automaticamente para o usuário já digitar
    }
}

searchButton.addEventListener("click", toggleSearch);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        searchBar.removeAttribute('data-open');
        searchInput.blur();
    }
});