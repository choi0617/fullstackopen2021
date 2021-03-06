import React from "react";
import { upVote } from "../reducers/anecdoteReducer";

import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    const filter = state.filter.toLowerCase();

    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
    );
  });

  const vote = (id) => {
    const toVote = anecdotes.find((a) => a.id === id);

    dispatch(upVote(toVote));
    dispatch(setNotification(`you voted '${toVote.content}`, 3));
  };

  anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
