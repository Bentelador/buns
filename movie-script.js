const params = new URLSearchParams(window.location.search);
const ids = params.get("id");

function toggleFilterPanel() {
    const filterPanel = document.getElementById('filterPanel');
    const overlay = document.querySelector('.overlay') || createOverlay();
    
    filterPanel.classList.toggle('active');
    overlay.classList.toggle('active');
}

function toggleProfilePanel() {
    const profilePanel = document.getElementById('profilePanel');
    const overlay = document.querySelector('.overlay') || createOverlay();
    
    profilePanel.classList.toggle('active');
    overlay.classList.toggle('active');
}

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.onclick = closeAllPanels;
    document.body.appendChild(overlay);
    return overlay;
}

function closeAllPanels() {
    document.getElementById('filterPanel').classList.remove('active');
    document.getElementById('profilePanel').classList.remove('active');
    document.querySelector('.overlay').classList.remove('active');
    hideSearchSuggestions();
}


// Filter functionality
function applyGenreFilter() {
    const selectedGenres = [];
    const checkboxes = document.querySelectorAll('.genre-checkbox input:checked');
    
    checkboxes.forEach(checkbox => {
        selectedGenres.push(checkbox.value);
    });
    
    if (selectedGenres.length === 0) {
        alert('Please select at least one genre');
        return;
    }
    
    console.log('Filtering by genres:', selectedGenres);
    alert(`Filtering movies by: ${selectedGenres.join(', ')}`);
    closeAllPanels();
}

async function loadMovies() {
        const response = await fetch('https://raw.githubusercontent.com/Bentelador/movie-bai/refs/heads/main/MDB.json');
        let Movies = await response.json();
        Movies = Movies.filter(n => n.id.includes(ids));
        const buns = document.getElementById('main-content').innerHTML;
        document.getElementById('main-content').innerHTML = ``;
        document.getElementById('main-content').innerHTML = `
        <iframe  class="main-watch" id="main-watch" src="https://vidsrc.to/embed/movie/${ids}" allow="fullscreen;"></iframe>
            <div class="thumb-desc-container">
                <div class="thumbnail-container">
                    <img class="thumbnail" src="${Movies[0].image}" alt="">
                </div>
                <div class="title-desc">
                    <div class="title"><h1>${Movies[0].title}</div> <br>
                    <div class="desc">"${Movies[0].synopsis}"</div>
                    <div class="li-datas">
                        <ul>
                            <li>Genre: ${Movies[0].genre}</li>
                            <li>Year: ${Movies[0].year}</li>
                            <li>Ratings: ${Movies[0].rating} ⭐</li>
                        </ul>
                    </div>
                </div>                    
            </div>`;
            console.log(buns);
}

loadMovies()