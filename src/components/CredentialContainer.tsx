import React, { useState } from "react";
import { AddIcon } from "../icons/icons";
import { CredentialType, getCredentialField } from "../utils/credential";
import Credential from "./Credential";

const EMPTY_CREDENTIAL: CredentialType = {
  id: 0,
  email: "kenyokokawa@gmail.com",
  password: "test",
  environment: "staging",
  notes: "",
  created: new Date(),
};

type CredentialField = {
  id: keyof CredentialType;
  name: string;
  isCopyable: boolean;
};

export const CREDENTIAL_FIELDS: CredentialField[] = [
  { id: "email", name: "Email", isCopyable: true },
  { id: "password", name: "Password", isCopyable: true },
  { id: "environment", name: "Environment", isCopyable: false },
  { id: "notes", name: "Notes", isCopyable: false },
];

function CredentialContainer() {
  const [credentials, setCredentials] = useState([]);
  const [newCredential, setNewCredential] =
    useState<CredentialType>(EMPTY_CREDENTIAL);

  const addCredential = () => {
    setCredentials([...credentials, newCredential]);
    setNewCredential({
      ...newCredential,
      id: (newCredential.id += 1),
      notes: "",
    });
  };

  const deleteCredential = (credentialToDelete: CredentialType) => {
    const updatedCredentials = credentials.filter(
      (credential) => credential.id !== credentialToDelete.id
    );
    setCredentials(updatedCredentials);
  };

  const updateCredential = (editedCredential: CredentialType) => {
    const updatedCredentials = credentials.map((credential) =>
      credential.id === editedCredential.id
        ? { ...editedCredential }
        : credential
    );
    setCredentials(updatedCredentials);
  };

  const handleKeyPressForEnter = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      addCredential();
    }
  };

  return (
    <div className="container my-4">
      <table className="w-full border-collapse rounded-lg overflow-hidden bg-zinc-800">
        <thead>
          <tr className="bg-zinc-700">
            {CREDENTIAL_FIELDS.map((field) => (
              <th className="px-2 py-1">{field.name}</th>
            ))}
            <th className="px-2 py-1"></th>
          </tr>
        </thead>
        <tbody>
          {credentials.map((credential, index) => (
            <Credential
              key={index}
              credential={credential}
              onDelete={deleteCredential}
              onUpdate={updateCredential}
            />
          ))}

          <tr>
            {CREDENTIAL_FIELDS.map((field) => (
              <td>
                <input
                  type="text"
                  name={field.id}
                  value={getCredentialField(newCredential, field.id)}
                  onChange={(e) =>
                    setNewCredential({
                      ...newCredential,
                      [field.id]: e.target.value,
                    })
                  }
                  onKeyDown={handleKeyPressForEnter}
                  className="w-full px-2 py-1 bg-zinc-600 border rounded"
                />
              </td>
            ))}
            <td>
              <div className="flex justify-evenly">
                <button
                  onClick={addCredential}
                  className="bg-green-400 hover:bg-green-500 my-auto py-1.5 px-2 rounded-lg"
                >
                  <AddIcon size={16} />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CredentialContainer;
