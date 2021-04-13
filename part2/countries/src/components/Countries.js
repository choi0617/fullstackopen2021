import React from "react";


const Countries = (props) => {
  const { searchResults, showCountryDetailBtn } = props;
  return (
    <div>
      {searchResults.map((country) => {
        return (<p key={country.name}> {country.name} <button onClick={() => showCountryDetailBtn(country)}>Show</button></p>)
      })}
      
    </div>
  );
};

export default Countries;


// return (
//     <div>
//       <p>Capital: {country.capital}</p>
//       <p>Population: {country.population}</p>
//       <p>Languages</p>
//       <ul>
//         {country.languages.map((language) => (
//           <li key={language.name}>{language.name}</li>
//         ))}
//       </ul>
//       <p>
//         <img alt="country flag" src={country.flag} height="80px" />
//       </p>
//     </div>
//   );