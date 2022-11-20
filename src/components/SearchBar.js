import React from "react";

const SearchBar = (props) => {
  //first clean the child elements( years )
  let arrMovieYear = [];
  props.movies.forEach(
    (movie) => (arrMovieYear = [...arrMovieYear, parseInt(movie.Year)]) //save each year into the array arrMovieYear
  );

  //remove duplicates from the array
  arrMovieYear = [...new Set(arrMovieYear)];

  //order array by DESC
  arrMovieYear = arrMovieYear.sort().reverse();

  const dropdownItems = [];
  //check if is array
  if (Array.isArray(arrMovieYear)) {
    //show filter button if element exists
    const fillYearButton = document.querySelectorAll(
      ".fill-year-wrapper button"
    )[0];
    if (fillYearButton) {
      fillYearButton.style.display = "initial";
    }

    //prepare items for the dropdown with the movies years
    arrMovieYear.forEach((year, i) => {
      //check if it was filtered by year
      if (
        document.querySelectorAll(".fill-year-wrapper button")[0].innerHTML ===
        "Fill by " + year
      ) {
        //add a clear items to the dropdown
        dropdownItems.push(
          <li
            key={i}
            className="item-clear"
            onClick={() => {
              document.querySelectorAll(
                ".fill-year-wrapper button"
              )[0].innerHTML = "Select the year";
              document
                .querySelectorAll(".fill-year-wrapper button")[0]
                .setAttribute("data-year", "");
              props.setFillByYear();
            }}
          >
            <p className="dropdown-item">Clear</p>
          </li>
        );
      } else {
        //add a item per year to the dropdown
        dropdownItems.push(
          <li
            key={i}
            className={"item-" + year}
            onClick={() => {
              document.querySelectorAll(
                ".fill-year-wrapper button"
              )[0].innerHTML = "Fill by " + year;
              document
                .querySelectorAll(".fill-year-wrapper button")[0]
                .setAttribute("data-year", year);
              props.setFillByYear(year);
            }}
          >
            <p className="dropdown-item">{year}</p>
          </li>
        );
      }
    });
  }

  return (
    <div className="col col-sm-4">
      <div
        className="btn-group-horizontal"
        role="group"
        aria-label="Choose search type"
      >
        <input
          type="radio"
          className="btn-check"
          name="search-type"
          id="search-type-name"
          autoComplete="off"
          defaultChecked={"checked"}
          onClick={() => {
            document.getElementById("searchBar").placeholder =
              "Search by Name...";
            let currentSearchType = document
              .getElementById("searchBar")
              .getAttribute("data-type");
            if (currentSearchType !== "name") {
              //set attribute
              document
                .getElementById("searchBar")
                .setAttribute("data-type", "name");
              //clean the search bar
              document.getElementById("searchBar").value = "";
            }
          }}
        />
        <label className="btn btn-outline-danger" htmlFor="search-type-name">
          Search by Name
        </label>
        <input
          type="radio"
          className="btn-check"
          name="search-type"
          id="search-type-imdb"
          autoComplete="off"
          defaultChecked={""}
          onClick={() => {
            document.getElementById("searchBar").placeholder =
              "Search by IMDB ID...";
            let currentSearchType = document
              .getElementById("searchBar")
              .getAttribute("data-type");
            if (currentSearchType !== "id") {
              //set attribute
              document
                .getElementById("searchBar")
                .setAttribute("data-type", "id");
              //clean the search bar
              document.getElementById("searchBar").value = "";
              //hide fill by year
              document.querySelectorAll(".fill-year-wrapper")[0].style.display =
                "none";
            }
            //clean the year filter
            const fillYearButton = document.querySelectorAll(
              ".fill-year-wrapper button"
            )[0];
            if (fillYearButton) {
              if (fillYearButton.getAttribute("data-year")) {
                fillYearButton.innerHTML = "Select the year";
                fillYearButton.setAttribute("data-year", "");
                props.setFillByYear();
              }
              fillYearButton.style.display = "none";
            }
          }}
        />
        <label className="btn btn-outline-danger" htmlFor="search-type-imdb">
          Search by IMDB ID
        </label>
      </div>
      <div
        className="btn-group-horizontal d-flex flex-row"
        role="group"
        aria-label="Search"
      >
        <input
          id="searchBar"
          className="form-control"
          data-type="name"
          value={props.value}
          onChange={(e) => {
            const searchResults =
              document.getElementsByClassName("search-results")[0];
            //it only possible to search when there is a minimal of 3 chars
            if (e.target.value === "" || e.target.value.length < 3) {
              searchResults.style.display = "none";
              document.getElementsByClassName(
                "fill-year-wrapper"
              )[0].style.display = "none";
            } else {
              props.setSearchValue(e.target.value);
              searchResults.style.display = "flex";
              document.getElementsByClassName(
                "fill-year-wrapper"
              )[0].style.display = "initial";
            }
            //clean the year filter
            const fillYearButton = document.querySelectorAll(
              ".fill-year-wrapper button"
            )[0];
            if (fillYearButton) {
              if (fillYearButton.getAttribute("data-year")) {
                fillYearButton.innerHTML = "Select the year";
                fillYearButton.setAttribute("data-year", "");
                props.setFillByYear();
              }
              fillYearButton.style.display = "none";
            }
          }}
          placeholder="Search by Name..."
        ></input>
        <div className="dropdown fill-year-wrapper">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-year=""
          >
            Select the year
          </button>
          <ul className="dropdown-menu">{dropdownItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
