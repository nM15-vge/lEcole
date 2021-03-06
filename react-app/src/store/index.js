import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import notebooks from "./notebook";
import notes from "./note";
import libraryLinks from "./libraryLink"

const rootReducer = combineReducers({
    session,
    notebooks,
    notes,
    libraryLinks
});

let enhancer;

if(process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
}else {
  const logger = require('redux-logger').default;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
};

const configureStore = preloadedState => createStore(rootReducer, preloadedState, enhancer);

export default configureStore;
