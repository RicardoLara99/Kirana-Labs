import { useState, ChangeEvent, FormEvent } from "react";
import Papa from "papaparse";
import { Spinner } from "./Components/Loader/Spinner";
import { Table } from "./Components/Table/Table";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  invalidPhone: string;
  invalidEmail: string;
  hasDuplicatedValue: string;
}

interface UsersResponse {
  count: number;
  numDuplicatedIds: number;
  numDuplicatedFieldsIds: number;
  data: User[];
}

interface CsvRow {
  Nombre: string;
  Telefono: string;
  "Correo Electronico": string;
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UsersResponse | null>(null);

  const getInvalIdPhone = (phone:string): string => {
    const regexPhone = /^[0-9]{10}$/;

    if (!regexPhone.test(phone)) {
      return "yellow"
    }

    return "";
  };

  const getInvalIdEmail = (email:string): string => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      return "yellow"
    }

    return ""
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (file) {
      setLoading(true);
      const seen: { [key: string]: Set<string> } = {};
      const duplicateValues: Set<string> = new Set();
      const duplicateFields: Set<string> = new Set();
      const fullDuplicateMap: Map<string, string> = new Map();
      
      Papa.parse(file, {
        complete: async (result) => {
          const results: User[] = [];

          for(const row of (result.data as CsvRow[])){
            const name = row["Nombre"];
            const phone = row["Telefono"] || "";
            const email = row["Correo Electronico"] || "";
            let hasDuplicatedValue = ""
            if (name || phone || email) {
              /*
               * Add duplicates and invalids logic
               */
              // Create a unique key based on all fields
              const userKey = `${name}-${email}-${phone}`;
              const id = results.length + 1;
              // Check if this combination has been seen before
              if (fullDuplicateMap.has(userKey)) {
                // If fully duplicated, add to duplicateFields and skip further processing
                duplicateFields.add(id.toString());
                continue;
              } else {
                // Mark this combination as seen
                fullDuplicateMap.set(userKey, id.toString());
              }

              // Process for duplicateValues if not fully duplicated
              for (const key of [name, email, phone] as Array<keyof User>) {
                const value = key

                // Initialize the map if it does not exist
                if (!seen[key]) {
                  seen[key] = new Set(); 
                }

                // If the value has already been seen, mark the ID as a duplicate.
                if (seen[key].has(value)) {
                  duplicateValues.add(id.toString());
                  hasDuplicatedValue = "red";
                } else {
                  seen[key].add(value); 
                }
              }
              results.push({
                id,
                name: name || "N/A",
                email,
                phone,
                invalidPhone: getInvalIdPhone(phone),
                invalidEmail: getInvalIdEmail(email),
                hasDuplicatedValue
              });
            }
          }
          const duplicateIds = Array.from(duplicateValues)
          const duplicateFieldsIds = Array.from(duplicateFields)

          const usersInfo = {
            data: results,
            count: results.length,
            numDuplicatedIds: duplicateIds.length,
            numDuplicatedFieldsIds: duplicateFieldsIds.length,
          };

          setTimeout(() => {
            setLoading(false);
            setUsers(usersInfo);
          }, 1500);
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    setUsers(null);
    setFile(null);
    const form = e.currentTarget.closest("form") as HTMLFormElement;
    form?.reset();
  };

  return (
    <div className="container">
      <h2>CSV LOADER</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <div className="buttons-container">
          <button type="submit" className="submit">
            Upload
          </button>
          <button onClick={handleReset} className="reset">
            Reset
          </button>
        </div>
      </form>
      
      {users ? (
        <Table users={users} />
      ) : (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <h2 className="title"> ¡Upload your CSV! 🤓</h2>
          )}
        </>
      )}
    </div>
  );
}

export default App;
