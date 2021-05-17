import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "./store/session";
import HomePage from "./components/HomePage";
import NotePage from "./components/Notes/NotePage";
import NotebookIndex from "./components/NotebookIndex";
import NavBar from "./components/NavBar";

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);
  const user = useSelector(state => state.session.user)
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
        <ProtectedRoute path="/notebooks/:notebookId" exact={true}>
          <NotebookIndex />
        </ProtectedRoute>
        <ProtectedRoute path="/notebooks/:notebookId/notes/:noteId" exact={true}>
          <NotePage />
        </ProtectedRoute>
        <Route>
          <div>
            {user && <NavBar />}
            <div>Page Not Found</div>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
