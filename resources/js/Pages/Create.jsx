import Layout from "../Layouts/Layout";

function Create() {
  return (
    <>
      <h1 className="main__title h2">Create a new user</h1>
    </>
  )
}

Create.layout = page => <Layout children={page} />

export default Create;