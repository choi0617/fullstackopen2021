import React from 'react';

const Country = (props) => {
    const {name} = props;
    return (
        <div>
           <p>{name}</p>
        </div>
    )
}

export default Country;