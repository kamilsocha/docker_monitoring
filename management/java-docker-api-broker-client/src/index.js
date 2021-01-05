import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { Provider } from "react-redux"
import { HashRouter } from "react-router-dom"
import thunkMiddleware from "redux-thunk"
import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import { authReducer } from "./store/reducers/auth"
import { containersReducer } from "./store/reducers/containers"
import { configReducer } from "./store/reducers/config"

import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import { PersistGate } from "redux-persist/integration/react"

const persistConfig = {
  key: "root",
  blacklist: ["auth", "containersReducer"],
  storage,
}

const rootReducer = combineReducers({
  auth: authReducer,
  containersReducer,
  configReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer,
  compose(applyMiddleware(thunkMiddleware))
)

const persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <App />
        </HashRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
