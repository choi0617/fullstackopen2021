import React, {useEffect, useState} from 'react';
import axios from 'axios';

const App = () => {
  
  const [countryData, setCountryData] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(res => console.log(res.data))
  })

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    
  }

  return (
    <div>
      <input onChange={handleSearchChange} />
    </div>
  )
}

export default App;