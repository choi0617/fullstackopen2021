import React from "react";

const Country = (props) => {
  const { name, capital, population, flagImg } = props;
  return (
    <div>
      <p>{name}</p>
      {capital ? <><p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <p>
        <img alt="country flag" src={flagImg} width='400' height='400' />
      </p></> : <></>}
      
    </div>
  );
};

export default Country;
