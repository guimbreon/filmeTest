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
        const comentarioText = movie.Comentário;
        if (comentarioText.length > 24) {
            comentario.textContent = `${comentarioText.substring(0, 24)}...`;

            // Add tooltip for full comment
            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.textContent = comentarioText;

            card.appendChild(tooltip);
        } else {
            comentario.textContent = comentarioText;
        }

        const rating = document.createElement('p');
        rating.classList.add('rating');
        if(Number.isInteger(movie.rating)){
            rating.textContent = `Rating: ${'🌕'.repeat(movie.rating)}${'🌑'.repeat(5 - movie.rating)}`;
        }else{
            rating.textContent = `Rating: ${'🌕'.repeat(movie.rating - 0.5)}`;
            rating.textContent += `🌗${'🌑'.repeat(5 - movie.rating)}`
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
