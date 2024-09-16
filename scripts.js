window.addEventListener('DOMContentLoaded', () => {
    fetchExcelFile();
});

function fetchExcelFile() {
    const fileUrl = './cinefilia.xlsx'; // The Excel file in the same directory as the HTML file

    fetch(fileUrl)
        .then(response => response.arrayBuffer()) // Fetch as binary data
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' }); // Use SheetJS to read Excel file

            // Convert the first sheet to JSON
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);

            // Generate HTML movie cards based on Excel data
            generateMovieCards(jsonData);
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo Excel:', error);
        });
}

function generateMovieCards(data) {
    const container = document.getElementById('filme-container');
    container.innerHTML = ''; // Clear existing content

    data.forEach((movie, index) => {
        // Create movie card elements
        const card = document.createElement('div');
        card.classList.add('filme-card');
        card.dataset.index = index; // Store index for referencing later

        const img = document.createElement('img');
        img.src = `/images/${movie.files}.jpg`; // Image file based on 'files' column in Excel
        img.alt = `Poster do filme ${movie.nome}`;

        const title = document.createElement('h2');
        title.textContent = movie.nome;

        const comentario = document.createElement('p');
        comentario.classList.add('comentario');
        if (movie.Comentário.length >= 23) {
            comentario.innerHTML = `Comentário:<br>${movie.Comentário.substring(0, 23)} ...`;
        } else {
            comentario.innerHTML = `Comentário:<br>${movie.Comentário}`;
        }

        const rating = document.createElement('p');
        rating.classList.add('rating');
        if (Number.isInteger(movie.rating)) {
            rating.textContent = `Rating: ${'🌕'.repeat(movie.rating)}${'🌑'.repeat(5 - movie.rating)}`;
        } else {
            rating.textContent = `Rating: ${'🌕'.repeat(movie.rating - 0.5)}`;
            rating.textContent += `🌗${'🌑'.repeat(5 - movie.rating)}`;
        }

        // Add click event listener for displaying more details
        card.addEventListener('click', () => {
            showMovieDetails(movie); // Function to display full details
        });

        // Append the elements to the card
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(comentario);
        card.appendChild(rating);

        // Append the card to the container
        container.appendChild(card);
    });
}

function showMovieDetails(movie) {
    // Create a modal or larger card with more information
    const modal = document.createElement('div');
    modal.classList.add('modal');
    
    const modalContent = `
        <div class="modal-content">
            <h2>${movie.nome}</h2>
            <img src="${movie.files}.jpg" alt="Poster do filme ${movie.nome}">
            <p><strong>Rating:</strong> ${movie.rating}/5</p>
            <p><strong>Comentário Completo:</strong> ${movie.Comentário}</p>
            <p><strong>Gêneros:</strong> ${movie.genre}</p>
            <button id="close-modal">Fechar</button>
        </div>
    `;
    
    modal.innerHTML = modalContent;

    // Append the modal to the body
    document.body.appendChild(modal);

    // Close modal functionality
    document.getElementById('close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}
