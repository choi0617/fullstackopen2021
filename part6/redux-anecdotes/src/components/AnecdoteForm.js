import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAddAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdoteInput.value;
    if (!content) {
      return alert("No anecdote written");
    }
    e.target.anecdoteInput.value = "";

    dispatch(addAnecdote(content));
  };

  return (
    <div>
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

export default AnecdoteForm;
