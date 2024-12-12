import "./table.css";

interface UsersResponse {
  count: number;
  numDuplicatedIds: number;
  duplicatedIds: string[];
  duplicatedFieldsIds: string[];
  invalidEmailsIds: number[];
  invalidPhonesIds: number[];
  data: User[];
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export const Table = ({ users }: { users: UsersResponse }) => {
  const {
    count,
    numDuplicatedIds,
    data,
    duplicatedIds,
    duplicatedFieldsIds,
    invalidEmailsIds,
    invalidPhonesIds,
  } = users;

  return (
    <>
      <div>Records: {count}</div>
      <div>Duplicates: {numDuplicatedIds}</div>
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
            {data.map(({ id, name, email, phone }) => {
              if (duplicatedFieldsIds.includes(id.toString())) return;

              return (
                <tr
                  key={id}
                  className={`${
                    duplicatedIds.includes(id.toString()) ? "red" : ""
                  }`}
                >
                  <td>{id}</td>
                  <td>{name}</td>
                  <td
                    className={`${
                      invalidEmailsIds.includes(id) ? "yellow" : ""
                    }`}
                  >
                    {email}
                  </td>
                  <td
                    className={`${
                      invalidPhonesIds.includes(id) ? "yellow" : ""
                    }`}
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
