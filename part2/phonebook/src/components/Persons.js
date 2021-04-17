import React from 'react';

const Persons = (props) => {
    const {name, number, deletePerson, id} = props;
    return (
        <p>
            {name} {number} <button onClick={() => deletePerson(id)}>Delete</button>
        </p>
    )
}

export default Persons;