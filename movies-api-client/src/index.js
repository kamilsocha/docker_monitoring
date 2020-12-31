import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk"
import { createStore, applyMiddleware, compose, combineReducers } from "redux"
import { authReducer } from "./store/auth/reducer"
import { movieCatalogReducer } from "./store/movieCatalog/reducer"
import { allMoviesReducer } from "./store/allMovies/reducer"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

const rootReducer = combineReducers({
  auth: authReducer,
  movieCatalog: movieCatalogReducer,
  allMovies: allMoviesReducer,
})

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware)
    // window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/app">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
