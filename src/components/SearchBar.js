import React from "react";

const SearchBar = (props) => {
  return (
    <div className="col col-sm-4">
      <input
        id="searchBarbyName"
        className="form-control"
        value={props.value}
        onChange={(e) => {
          if (e.target.value === "") {
            const search_results =
              document.getElementsByClassName("image-container");
            for(let i=0;i <= search_results.length;++i){
              search_results[i].innerHTML = "";
            }
          } else {
            props.setSearchValue(e.target.value);
          }
        }}
        placeholder="Search by Name..."
      ></input>
    </div>
  );
};

export default SearchBar;
