import React from "react";

const Movies = (props) => {
  const Favourite = props.favourite;
  if (Array.isArray(props.movies) && props.movies.length > 0) {
    //Don't forget to remove the items without an image
    return (
      <>
        {props.movies.map((movie, i) => (
          <div key={i} className="d-flex flex-column justify-content-start m-3 auto-w image-container">
            <div
			className="card-container d-flex flex-column">
              <img
                src={movie.Poster}
				onClick={() => props.keepWatchedClick(movie)}
                alt="movie"
              ></img>
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
