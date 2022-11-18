import React from "react";
import Movies from "./Movies";

const Favourites = (props) => {
	const Favourite = props.favourite;
  return (
    <>
	<div className="modal fade" id="myFavourites" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div className="modal-dialog modal-dialog-scrollable">
		<div className="modal-content">
		<div className="modal-header">
			<h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
			<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		</div>
		<div className="modal-body">
			{props.movies.map((movie, i) => (
				<div className="d-flex flex-column justify-content-start m-3 auto-w image-container">
				<div className="card-container d-flex flex-column">
					<img src={movie.Poster} alt="movie"></img>
				</div>
				<div
					onClick={() => props.keepFavouritesClick(movie)}
					className="img-overlay d-flex align-items-center justify-content-center"
				>
					<Favourite />
				</div>
				<div className="movie-title mt-4 mb-4 text-center">{movie.Title}</div>
				</div>
			))}
		</div>
		<div className="modal-footer">
			<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
			<button type="button" className="btn btn-primary">Save changes</button>
		</div>
		</div>
	</div>
	</div>
    </>
  );
};

export default Favourites;
