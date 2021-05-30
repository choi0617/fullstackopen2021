import React from "react";
import { upVote } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";

const Anecdote = ({ anecdotes }) => {
  const dispatch = useDispatch();
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(upVote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h1>Anecdotes</h1>
      <Anecdote anecdotes={anecdotes} />
    </div>
  );
};

export default AnecdoteList;
