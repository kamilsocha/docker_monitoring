import React from "react"
import UsersManagement from "../../components/Admin/UsersManagement"
import Page from "../../components/common/Page"
import PageContent from "../../components/common/PageContent"
import PageTitle from "../../components/common/PageTitle"

const AdminPage = () => {
  return (
    <Page fluid="true">
      <PageTitle></PageTitle>
      <PageContent>
        <UsersManagement />
      </PageContent>
    </Page>
  )
}

export default AdminPage
