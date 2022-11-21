import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./App.css";
import Movies from "./components/Movies";
import Heading from "./components/Heading";
import Icons from "./components/IconList";
import SearchBar from "./components/SearchBar";
import ShowFavourites from "./components/ShowFavourites";
import ShowWatched from "./components/ShowWatched";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";

function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [watched, setWatched] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [fillByYear, setFillByYear] = useState("");

  //method to get movies by title search
  //supports filter by year
  const getMovieRequestByTitle = async (searchValue, fillYear) => {
    let url;
    //check if is to fill by year or not
    if (fillYear) {
      //add GET y parameter to filter by year
      url = `http://www.omdbapi.com/?apikey=742147d8&s=${searchValue}&type=movie&y=${fillYear}`;
    } else {
      url = `http://www.omdbapi.com/?apikey=742147d8&s=${searchValue}&type=movie`;
    }

    const response = await fetch(url);

    const responseJSON = await response.json();

    //Check api response
    if (responseJSON.Response === "True") {
      if (responseJSON.Search) {
        //even exists just one record, it still returns an array
        setMovies(responseJSON.Search);
      }
    } else {
      //hide results if they already existed
      const searchResults =
        document.getElementsByClassName("search-results")[0];
      if (searchResults) {
        searchResults.style.display = "none";
      }
      //clean the year filter if exists
      const fillYearButton = document.querySelectorAll(
        ".fill-year-wrapper button"
      )[0];
      if (fillYearButton) {
        if (fillYearButton.getAttribute("data-year")) {
          fillYearButton.innerHTML = "Select the year";
          fillYearButton.setAttribute("data-year", "");
        }
        fillYearButton.style.display = "none";
      }
      //throw error in console
      console.log(`There was an error: ${responseJSON.Error}`);
    }
  };

  //method to get movies by an id
  const getMovieRequestById = async (searchValue) => {
    const url = `http://www.omdbapi.com/?apikey=742147d8&i=${searchValue}&type=movie`;

    const response = await fetch(url);

    const responseJSON = await response.json();

    //Check api response
    if (responseJSON.Response === "True") {
      setMovies([responseJSON]); //always gets one record. force to be sent as array
    } else {
      //There was error
      console.log(`There was an error: ${responseJSON.Error}`);
    }
  };

  //get movies
  useEffect(() => {
    //get movies by search
    const currentSearchType = document
      .getElementById("searchBar")
      .getAttribute("data-type");
    if (currentSearchType === "name") {
      //when the search is a name
      //check if fill year was defined
      const getSelectedYear = document
        .querySelectorAll(".fill-year-wrapper button")[0]
        .getAttribute("data-year");
      if (getSelectedYear) {
        //fill by was is active / it's showing movies of respective year
        getMovieRequestByTitle(searchValue, getSelectedYear);
      } else {
        //fill by year was not active / it's showing all movies
        getMovieRequestByTitle(searchValue);
      }
    } else {
      //when is by imdb id
      getMovieRequestById(searchValue);
    }
  }, [searchValue, fillByYear]);

  //set favourites
  useEffect(() => {
    //load the saved favourites from local storage
    const favouriteMovies = JSON.parse(
      localStorage.getItem("movie-app-favourites")
    );
    setFavourites(favouriteMovies);
  }, []);

  //set watched
  useEffect(() => {
    //load the saved watched movies from local storage
    const watchedMovies = JSON.parse(localStorage.getItem("movie-app-watched"));
    setWatched(watchedMovies);
  }, []);

  //set app title
  useEffect(() => {
    document.title = "Movie App";
  }, []);

  const saveToLS = (items) => {
    localStorage.setItem("movie-app-favourites", JSON.stringify(items));
  };

  const saveToLSAlreadyWatched = (items) => {
    localStorage.setItem("movie-app-watched", JSON.stringify(items));
  };

  const addFavoriteMovie = (movie) => {
    let newFavourites;
    if (favourites == null) {
      newFavourites = [movie];
    } else {
      newFavourites = [...favourites, movie];
    }
    setFavourites(newFavourites);
    saveToLS(newFavourites);

    const alert = document.getElementsByClassName("alert-added-favourites")[0];
    alert.style.display = "initial";
    setTimeout(() => {
      alert.style.display = "none";
    }, 4000);
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
    const alert = document.getElementsByClassName("alert-added-watched")[0];
    alert.style.display = "initial";
    setTimeout(() => {
      alert.style.display = "none";
    }, 4000);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavoriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavoriteList);
    saveToLS(newFavoriteList);
    const alert = document.getElementsByClassName("alert-remove-favourites")[0];
    alert.style.display = "initial";
    setTimeout(() => {
      alert.style.display = "none";
    }, 4000);
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
      <div className="row d-flex align-items-center m-1 header-container">
        <Heading heading="Movie App" />
        <Icons />
      </div>{" "}
      <div className="row filters d-flex align-items-center">
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          movies={movies}
          fillByYear={fillByYear}
          setFillByYear={setFillByYear}
        />
      </div>
      <div className="row search-results justify-content-around">
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
      <ShowWatched
        movies={watched}
        watched={removeWatchedMovie}
        keepWatchedClick={addWatched}
      />
    </div>
  );
}

export default App;
