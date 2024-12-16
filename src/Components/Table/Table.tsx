import "./table.css";

interface UsersResponse {
  count: number;
  numDuplicatedIds: number;
  numDuplicatedFieldsIds: number;
  data: User[];
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  invalidPhone: string;
  invalidEmail: string;
  hasDuplicatedValue: string;
}

export const Table = ({ users }: { users: UsersResponse }) => {
  const {
    count,
    numDuplicatedIds,
    numDuplicatedFieldsIds,
    data,
  } = users;

  return (
    <>
      <div>Records: {count}</div>
      <div>Duplicates fields (skipped): {numDuplicatedFieldsIds}</div>
      <div>Duplicates values: {numDuplicatedIds}</div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, name, email, phone, invalidPhone, invalidEmail, hasDuplicatedValue }) => {

              return (
                <tr
                  key={id}
                  className={`${hasDuplicatedValue}`}
                >
                  <td>{id}</td>
                  <td>{name}</td>
                  <td
                    className={`${invalidEmail}`}
                  >
                    {email}
                  </td>
                  <td
                    className={`${invalidPhone}`}
                  >
                    {phone}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
