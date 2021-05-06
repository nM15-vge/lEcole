import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const onLogout = e => {
    dispatch(logout())
  };

  return <div id="logout" className="center-flex" onClick={onLogout}>Logout</div>;
};

export default LogoutButton;
