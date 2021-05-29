const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
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
    case "VOTE":
      const id = action.data.id;
      const toVote = state.find((anecdote) => anecdote.id === id);
      const changedVote = {
        ...toVote,
        votes: toVote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedVote
      );
    case "NEW_ANECDOTE":
      return [...state, action.data];
    default:
      return state;
  }
};

export const upVote = (id) => {
  return {
    type: "VOTE",
    data: { id },
  };
};

export const addAnecdote = (anecdote) => {
  return {
    type: "NEW_ANECDOTE",
    data: {
      content: anecdote,
      id: getId(),
      votes: 0,
    },
  };
};

export const initializeAnecdotes = () => {
  return {
    data: initialState,
  };
};

export default reducer;
