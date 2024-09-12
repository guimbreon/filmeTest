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

    data.forEach(movie => {
        // Create movie card elements
        const card = document.createElement('div');
        card.classList.add('filme-card');

        const img = document.createElement('img');
        img.src = `${movie.files}.jpg`; // Image file based on 'files' column in Excel
        img.alt = `Poster do filme ${movie.nome}`;

        const title = document.createElement('h2');
        title.textContent = movie.nome;

        const comentario = document.createElement('p');
        comentario.classList.add('comentario');
        comentario.textContent = `Comentário: ${movie.Comentário}`;

        const rating = document.createElement('p');
        rating.classList.add('rating');
        if(isInteger(movie.rating)){
            rating.textContent = `Rating: ${'🌕'.repeat(movie.rating)}${'🌑'.repeat(5 - movie.rating)}`;
        }else{
            rating.textContent = `Rating: ${'🌕'.repeat(movie.rating - 0.5)}`;
            rating.textContent += `'🌓'${'🌑'.repeat(5 - movie.rating)}`
        }
        

        // Append the elements to the card
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(comentario);
        card.appendChild(rating);

        // Append the card to the container
        container.appendChild(card);
    });
}
