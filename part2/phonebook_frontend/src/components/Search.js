import React from "react";

const Search = (props) => {
  const {handleSearchChange, searchResults} = props;
  return (
    <div>
      Search: <input onChange={handleSearchChange} />
      {searchResults.map(person => {
        return (
          <p key={person.name}>{person.name} {person.number}</p>
        )
      })}
    </div>
  );
};

export default Search;
