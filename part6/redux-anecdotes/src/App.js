import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import {
  upVote,
  initializeAnecdotes,
  addAnecdote,
} from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleAddAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdoteInput.value;
    console.log("content", content);
    e.target.anecdoteInput.value = "";
    dispatch(addAnecdote(content));
  };

  anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(upVote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}

      <AnecdoteForm handleAddAnecdote={handleAddAnecdote} />
    </div>
  );
};

export default App;
