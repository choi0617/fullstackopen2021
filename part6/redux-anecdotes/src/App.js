import React from "react";
import { useSelector, useDispatch } from "react-redux";
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
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input name="anecdoteInput" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
