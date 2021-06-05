import anecdoteService from "../services/anecdotes";

// The first parameter is the state in the store. Reducer returns
// a new state based on the actions type.
const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);

  /* NOTE TO SELF:
  1) created Action Creators named upVote() which dispatches { type, data: id } 
  to the reducer automatically because of createStore(reducer) in index.js

  2) then exported upVote() in App.js to use onClick which takes a parameter
  of the anecdote id

  3) After user clicks the Vote button, the action.type === "VOTE" is initiated
  4) In the switch case: "VOTE", we find the anecdote to vote
  5) Then we update it to an object named changedVote
  6) Then we update the state which we return

  */
  switch (action.type) {
    case "INIT_ANECDOTE":
      return action.data;
    case "VOTE":
      const updatedVote = action.data;
      // then we need to update the state with the updated votes
      return state.map((a) => (a.id === updatedVote.id ? updatedVote : a));
    case "NEW_ANECDOTE":
      return [...state, action.data];
    default:
      return state;
  }
};

export const upVote = (anecdote) => {
  return async (dispatch) => {
    const toVote = { ...anecdote, votes: anecdote.votes + 1 };
    const updatedAnecdote = await anecdoteService.update(toVote);
    dispatch({
      type: "VOTE",
      data: updatedAnecdote,
    });
  };
};

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTE",
      data: anecdotes,
    });
  };
};

export default reducer;
