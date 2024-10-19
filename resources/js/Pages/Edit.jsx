import Layout from "../Layouts/Layout";
import Form from "../Components/Form";
import { usePage, Head } from "@inertiajs/react";

function Edit({ user }) {
  const { component } = usePage();

  const { id, email, name, sex, birthday } = user;

  return (
    <>
      <Head title={component} />
      <h1 className="main__title h2">Edit the user: {name} </h1>
      <Form id={id} email={email} name={name} sex={sex} birthday={birthday} user={user} />
    </>
  )
}

Edit.layout = page => <Layout children={page} />

export default Edit;