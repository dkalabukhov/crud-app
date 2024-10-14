import Layout from "../Layouts/Layout";
import UsersTable from "../Components/UsersTable";

function Home({ users }) {
  return (
    <>
      {users
      ? <>
          <h1 className="main__title h2">Users table</h1>
          <UsersTable data={users} />
        </>
      : <>
          <h1 className="main__title h2">Users not found</h1>
          <p className="main__no-users">Try to add some in "Create user" page</p>
        </>
      }
    </>
  )
}

Home.layout = page => <Layout children={page} />

export default Home;