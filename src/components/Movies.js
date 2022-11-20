import React from "react";

const Movies = (props) => {
  const Favourite = props.favourite;
  //if there is movies.. this condition prevent map of undefined/null
  if (Array.isArray(props.movies) && props.movies.length > 0) {
    //returns movie items
    return (
      <>
        {props.movies.map((movie, i) => (
          <div
            key={i}
            className="d-flex flex-column justify-content-start m-3 auto-w image-container"
          >
            <div className="card-container d-flex flex-column">
              <img
                src={movie.Poster}
                // onClick={() => {
                //   props.keepWatchedClick(movie);
                // }}
                onMouseOver={(e) => {
                  e.target.nextElementSibling.style.display = "initial";
                }}
                onMouseOut={(e) => {
                  e.target.nextElementSibling.style.display = "none";
                }}
                alt="movie"
              ></img>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="currentColor"
                className="card-container__is-watched bi bi-eye-fill"
                viewBox="0 0 16 16"
                onClick={() => {
                  props.keepWatchedClick(movie);
                }}
                onMouseOver={(e) => {
                  e.target.style.display = "initial";
                }}
                onMouseOut={(e) => {
                  e.target.style.display = "inital";
                }}
              >
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
              </svg>
            </div>
            <div
              onClick={() => props.keepFavouritesClick(movie)}
              className="img-overlay movies-overlay d-flex align-items-center justify-content-center"
            >
              <Favourite />
            </div>
            <div className="movie-title mt-4 mb-4 text-center">
              {movie.Title}
            </div>
          </div>
        ))}
      </>
    );
  }
};

export default Movies;
