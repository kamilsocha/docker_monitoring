import {
  FETCH_ALL_MOVIES_START,
  FETCH_ALL_MOVIES_SUCCESS,
  FETCH_ALL_MOVIES_ERROR,
  ADD_MOVIE_START,
  ADD_MOVIE_SUCCESS,
  ADD_MOVIE_ERROR,
} from "./actions"
import { updateObject } from "../utility"

const initialState = {
  movies: null,
  loading: false,
  error: null,
}

const setAllMoviesStart = (state, action) => {
  return updateObject(state, { error: null, loading: true })
}

const setAllMovies = (state, action) => {
  return updateObject(state, {
    movies: action.payload.content.map((m) => ({
      movieId: m.id,
      name: m.name,
      director: m.director,
      description: m.description,
      posterUri: m.posterUri,
    })),
    loading: false,
  })
}

const setAllMoviesError = (state, action) => {
  return updateObject(state, { error: action.payload, loading: false })
}

export function allMoviesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_MOVIES_START:
      return setAllMoviesStart(state, action)
    case FETCH_ALL_MOVIES_SUCCESS:
      return setAllMovies(state, action)
    case FETCH_ALL_MOVIES_ERROR:
      return setAllMoviesError(state, action)
    default:
      return state
  }
}
