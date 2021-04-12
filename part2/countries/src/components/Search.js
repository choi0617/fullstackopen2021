import React from 'react';

const Search = (props) => {
    const {handleSearchChange} = props;
    return (
        <div>
           Search for a country: <input onChange={handleSearchChange} />
        </div>
    )
}

export default Search;