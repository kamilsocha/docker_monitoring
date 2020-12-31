import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import InfoComponent from "../../components/Home/InfoComponent"
import VersionComponent from "../../components/Home/VersionComponent"
import Page from "../../components/common/Page"
import PageTitle from "../../components/common/PageTitle"
import PageContent from "../../components/common/PageContent"

import * as configActions from "../../store/actions/config"

const HomePage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(configActions.fetchConfig())
  }, [dispatch])
  return (
    <Page fluid="true">
      <PageTitle title="Host System Information"></PageTitle>
      <PageContent>
        <InfoComponent />
        <VersionComponent />
      </PageContent>
    </Page>
  )
}

export default HomePage
