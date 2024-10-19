import Layout from "../Layouts/Layout";
import UsersTable from "../Components/UsersTable";
import { usePage, Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

function Home({ users }) {
  const { flash } = usePage().props;
  const { component } = usePage();

  const [flashMsg, setFlashMsg] = useState(flash.message);

  useEffect(() => {
    setFlashMsg(flash.message);
    setTimeout(() => {
      setFlashMsg(null);
    }, 3000);
  }, [flash]);

  return (
    <>
      <Head title={component} />
      {flashMsg &&
        <div className="alert alert-success alert_fixed">{flashMsg}</div>
      }
      {users.length > 0
      ? <>
          <h1 className="main__title h2">Users table</h1>
          <UsersTable data={users} />
        </>
      : <>
          <h1 className="main__title h2">Users not found</h1>
          <p className="main__info-paragraph">Try to add some in "Create user" page</p>
        </>
      }
    </>
  )
}

Home.layout = page => <Layout children={page} />

export default Home;