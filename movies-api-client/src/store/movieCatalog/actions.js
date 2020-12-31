import axios from "../../axios-orders"

export const FETCH_USER_CATALOG_MOVIES_START = "FETCH_USER_CATALOG_MOVIES_START"
export const FETCH_USER_CATALOG_MOVIES_SUCCESS =
  "FETCH_USER_CATALOG_MOVIES_SUCCESS"
export const FETCH_USER_CATALOG_MOVIES_ERROR = "FETCH_USER_CATALOG_MOVIES_ERROR"

export const FETCH_USER_ALL_MOVIES_START = "FETCH_USER_ALL_MOVIES_START"
export const FETCH_USER_ALL_MOVIES_SUCCESS = "FETCH_USER_ALL_MOVIES_SUCCESS"
export const FETCH_USER_ALL_MOVIES_ERROR = "FETCH_USER_ALL_MOVIES_ERROR"

export const ADD_MOVIE_TO_USER_CATALOG_START = "ADD_MOVIE_TO_USER_CATALOG_START"
export const ADD_MOVIE_TO_USER_CATALOG_SUCCESS =
  "ADD_MOVIE_TO_USER_CATALOG_SUCCESS"
export const ADD_MOVIE_TO_USER_CATALOG_ERROR = "ADD_MOVIE_TO_USER_CATALOG_ERROR"

export const UPDATE_MOVIE_RATING_START = "UPDATE_MOVIE_RATING_START"
export const UPDATE_MOVIE_RATING_SUCCESS = "UPDATE_MOVIE_RATING_SUCCESS"
export const UPDATE_MOVIE_RATING_ERROR = "UPDATE_MOVIE_RATING_ERROR"

const fetchUserCatalogMoviesStart = () => {
  return { type: FETCH_USER_CATALOG_MOVIES_START }
}

const fetchUserCatalogMoviesSuccess = (catalogMovies) => {
  return {
    type: FETCH_USER_CATALOG_MOVIES_SUCCESS,
    payload: catalogMovies,
  }
}

const fetchUserCatalogMoviesFail = (err) => {
  return { type: FETCH_USER_CATALOG_MOVIES_ERROR, payload: err }
}

export const fetchUserCatalogMovies = () => {
  return async (dispatch, getState) => {
    dispatch(fetchUserCatalogMoviesStart())
    const userId = getState().auth.userId

    const resUserCatalog = await axios
      .get(`/user-movies-catalog-service/catalog/${userId}`)
      .catch((err) => {
        console.log("error", err)
        dispatch(fetchUserCatalogMoviesFail(err))
      })
    const dataUserCatalog = resUserCatalog?.data
    console.log("catalog data", dataUserCatalog)

    if (dataUserCatalog) {
      dispatch(fetchUserCatalogMoviesSuccess(dataUserCatalog))
    }
  }
}

const fetchUserAllMoviesStart = () => {
  return { type: FETCH_USER_ALL_MOVIES_START }
}

const fetchUserAllMoviesSuccess = (allMovies) => {
  return {
    type: FETCH_USER_ALL_MOVIES_SUCCESS,
    payload: allMovies,
  }
}

const fetchUserAllMoviesFail = (err) => {
  return { type: FETCH_USER_ALL_MOVIES_ERROR, payload: err }
}

export const fetchUserAllMovies = () => {
  return async (dispatch, getState) => {
    dispatch(fetchUserAllMoviesStart())
    const userId = getState().auth.userId

    const resUserAll = await axios
      .get(`/user-movies-catalog-service/catalog/all/${userId}`)
      .catch((err) => {
        console.log("error", err)
        dispatch(fetchUserAllMoviesFail(err))
      })
    const dataUserAll = resUserAll?.data

    if (dataUserAll) {
      dispatch(fetchUserAllMoviesSuccess(dataUserAll))
    }
  }
}

const addMovieToUserCatalogStart = () => {
  return { type: ADD_MOVIE_TO_USER_CATALOG_START }
}

const addMovieToUserCatalogSuccess = (catalogMovies) => {
  return {
    type: ADD_MOVIE_TO_USER_CATALOG_SUCCESS,
    payload: catalogMovies,
  }
}

const addMovieToUserCatalogFail = (err) => {
  return { type: ADD_MOVIE_TO_USER_CATALOG_ERROR, payload: err }
}

export const addMovieToUserCatalog = (movie, rating) => {
  // combine movie and rating to catalog item
  return async (dispatch, getState) => {
    dispatch(addMovieToUserCatalogStart())
    const userId = getState().auth.userId
    const result = await axios
      .post("/rating-service/ratings", {
        userId,
        movieId: movie.id,
        rating,
      })
      .catch((err) => {
        console.log(err)
        dispatch(addMovieToUserCatalogFail(err))
      })
    const data = result?.data
    if (data) {
      dispatch(addMovieToUserCatalogSuccess({ ...movie, rating }))
    }
  }
}

const updateMovieRatingStart = () => {
  return { type: UPDATE_MOVIE_RATING_START }
}

const updateMovieRatingSuccess = (movie, ratingObj) => {
  return { type: UPDATE_MOVIE_RATING_SUCCESS, payload: { movie, ratingObj } }
}

const updateMovieRatingFail = (err) => {
  return { type: UPDATE_MOVIE_RATING_ERROR, payload: err }
}

export const updateMovieRating = (movie, rating) => {
  return async (dispatch) => {
    dispatch(updateMovieRatingStart())
    const result = await axios
      .patch(`/rating-service/ratings`, { ratingId: movie.ratingId, rating })
      .catch((err) => {
        console.log(err)
        dispatch(updateMovieRatingFail(err))
      })
    const data = result?.data
    if (data) {
      dispatch(updateMovieRatingSuccess(movie, data))
    }
  }
}
