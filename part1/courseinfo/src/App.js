import React from "react";

const Header = ({ course }) => {
  const { name } = course;
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const Content = ({ parts: { parts: namesAndExercises } }) => {
  //console.log(namesAndExercises);
  const list = namesAndExercises.map((x) => {
    return (
      <>
        <h3>{x.name}</h3>
        <ul>
          <li># of exercises: {x.exercises}</li>
        </ul>
      </>
    );
  });

  return <div>{list}</div>
};

const Total = ({ parts: {parts} }) => {
  console.log(parts)
  let sum = 0;
  parts.map(x => sum+= x.exercises )
  return <div>{sum}</div>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  // Header takes care of rendering the name of the course,
  // Content renders the parts and their number of exercises and
  // Total renders the total number of exercises.

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  );
};

export default App;
