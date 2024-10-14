import Layout from "../Layouts/Layout"

function Home() {
  return (
    <>
      <h1>Welcome Home</h1>
    </>
  )
}

Home.layout = page => <Layout children={page} />

export default Home;