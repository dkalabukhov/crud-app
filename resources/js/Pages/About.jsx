import Layout from "../Layouts/Layout";

function About() {
  return (
    <>
      <h1 className="main__title h2">About</h1>
      <p className="main__paragraph">
        This is a fully responsive CRUD application.
        You can create, edit, delete and view users.
        It also uses a validation for creating users on a server-side, as well on a client-side
      </p>
    </>
  )
}


About.layout = page => <Layout children={page} />

export default About;