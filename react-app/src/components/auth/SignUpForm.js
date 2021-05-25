import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signUp } from "../../store/session";


const SignUpForm = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(signUp(username, firstName, lastName, email, password));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };


  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form id="signup-form" onSubmit={onSignUp}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
          required={true}
        ></input>
      </div>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          onChange={updateFirstName}
          value={firstName}
        ></input>
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          onChange={updateLastName}
          value={lastName}
        ></input>
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
          required={true}
        ></input>
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          required={true}
        ></input>
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirm_password"
          onChange={updateConfirmPassword}
          value={confirmPassword}
          required={true}
        ></input>
      </div>
      <button className="center-flex" type="submit">Sign Up</button>
      <div>
        <p className="center-flex" >Already have an account? <a href="/login">Log in</a></p>
      </div>
    </form>
  );
};

export default SignUpForm;
