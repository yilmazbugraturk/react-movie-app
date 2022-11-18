import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Movies from "./components/Movies";
import Heading from "./components/Heading";
import Icons from "./components/IconList";
import SearchBar from "./components/SearchBar";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";

function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieRequestByTitle = async (searchValue) => {
    const url = `http://www.omdbapi.com/?apikey=742147d8&s=${searchValue}`;

    const response = await fetch(url);

    const responseJSON = await response.json();

    if (responseJSON.Search) {
      setMovies(responseJSON.Search);
    }
  };

  useEffect(() => {
    getMovieRequestByTitle(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const favouriteMovies = JSON.parse(
      localStorage.getItem("movie-app-favourites")
    );
    setFavourites(favouriteMovies);
  }, []);

  const saveToLS = (items) => {
    localStorage.setItem("movie-app-favourites", JSON.stringify(items));
  };

  const addFavoriteMovie = (movie) => {
    const newFavourites = [...favourites, movie];
    setFavourites(newFavourites);
    saveToLS(newFavourites);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavoriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavoriteList);
    saveToLS(newFavoriteList);
  };

  const show_favourites = () => {
    var favourites_icon = document.getElementsByClassName('icon-favourites')[0];
    favourites_icon.style.display = "block";
  }

  return (
    <div className="container-fluid movies-container">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <Heading heading="Movie App" />
        <Icons/>
      </div>{" "}
      <div className="row filters d-flex align-items-center">
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row search-results">
        <Movies
          movies={movies}
          keepFavouritesClick={addFavoriteMovie}
          favourite={AddFavourites}
        />
      </div>
      <div className="row d-flex align-items-center justify-content-sb mt-4 mb-4">
        <Heading heading="Favourites" />
      </div>
      <div className="row favourites">
        <Movies
          movies={favourites}
          keepFavouritesClick={removeFavouriteMovie}
          favourite={RemoveFavourites}
        />
      </div>
    </div>
  );
}

export default App;
