import React from "react";

const Header = ({name}) => {
  
  return (
    <h1>{name}</h1>
  )
}

const Parts = ({part}) => {
  
  console.log(part)
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => <Parts key={part.id} part={part} />)}
    </div>
  )
}



const Total = ({ parts }) => {
  let totalExercises = parts.reduce(
    (acc, currentVal) => acc + currentVal.exercises,
    0
  );
  //console.log(totalExercises);

  return (
    <div>
      <b>total of {totalExercises} exercises</b>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      
       <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
