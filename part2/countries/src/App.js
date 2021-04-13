import React, { useEffect, useState } from "react";
import axios from "axios";

import Search from "./components/Search";
import Country from "./components/Country";
import Countries from "./components/Countries";


const App = () => {
  const [countryData, setCountryData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
 
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => setCountryData(res.data));
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    const results = countryData.filter((country) =>
      country.name.includes(searchValue)
    );

    setSearchResults(results);
    //console.log(searchResults);
  };

  const showCountryDetailBtn = (country) => {
    setSearchResults([country])
  };

  return (
    <div>
      <Search handleSearchChange={handleSearchChange} />

      {searchResults.length < 10 ? (
        searchResults.length === 1 ? (
          searchResults.map((country) => (
            <Country
              key={country.name}
              languages={country.languages}
              name={country.name}
              capital={country.capital}
              population={country.population}
              flagImg={country.flag}
            />
          ))
        ) : 
        <Countries searchResults={searchResults} showCountryDetailBtn={showCountryDetailBtn}  />
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
};

export default App;
