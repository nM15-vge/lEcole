import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import HomePage from "./components/HomePage";
import NotePage from "./components/Notes/NotePage";

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact={true}>
          <div id="form-container" className="size center-flex">
            <LoginForm />
          </div>
        </Route>
        <Route path="/sign-up" exact={true}>
          <div className="size center-flex">
            <SignUpForm />
          </div>
        </Route>
        <ProtectedRoute path="/" exact={true}>
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path="/notes/:noteId" exact={true}>
          <NotePage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
