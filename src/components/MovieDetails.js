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
      <div className="modal-dialog modal-dialog-scrollable favourites-container">
        <div className="modal-content ">
          <div className="modal-header favourites-containerpart ml-3">
            <h1 className="modal-title fs-5 favourites-title">
              {props.details.Title}
            </h1>
          </div>
          <div className="modal-body d-flex flex-row flex-wrap justify-content-between favourites-containerpart">
           <img
            className="modal-poster"
            alt="modal-poster"
            src={props.details.Poster}
           />
           <div>{props.details.Year}</div>
           <div>{props.details.Actors}</div>
           <div>{props.details.Plot}</div>
          </div>
          <div className="modal-footer favourites-containerpart">
            <button
              type="button"
              className="btn btn-dark favourites-close-button"
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
