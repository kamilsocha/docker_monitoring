import React, { useState, useEffect, useCallback } from "react"
import Page from "../../components/common/Page"
import PageTitle from "../../components/common/PageTitle"
import PageContent from "../../components/common/PageContent"
import { Button } from "react-bootstrap"
import { faSync } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import VolumesFilters from "../../components/Volumes/VolumesFilters"
import { fetchVolumes } from "../../services/volumeService"
import { COLUMNS } from "../../components/Volumes/volumesTableColumns"
import BasicTable from "../../components/common/BasicTable"

const VolumesPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [dangling, setDangling] = useState(false)
  const [error, setError] = useState(null)
  const [volumes, setVolumes] = useState([])

  const getVolumes = useCallback(() => {
    setIsLoading(true)
    setError(null)
    fetchVolumes(dangling)
      .catch((err) => setError(err.message))
      .then((data) => {
        setVolumes(data)
        setIsLoading(false)
      })
  }, [dangling])

  useEffect(() => {
    getVolumes()
  }, [getVolumes])

  const provideColumnStyle = () => {}

  const provideCellStyle = (cell) => {
    return { textAlign: "center" }
  }

  return (
    <Page fluid="true">
      <PageTitle title="Volumes">
        <Button variant="light" onClick={getVolumes}>
          <FontAwesomeIcon icon={faSync} spin={isLoading} />
        </Button>
      </PageTitle>
      <PageContent>
        <BasicTable
          columns={COLUMNS}
          data={volumes || []}
          baseurl="/volumes"
          isLoading={isLoading}
          error={error}
          getColumnStyle={provideColumnStyle}
          getCellStyle={provideCellStyle}
        >
          <VolumesFilters dangling={dangling} setDangling={setDangling} />
        </BasicTable>
      </PageContent>
    </Page>
  )
}

export default VolumesPage
