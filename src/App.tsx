import { useState, ChangeEvent, FormEvent } from "react";
import Papa from "papaparse";
import { Spinner } from "./Components/Loader/Spinner";
import { Table } from "./Components/Table/Table";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface UsersResponse {
  count: number;
  numDuplicatedIds: number;
  duplicatedIds: string[];
  duplicatedFieldsIds: string[];
  invalidEmailsIds: number[];
  invalidPhonesIds: number[];
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

  const findDuplicateIds = (arr: User[]): { duplicateIds: string[], duplicateFieldsIds: string[] } => {
    const seen: { [key: string]: Set<string> } = {};
    const duplicateValues: Set<string> = new Set();
    const duplicateFields: Set<string> = new Set();
    const fullDuplicateMap: Map<string, string> = new Map();
  
    for (const user of arr) {
      // Create a unique key based on all fields
      const userKey = `${user.name}-${user.email}-${user.phone}`;
  
      // Check if this combination has been seen before
      if (fullDuplicateMap.has(userKey)) {
        // If fully duplicated, add to duplicateFields and skip further processing
        duplicateFields.add(user.id.toString());
        continue;
      } else {
        // Mark this combination as seen
        fullDuplicateMap.set(userKey, user.id.toString());
      }
  
      // Process for duplicateValues if not fully duplicated
      for (const key of ["name", "email", "phone"] as Array<keyof User>) {
        const value = String(user[key]);
  
        // Initialize the map if it does not exist
        if (!seen[key]) {
          seen[key] = new Set(); 
        }
  
        // If the value has already been seen, mark the ID as a duplicate.
        if (seen[key].has(value)) {
          duplicateValues.add(user.id.toString());
        } else {
          seen[key].add(value); 
        }
      }
    }
  
    console.log("# duplicate values:", Array.from(duplicateValues));
    console.log("# duplicate fields:", Array.from(duplicateFields));
  
    return {
      duplicateIds: Array.from(duplicateValues),
      duplicateFieldsIds: Array.from(duplicateFields),
    };
  };
  

  const getInvalIdPhones = (users: User[]): number[] => {
    const invalidIdPhones: number[] = [];
    const regexPhone = /^[0-9]{10}$/;

    for (const user of users) {
      if (!regexPhone.test(user.phone)) {
        invalidIdPhones.push(user.id);
      }
    }

    return invalidIdPhones;
  };

  const getInvalIdEmails = (users: User[]): number[] => {
    const invalidIdEmails: number[] = [];
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (const user of users) {
      if (!regex.test(user.email)) {
        invalidIdEmails.push(user.id);
      }
    }

    return invalidIdEmails;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (file) {
      setLoading(true);
      Papa.parse(file, {
        complete: async (result) => {
          const results: User[] = [];

          (result.data as CsvRow[]).forEach((row) => {
            const name = row["Nombre"];
            const phone = row["Telefono"] || "";
            const email = row["Correo Electronico"] || "";

            if (name || phone || email) {
              results.push({
                id: results.length + 1,
                name: name || "N/A",
                email,
                phone,
              });
            }
          });

          const {duplicateIds, duplicateFieldsIds} = findDuplicateIds(results);
          const invalidEmailsIds = getInvalIdEmails(results);
          const invalidPhonesIds = getInvalIdPhones(results);

          const usersInfo = {
            data: results,
            count: results.length,
            duplicatedIds: duplicateIds,
            duplicatedFieldsIds: duplicateFieldsIds,
            numDuplicatedIds: duplicateIds.length,
            invalidEmailsIds,
            invalidPhonesIds,
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
