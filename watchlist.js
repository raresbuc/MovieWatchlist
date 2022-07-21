const movieWatchlist = document.getElementById("movie-watchlist")
const removeBtn = document.getElementById("remove-btn")


function displayMovies() {
    movieWatchlist.innerHTML = ""
    const savedMovies = JSON.parse(localStorage.getItem("movies"))

    if (savedMovies === null || savedMovies.length === 0) {
        movieWatchlist.innerHTML = `
            <div class="placeholder1">
                Your watchlist is looking a little empty...
            </div>

            <div>
                <a href="index.html" class="placeholder2">
                    <i class="fa-solid fa-circle-plus"></i>
                    <p>Let's add some movies!</p>
                </a>
            </div>
        `
    }

    if(savedMovies.length > 0) {
        for (let i = 0; i < savedMovies.length; i++) {
            movieWatchlist.innerHTML += `
                <div class="movie" id="${savedMovies[i].imdbID}">
                    <img src="${savedMovies[i].Poster}" class="film-cover">

                    <div class="movie-info">
                        <div class="movie-info-1">
                            <h3 class="film-title">${savedMovies[i].Title}</h3>
                            <p class="film-rating">${savedMovies[i].Value}</p>
                        </div>

                        <div class="movie-info-2">
                            <p class="film-run-time">${savedMovies[i].Runtime}</p>
                            <p class="film-genre">${savedMovies[i].Genre}</p>
                            <button class="remove-watch" id="remove-btn" onclick="removeMovie(event)">
                                <i class="fa-solid fa-circle-minus"></i>
                                <p>Remove</p>
                            </button>
                        </div>

                        <p class="film-description">${savedMovies[i].Plot}</p>
                    </div>
                </div>
            `
        }
    }
}


function removeMovie(event) {
    const movie = event.target.parentElement.parentElement.parentElement.parentElement
    const movieID = movie.getAttribute("id")

    const savedMovies = JSON.parse(localStorage.getItem("movies"))
    const updatedSavedMovies = savedMovies.filter(movie => {
        if (movie.imdbID !== movieID) {
            return movie
        }
    })

    localStorage.setItem("movies", JSON.stringify(updatedSavedMovies))
    
    displayMovies()
}

displayMovies()