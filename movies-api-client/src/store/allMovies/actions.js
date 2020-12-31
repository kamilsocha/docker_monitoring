import axios from "../../axios-orders"

export const FETCH_ALL_MOVIES_START = "FETCH_ALL_MOVIES_START"
export const FETCH_ALL_MOVIES_SUCCESS = "FETCH_ALL_MOVIES_SUCCESS"
export const FETCH_ALL_MOVIES_ERROR = "FETCH_ALL_MOVIES_ERROR"

export const ADD_MOVIE_START = "ADD_MOVIE_START"
export const ADD_MOVIE_SUCCESS = "ADD_MOVIE_SUCCESS"
export const ADD_MOVIE_ERROR = "ADD_MOVIE_ERROR"

const fetchAllMoviesStart = () => {
  return {
    type: FETCH_ALL_MOVIES_START,
  }
}

const fetchAllMoviesSuccess = (movies) => {
  return {
    type: FETCH_ALL_MOVIES_SUCCESS,
    payload: movies,
  }
}

const fetchAllMoviesFail = (err) => {
  return {
    type: FETCH_ALL_MOVIES_ERROR,
    payload: err,
  }
}

export const fetchAllMovies = () => {
  return async (dispatch) => {
    dispatch(fetchAllMoviesStart())
    const response = await axios
      .get("/movie-service/movies", { params: { unpaged: true } })
      .catch((err) => {
        console.log("error fetching movies", err)
        dispatch(fetchAllMoviesFail(err))
      })
    const data = response?.data
    console.log("all movies data", data)
    if (data) {
      dispatch(fetchAllMoviesSuccess(data))
    }
  }
}

const addMovieStart = () => {
  return { type: ADD_MOVIE_START }
}

const addMovieSuccess = (newMovie) => {
  return { type: ADD_MOVIE_SUCCESS, payload: newMovie }
}

const addMovieFail = (err) => {
  return { type: ADD_MOVIE_ERROR, payload: err }
}

export const addMovie = () => {
  return async (dispatch) => {
    dispatch(addMovieStart())
    const response = await axios.post("/movie-service/movies", {
      movieJson: "",
      file: "",
    })
  }
}
