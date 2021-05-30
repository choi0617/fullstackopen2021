import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notifications = useSelector((state) => state.notifications);
  if (!notifications) return null;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notifications}</div>;
};

export default Notification;
