import { useEffect, useState, ChangeEvent } from "react";
import "./table.css";

interface UsersResponse {
  count: number;
  numDuplicatedIds: number;
  numDuplicatedFieldsIds: number;
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
  const [search, setSearch] = useState("")
  const {
    count,
    numDuplicatedIds,
    numDuplicatedFieldsIds,
    data,
    duplicatedIds,
    duplicatedFieldsIds,
    invalidEmailsIds,
    invalidPhonesIds,
  } = users;

  const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
    setSearch(e.target.value)
  }
  
  return (
    <>
      <div>Records: {count}</div>
      <div>Duplicates fields: {numDuplicatedFieldsIds}</div>
      <div>Duplicates values: {numDuplicatedIds}</div>
      <div>
        <label>Busqueda:</label>
        <input onChange={handleChange} placeholder="Nombre - Email - Phone"/>
      </div>
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
            {data.filter((user)=>user.name.includes(search) || user.email.includes(search) || user.phone.includes(search)).map(({ id, name, email, phone }) => {
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
