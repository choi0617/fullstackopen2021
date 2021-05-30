import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import anecdoteReducer from "./reducers/anecdoteReducer";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
});

export default createStore(reducer, composeWithDevTools());
