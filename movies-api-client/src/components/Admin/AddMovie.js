import React from "react"
// import { useDispatch, useSelector } from "react-redux"

import axios from "../../axios-orders"

// import * as allMovieActions from "../../store/allMovies/actions"
import AddMovieForm from "./AddMovieForm"

const AddMovie = () => {
  const handleMovieAdd = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true)
    console.log("values", values)
    let formData = new FormData()
    formData.append("file", values.file)
    let movieJsonObj = {
      name: values.name,
      director: values.director,
      description: values.description,
    }
    formData.append("movieJson", JSON.stringify(movieJsonObj))
    const response = await axios
      .post("movie-service/movies", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .catch((err) => {
        console.log(err)
      })
      .then(() => {
        setSubmitting(false)
        resetForm()
      })
    console.log("response", response)
  }

  return (
    <>
      <div className="h1 font-weight-bolder text-center">Create Movie</div>
      <AddMovieForm onSubmit={handleMovieAdd} />
    </>
  )
}

export default AddMovie
