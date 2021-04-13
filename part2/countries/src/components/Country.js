import React from "react";


const Country = (props) => {
  const {
    name,
    capital,
    population,
    flagImg,
    languages
  } = props;
  return (
    <div>
      <p>
        {name}
      </p>
      
      {capital ? (
        <>
          <p>Capital: {capital}</p>
          <p>Population: {population}</p>
          <p>Languages</p>
          <ul>
            {languages.map((language) => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <p>
            <img alt="country flag" src={flagImg} height="80px" />
          </p>
        </>
      ) : null}
    </div>
  );
};

export default Country;
