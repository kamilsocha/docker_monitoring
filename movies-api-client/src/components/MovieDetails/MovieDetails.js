import React, { useEffect, useState } from "react"
import { Button, Card, Col, Row, Spinner } from "react-bootstrap"
import { placeholderImage } from "../../constants/constants"
import Rating from "./Rating"

import { apiUri } from "../../axios-orders"

import "./movieDetails.style.css"

const MovieDetails = ({
  movie,
  onButtonClick,
  buttonText = "Send Your Rating",
  isLoading,
}) => {
  const [rating, setRating] = useState(movie.rating ? movie.rating : 0)

  useEffect(() => {
    if (movie.rating) {
      setRating(movie.rating)
    }
  }, [movie])

  const handleRatingSave = (value) => {
    setRating(value)
  }

  const handleButtonClick = () => {
    onButtonClick(movie, rating)
  }

  return (
    <>
      <Card className="bg-main shadow my-2">
        <Row>
          <Col md={4} className="">
            <Card.Img
              src={`${apiUri}/movie-service/${movie.posterUri}`}
              alt={placeholderImage}
              className="card-image shadow"
            />
          </Col>
          <Col md={{ span: 6, offset: 1 }} className="">
            <Card.Body>
              <Card.Text className="h1 my-2 font-weight-bolder text-warning">
                {movie.name}
              </Card.Text>
              <Card.Text className=" h3 font-weight-bold">
                {movie.director}
              </Card.Text>
              <Card.Text className="h5">{movie.description}</Card.Text>
              <Rating
                iconSize="2x"
                ratingScale={10}
                initRating={rating}
                onSaveRating={handleRatingSave}
                fillColor="#f0ad4e"
                blankColor="#292b2c"
              />
              <Button
                variant="warning"
                className="float-right"
                onClick={handleButtonClick}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading...
                  </>
                ) : (
                  buttonText
                )}
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default MovieDetails
