import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"

const IndexPage = () => {
  return (
    <Layout isHomePage>
      <Seo title="Home page" />
      <div> index page</div>
    </Layout>
  )
}

export default IndexPage
