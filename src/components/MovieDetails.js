import React from "react";


const MovieDetails = (props) => {
  return (
    <>
    <div
      className="modal fade"
      id="myMovieDetails"
      tabIndex="-1"
      aria-labelledby="MovieDetailsModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable movie-details-container">
        <div className="modal-content ">
          <div className="modal-header movie-details-containerpart ml-3">
            <h1 className="modal-title fs-5 movie-details-title">
              {props.details.Title}
            </h1>
          </div>
          <div className="modal-body d-flex flex-row flex-wrap justify-content-around movie-details-containerpart">
           <img
            className="modal-poster"
            alt="modal-poster"
            src={props.details.Poster}
           />
           <div className="details d-flex flex-column align-items-start justify-content-around">
            <div><strong>Year: </strong>{props.details.Year}</div>
            <div><strong>Date of release: </strong>{props.details.Released}</div>
            <div><strong>Duration: </strong>{props.details.Runtime}</div>
            <div><strong>Actors: </strong>{props.details.Actors}</div>
            <div><strong>Genre: </strong>{props.details.Genre}</div>
            <div><strong>Language(s): </strong>{props.details.Language}</div>
            <div><strong>IMDB Ratings: </strong>{props.details.imdbRating} / 10</div>
            <div><strong>Brief Description: </strong>{props.details.Plot}</div>
           </div>
          </div>
          <div className="modal-footer movie-details-containerpart">
            <button
              type="button"
              className="btn btn-dark movie-details-close-button"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default MovieDetails;
