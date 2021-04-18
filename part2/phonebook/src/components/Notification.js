import React from "react";

const Notification = ({ message }) => {
  const notificationStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
    background: 'lightgrey',
    border: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };
  return <>{message && <div style={notificationStyle}>{message}</div>}</>;
};

export default Notification;
