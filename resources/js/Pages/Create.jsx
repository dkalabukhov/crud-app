import Layout from "../Layouts/Layout";
import Form from "../Components/Form";
import { usePage, Head } from "@inertiajs/react";

function Create() {
  const { component } = usePage();

  return (
    <>
      <Head title={component} />
      <h1 className="main__title h2">Create a new user</h1>
      <Form />
    </>
  )
}

Create.layout = page => <Layout children={page} />

export default Create;