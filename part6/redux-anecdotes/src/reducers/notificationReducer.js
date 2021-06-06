/*
1) I first created the notificationReducer with the initial state = null
2) Then created action.type which would either return the action.content
or return null (to clear the notification)
3) Then created Action Creators setNotification() and clearNotification()
4) Then invoked combineReducers at store.js and imported it to index.js to be used 
in the <Provider store={store} />
5) Then inside AnecdoteList.js, I found the anecdote being upvoted then
dispatched setNotification and then a setTimeOut function that 
dispatches clearNotification
6) Inside Notification.js, I assigned state.notifications to const notifications.
*/

const reducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.content;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

let timeoutID;

export const setNotification = (content, timer) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      content,
    });

    if (timeoutID) clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
      });
    }, timer * 1000);
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  };
};

export default reducer;
