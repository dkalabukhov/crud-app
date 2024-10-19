import Layout from "../Layouts/Layout";
import { usePage, Head } from "@inertiajs/react";

function About() {
  const { component } = usePage();

  return (
    <>
      <Head title={component} />
      <h1 className="main__title h2">About</h1>
      <p className="main__info-paragraph">
        This is a fully responsive CRUD application.
        You can create, edit, delete and view users.
        It also uses a validation for creating users on a server-side, as well on a client-side
      </p>
    </>
  )
}


About.layout = page => <Layout children={page} />

export default About;