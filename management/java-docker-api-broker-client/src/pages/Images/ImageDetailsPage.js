import React, { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { Container, Spinner, Row, Col } from "react-bootstrap"

import ImageDetails from "../../components/Images/Details/ImageDetails"
import Page from "../../components/common/Page"
import PageTitle from "../../components/common/PageTitle"
import PageContent from "../../components/common/PageContent"

import { inspectImage } from "../../services/imageService"
import BackButton from "../../components/common/BackButton"

const ImageDetailsPage = () => {
  const { Id } = useParams()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState(null)

  const fetchImage = useCallback(() => {
    setIsLoading(true)
    setError(null)
    inspectImage(Id)
      .catch((err) => {
        setError(err.message)
        setIsLoading(false)
      })
      .then((data) => {
        console.log("image", data)
        setImage(data)
        setIsLoading(false)
      })
  }, [Id])

  useEffect(() => {
    fetchImage()
  }, [fetchImage])

  if (isLoading) {
    return (
      <Container style={{ minHeight: "100vh" }}>
        <Row style={{ minHeight: "100vh" }}>
          <Col
            md={{ span: 2, offset: 5 }}
            className="align-self-center text-center"
          >
            <Spinner animation="border" variant="dark" />
          </Col>
        </Row>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <div className="text-danger">An error occured. {error}</div>
      </Container>
    )
  }

  return (
    <Page fluid="true">
      <PageTitle title="Image Details">
        <BackButton />
      </PageTitle>
      <PageContent>
        {image && <ImageDetails Id={Id} image={image} />}
      </PageContent>
    </Page>
  )
}

export default ImageDetailsPage
