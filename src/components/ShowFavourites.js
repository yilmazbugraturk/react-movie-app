import React from "react";

const Favourites = (props) => {
  const Favourite = props.favourite;
  if (Array.isArray(props.movies) && props.movies.length > 0) {
    return (
      <>
        <div
          className="modal fade"
          id="myFavourites"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable favourites-container">
            <div className="modal-content ">
              <div className="modal-header favourites-containerpart ml-3">
                <h1 className="modal-title fs-5 favourites-title">
                  Favourites
                </h1>
              </div>
              <div className="modal-body d-flex flex-row flex-wrap justify-content-between favourites-containerpart">
                {props.movies.map((movie, i) => (
                  <div
                    key={i}
                    className="d-flex flex-column justify-content-start m-3 auto-w image-container"
                  >
                    <div className="card-container d-flex flex-column">
                      <img src={movie.Poster} alt="movie"></img>
                    </div>
                    <div
                      onClick={() => props.keepFavouritesClick(movie)}
                      className="img-overlay d-flex align-items-center justify-content-center"
                    >
                      <Favourite />
                    </div>
                    <div className="movie-title mt-4 mb-4 text-center">
                      {movie.Title}
                    </div>
                  </div>
                ))}
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
  }
};

export default Favourites;
