const input = document.getElementById("movie-title")
const searchBtn = document.getElementById("search")
const movieList = document.getElementById("movies")

let inputTitle = []
const moviesArray = []
const moviesWatchlist = []

// Enter search
input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchBtn.click();
    }
})
searchBtn.addEventListener("click", displayMovies)


function addToWatchlist(event) {
    const movie = event.target.parentElement.parentElement.parentElement.parentElement
    const movieID = movie.getAttribute("id")

    if(localStorage.getItem("movies") === null) {
        for (let i = 0; i < moviesArray.length; i++) {
            if (moviesArray[i].imdbID === movieID) {
                moviesWatchlist.push(moviesArray[i])
            }
        }

        localStorage.setItem("movies", JSON.stringify(moviesWatchlist))
    }

    let currentSavedMovies = JSON.parse(localStorage.getItem("movies"))
    for (let i = 0; i < moviesArray.length; i++) {
        if (moviesArray[i].imdbID === movieID) {
            const newCurrentSavedMovies = currentSavedMovies.map(el => el.imdbID)
            if (newCurrentSavedMovies.indexOf(movieID) === -1) {
                currentSavedMovies.push(moviesArray[i])
            }
        }
    }

    localStorage.setItem("movies", JSON.stringify(currentSavedMovies))
}


function displayMovies() {
    movieList.innerHTML = ""
    inputTitle.push(input.value.replace(" ", "+"))

    fetch(`https://omdbapi.com/?apikey=6f95752f&s=${inputTitle}`, {method: "GET"})
        .then(res => res.json())
        .then(data1 => {
            for(let i = 0; i < data1.Search.length; i++) {
                fetch(`https://omdbapi.com/?apikey=6f95752f&i=${data1.Search[i].imdbID}`, {method: "GET"})
                    .then(res => res.json())
                    .then(data2 => {
                        moviesArray.push({
                            imdbID: data1.Search[i].imdbID,
                            Poster: data1.Search[i].Poster,
                            Title: data2.Title,
                            Value: data2.Ratings[0].Value,
                            Runtime: data2.Runtime,
                            Genre: data2.Genre,
                            Plot: data2.Plot
                        })
                        if(data2.Runtime !== "N/A" && data2.Plot !== "N/A") {
                            movieList.innerHTML +=`
                                <div class="movie" id="${data1.Search[i].imdbID}">
                                    <img src="${data1.Search[i].Poster}" class="film-cover">
    
                                    <div class="movie-info">
                                        <div class="movie-info-1">
                                            <h3 class="film-title">${data2.Title}</h3>
                                            <i class="fas fa-star"></i>
                                            <p class="film-rating">${data2.Ratings[0].Value}</p>
                                        </div>
    
                                        <div class="movie-info-2">
                                            <p class="film-run-time">${data2.Runtime}</p>
                                            <p class="film-genre">${data2.Genre}</p>
                                            <button class="add-watch" id="add-btn" onclick="addToWatchlist(event)">
                                                <i class="fa-solid fa-circle-plus"></i>
                                                <p>Watchlist</p>
                                            </button>
                                        </div>
    
                                        <p class="film-description">${data2.Plot}</p>
                                    </div>
                                </div>
                            `
                        }
                    })
            }
        })
}