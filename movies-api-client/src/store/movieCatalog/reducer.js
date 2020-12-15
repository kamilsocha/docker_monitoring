import {
  FETCH_USER_CATALOG_MOVIES_START,
  FETCH_USER_CATALOG_MOVIES_SUCCESS,
  FETCH_USER_CATALOG_MOVIES_ERROR,
  FETCH_USER_ALL_MOVIES_START,
  FETCH_USER_ALL_MOVIES_SUCCESS,
  FETCH_USER_ALL_MOVIES_ERROR,
  ADD_MOVIE_TO_USER_CATALOG_START,
  ADD_MOVIE_TO_USER_CATALOG_SUCCESS,
  ADD_MOVIE_TO_USER_CATALOG_ERROR,
  UPDATE_MOVIE_RATING_START,
  UPDATE_MOVIE_RATING_SUCCESS,
  UPDATE_MOVIE_RATING_ERROR,
  DELETE_MOVIE_RATING_START,
  DELETE_MOVIE_RATING_SUCCESS,
  DELETE_MOVIE_RATING_ERROR,
} from "./actions"
import { updateObject } from "../utility"

const initialState = {
  allUserMovies: [],
  loadingAll: false,
  errorAll: null,
  userCatalogMovies: [],
  loadingCatalog: false,
  errorCatalog: null,
}

const setUserCatalogMoviesStart = (state, action) => {
  return updateObject(state, { errorCatalog: null, loadingCatalog: true })
}

const setUserCatalogMovies = (state, action) => {
  return updateObject(state, {
    userCatalogMovies: action.payload,
    loadingCatalog: false,
  })
}

const setUserCatalogMoviesFail = (state, action) => {
  return updateObject(state, {
    errorCatalog: action.payload,
    loadingCatalog: false,
  })
}

const setUserAllMoviesStart = (state, action) => {
  return updateObject(state, { errorAll: null, loadingAll: true })
}

const setUserAllMovies = (state, action) => {
  return updateObject(state, {
    allUserMovies: action.payload,
    loadingAll: false,
  })
}

const setUserAllMoviesFail = (state, action) => {
  return updateObject(state, { errorAll: action.payload, loadingAll: false })
}

const addMovieToUserCatalogStart = (state, action) => {
  return updateObject(state, { errorCatalog: null, loadingCatalog: true })
}

const addMovieToUserCatalog = (state, action) => {
  const {
    id,
    name,
    director,
    description,
    posterUri,
    ratingId,
    rating,
  } = action.payload
  const newUserCatalogMovies = [
    ...state.userCatalogMovies,
    { movieId: id, name, director, description, posterUri, ratingId, rating },
  ]
  return updateObject(state, {
    allUserMovies: state.allUserMovies.filter(
      (m) => m.id !== action.payload.id
    ),
    userCatalogMovies: newUserCatalogMovies,
    loadingCatalog: false,
  })
}

const addMovieToUserCatalogFail = (state, action) => {
  return updateObject(state, {
    errorCatalog: action.payload,
    loadingCatalog: false,
  })
}

const updateMovieRatingStart = (state, action) => {
  return updateObject(state, {
    errorCatalog: null,
    loadingCatalog: true,
  })
}

const updateMovieRating = (state, action) => {
  const { movie, ratingObj } = action.payload
  const newMovie = { ...movie, rating: ratingObj.rating }
  const newUserCatalogMovies = [
    ...state.userCatalogMovies.filter((m) => m.movieId !== ratingObj.movieId),
    newMovie,
  ]
  return updateObject(state, {
    loadingCatalog: false,
    userCatalogMovies: newUserCatalogMovies,
  })
}

const updateMovieRatingFail = (state, action) => {
  return updateObject(state, {
    errorCatalog: action.payload,
    loadingCatalog: false,
  })
}

export function movieCatalogReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_CATALOG_MOVIES_START:
      return setUserCatalogMoviesStart()
    case FETCH_USER_CATALOG_MOVIES_SUCCESS:
      return setUserCatalogMovies(state, action)
    case FETCH_USER_CATALOG_MOVIES_ERROR:
      return setUserCatalogMoviesFail(state, action)
    case FETCH_USER_ALL_MOVIES_START:
      return setUserAllMoviesStart(state, action)
    case FETCH_USER_ALL_MOVIES_SUCCESS:
      return setUserAllMovies(state, action)
    case FETCH_USER_ALL_MOVIES_ERROR:
      return setUserAllMoviesFail(state, action)
    case ADD_MOVIE_TO_USER_CATALOG_START:
      return addMovieToUserCatalogStart(state, action)
    case ADD_MOVIE_TO_USER_CATALOG_SUCCESS:
      return addMovieToUserCatalog(state, action)
    case ADD_MOVIE_TO_USER_CATALOG_ERROR:
      return addMovieToUserCatalogFail(state, action)
    case UPDATE_MOVIE_RATING_START:
      return updateMovieRatingStart(state, action)
    case UPDATE_MOVIE_RATING_SUCCESS:
      return updateMovieRating(state, action)
    case UPDATE_MOVIE_RATING_ERROR:
      return updateMovieRatingFail(state, action)
    default:
      return state
  }
}
