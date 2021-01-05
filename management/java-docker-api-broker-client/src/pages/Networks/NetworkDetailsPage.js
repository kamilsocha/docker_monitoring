import React, { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { Container, Spinner, Row, Col } from "react-bootstrap"

import NetworkDetails from "../../components/Networks/Details/NetworkDetails"
import Page from "../../components/common/Page"
import PageTitle from "../../components/common/PageTitle"
import PageContent from "../../components/common/PageContent"

import { inspectNetwork } from "../../services/networkService"
import BackButton from "../../components/common/BackButton"

const NetworkDetailsPage = () => {
  const { Id } = useParams()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [network, setNetwork] = useState(null)

  const fetchNetwork = useCallback(() => {
    setIsLoading(true)
    setError(null)
    inspectNetwork(Id)
      .catch((err) => {
        setError(err.message)
        setIsLoading(false)
      })
      .then((data) => {
        setNetwork(data)
        setIsLoading(false)
      })
  }, [Id])

  useEffect(() => {
    fetchNetwork()
  }, [fetchNetwork])

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
        {network && <NetworkDetails Id={Id} network={network} />}
      </PageContent>
    </Page>
  )
}

export default NetworkDetailsPage
