import React, { useCallback, useEffect, useState } from "react"
import Page from "../../components/common/Page"
import PageTitle from "../../components/common/PageTitle"
import PageContent from "../../components/common/PageContent"

import { fetchNetworks } from "../../services/networkService"
import BasicTable from "../../components/common/BasicTable"
import { COLUMNS } from "../../components/Networks/networksTableColumns"

const NetworksPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [networks, setNetworks] = useState([])

  const getNetworks = useCallback(() => {
    setIsLoading(true)
    setError(null)
    fetchNetworks()
      .catch((err) => setError(err.message))
      .then((data) => {
        setNetworks(data)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    getNetworks()
  }, [getNetworks])

  const provideColumnStyle = () => {
    return { textAlign: "center" }
  }

  const provideCellStyle = (cell) => {
    const style = { textAlign: "center" }
    switch (cell.column.Header) {
      case "Name":
        return { ...style, width: "15%" }
      case "Id":
        return { ...style, width: "15%" }
      case "Driver":
        return { ...style, width: "15%" }
      case "Labels":
        return { ...style, width: "40%" }
      case "Containers":
        return { ...style, width: "15%" }
      default:
        return style
    }
  }

  return (
    <Page fluid="true">
      <PageTitle title="Networks"></PageTitle>
      <PageContent>
        <BasicTable
          columns={COLUMNS}
          data={networks || []}
          baseurl="/networks"
          isLoading={isLoading}
          error={error}
          getColumnStyle={provideColumnStyle}
          getCellStyle={provideCellStyle}
        />
      </PageContent>
    </Page>
  )
}

export default NetworksPage
