import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./App.css";
import Movies from "./components/Movies";
import Heading from "./components/Heading";
import Icons from "./components/IconList";
import SearchBar from "./components/SearchBar";
import ShowFavourites from "./components/ShowFavourites";
import WatchedOnes from "./components/ShowWatched";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";

function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [watched, setWatched] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieRequestByTitle = async (searchValue) => {
    const url = `http://www.omdbapi.com/?apikey=742147d8&s=${searchValue}&type=movie`;

    const response = await fetch(url);

    const responseJSON = await response.json();

    //Check api response
    if (responseJSON.Response === "True") {
      if (responseJSON.Search) {
        setMovies(responseJSON.Search);
      }
    } else {
      //There was error
      console.log(`There was an error: ${responseJSON.Error}`);
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

  useEffect(() => {
    const watchedMovies = JSON.parse(
      localStorage.getItem("movie-app-watched")
    );
    setWatched(watchedMovies);
  }, []);

  useEffect(() => {
    document.title = 'Movie App';
  }, []);

  const saveToLS = (items) => {
    localStorage.setItem("movie-app-favourites", JSON.stringify(items));
  };

  const saveToLSAlreadyWatched = (items) => {
    localStorage.setItem("movie-app-watched", JSON.stringify(items));
  } 

  const addFavoriteMovie = (movie) => {
    let newFavourites;
    if (favourites == null) {
      newFavourites = [movie];
    } else {
      newFavourites = [...favourites, movie];
    }
    setFavourites(newFavourites);
    saveToLS(newFavourites);
  };
  const addWatched = (movie) => {
    let newWatched;
    if (watched == null) {
      newWatched = [movie];
    } else {
      newWatched = [...watched, movie];
    }
    setWatched(newWatched);
    saveToLSAlreadyWatched(newWatched);
    console.log(saveToLSAlreadyWatched(newWatched));
  };

  const removeFavouriteMovie = (movie) => {
    const newFavoriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavoriteList);
    saveToLS(newFavoriteList);
  };

  const removeWatchedMovie = (movie) => {
    const newWatchedList = watched.filter(
      (watched) => watched.imdbID !== movie.imdbID
    );
    setWatched(newWatchedList);
    saveToLSAlreadyWatched(newWatchedList);
  };
  return (
    <div className="container-fluid movies-container">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <Heading heading="Movie App" />
        <Icons />
      </div>{" "}
      <div className="row filters d-flex align-items-center">
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row search-results">
        <Movies
          movies={movies}
          keepFavouritesClick={addFavoriteMovie}
          keepWatchedClick={addWatched}
          favourite={AddFavourites}
        />
      </div>
      <ShowFavourites
        movies={favourites}
        keepFavouritesClick={removeFavouriteMovie}
        favourite={RemoveFavourites}
      />
      <WatchedOnes
        movies={movies}
        watched={WatchedOnes}
      />
    </div>
  );
}

export default App;
