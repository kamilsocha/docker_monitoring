import React, { useCallback, useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import { faSync } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Page from "../../components/common/Page"
import PageTitle from "../../components/common/PageTitle"
import PageContent from "../../components/common/PageContent"

import { fetchImages } from "../../services/imageService"
import BasicTable from "../../components/common/BasicTable"
import { COLUMNS } from "../../components/Images/imagesTableColumns"
import ImagesFilters from "../../components/Images/ImagesFilters"

const ImagesPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [dangling, setDangling] = useState(false)
  const [error, setError] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const [images, setImages] = useState([])

  const getImages = useCallback(() => {
    setIsLoading(true)
    setError(null)
    fetchImages(showAll, dangling)
      .catch((err) => setError(err.message))
      .then((data) => {
        setImages(data)
        setIsLoading(false)
      })
  }, [showAll, dangling])

  useEffect(() => {
    getImages()
  }, [getImages])

  const provideColumnStyle = () => {
    return { textAlign: "center" }
  }

  const provideCellStyle = (cell) => {
    const style = { textAlign: "center" }
    switch (cell.column.Header) {
      case "Id":
        return { ...style, width: "20%" }
      case "Containers":
        return { ...style, width: "20%" }
      case "RepoTags":
        return { ...style, width: "20%" }
      case "Size":
        return { ...style, width: "20%" }
      case "Created":
        return { ...style, width: "20%" }
      default:
        return style
    }
  }

  return (
    <Page fluid="true">
      <PageTitle title="Images">
        <Button variant="light" onClick={getImages}>
          <FontAwesomeIcon icon={faSync} spin={isLoading} />
        </Button>
      </PageTitle>
      <PageContent>
        <BasicTable
          columns={COLUMNS}
          data={images || []}
          baseurl="/images"
          isLoading={isLoading}
          error={error}
          getColumnStyle={provideColumnStyle}
          getCellStyle={provideCellStyle}
        >
          <ImagesFilters
            showAll={showAll}
            setShowAll={setShowAll}
            dangling={dangling}
            setDangling={setDangling}
          />
        </BasicTable>
      </PageContent>
    </Page>
  )
}

export default ImagesPage
