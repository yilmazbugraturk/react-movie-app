import React from "react";

const Heading = (props) => {
  return (
    <div className="col d-flex flex-row justify-content-between heading">
        <img src={props.heading} width="150px" height="auto" alt="logo"></img>
        <div className="alert alert-success alert-added-favourites" role="alert">
          Added to Favourites Successfully
        </div>
        <div className="alert alert-success alert-added-watched" role="alert">
          Added to WatchList Successfully
        </div>
    </div>
  );
};

export default Heading;
