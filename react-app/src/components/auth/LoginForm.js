import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

const LoginForm = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    const data = dispatch(login(email, password))
    if (data.errors){
      setErrors(data.errors);
    };
  };

  const demoLogin = e => {
    e.preventDefault();
    const data = dispatch(login('demo@aa.io', 'password'));
    if(data.errors){
      setErrors(data.errors);
    };
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form id="login-form" onSubmit={onLogin}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <button type="submit">Login:</button>
        <button type="submit" onClick={demoLogin}>Demo User</button>
        <div className="center-flex">
          <p>Don't have an account? <a href="/sign-up">Sign up</a></p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
