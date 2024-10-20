import Layout from "../Layouts/Layout";
import normalizeDate from "../Utils/normalizeDate";

function Show({ user }) {
  const createdAt = normalizeDate(user.created_at);
  const updatedAt = normalizeDate(user.updated_at);

  return (
    <>
      <h1 className="main__title h2">Info about user: {user.name}</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr className="table-success">
              <th>Id</th>
              <th>Email</th>
              <th>Name</th>
              <th>Sex</th>
              <th>Birthday</th>
              <th>Created at</th>
              <th>Updated at</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {user.id}
              </td>
              <td>
                {user.email}
              </td>
              <td>
                {user.name}
              </td>
              <td>
                {user.sex}
              </td>
              <td>
                {user.birthday}
              </td>
              <td>
                {createdAt}
              </td>
              <td>
                {updatedAt}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

Show.layout = page => <Layout children={page} />

export default Show;
