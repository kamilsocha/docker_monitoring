import React, { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { Container, Spinner, Row, Col } from "react-bootstrap"

import VolumeDetails from "../../components/Volumes/Details/VolumeDetails"
import Page from "../../components/common/Page"
import PageTitle from "../../components/common/PageTitle"
import PageContent from "../../components/common/PageContent"
import BackButton from "../../components/common/BackButton"

import { inspectVolume } from "../../services/volumeService"

const VolumeDetailsPage = () => {
  const { Name } = useParams()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [volume, setVolume] = useState(null)

  const fetchVolume = useCallback(() => {
    setIsLoading(true)
    setError(null)
    inspectVolume(Name)
      .catch((err) => {
        setError(err.message)
        setIsLoading(false)
      })
      .then((data) => {
        console.log("volume", data)
        setVolume(data)
        setIsLoading(false)
      })
  }, [Name])

  useEffect(() => {
    fetchVolume()
  }, [fetchVolume])

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
      <PageTitle title="Volume Details">
        <BackButton />
      </PageTitle>
      <PageContent>
        {volume && <VolumeDetails Name={Name} volume={volume} />}
      </PageContent>
    </Page>
  )
}

export default VolumeDetailsPage
