import React, { useState } from "react";

const Button = ({ text, func }) => (
  <p>
    <button onClick={func}>{text}</button>
  </p>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);

  // votes = { 0: 1, 1: 2, etc.}
  const [votes, setVotes] = useState({});

  //the anecdotes with the most votes. returns the key
  const [mostVotes, setMostVotes] = useState(0);

  const randomNum = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));
  const vote = () => {
    const selectedVotes = votes[selected] || 0;
    setVotes({ ...votes, [selected]: selectedVotes + 1 });
    
    if (!votes[mostVotes] || selectedVotes + 1 > votes[mostVotes]) {
      setMostVotes(selected);
    }
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} has {votes[selected] ? votes[selected] : 0}{" "}
      {votes[selected] === 1 ? "vote" : "votes"}.
      <Button text={"Next"} func={randomNum} />
      <Button text={"Vote"} func={vote} />
      <h1>Most popular anecdote</h1>
      {anecdotes[mostVotes]} with {votes[mostVotes] ? votes[mostVotes] : 0}{" "}
      {votes[selected] === 1 ? "vote" : "votes"}.
    </div>
  );
};

export default App;
