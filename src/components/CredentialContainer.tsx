import React, { useState } from "react";
import Credential, { CredentialType } from "./Credential";
import { AddIcon } from "../icons/icons";

const EMPTY_CREDENTIAL: CredentialType = {
  id: 0,
  email: "kenyokokawa@gmail.com",
  password: "test",
  environment: "staging",
  notes: "",
  created: new Date(),
};

export const CREDENTIAL_FIELDS = [
  { id: "email", name: "Email" },
  { id: "password", name: "Password" },
  { id: "environment", name: "Environment" },
  { id: "notes", name: "Notes" },
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

  const handleKeyPressForEnter = (event) => {
    if(event.key === 'Enter'){
      addCredential()
    }
  }

  return (
    <div className="container my-4">
      <table className="w-full border-collapse rounded-lg overflow-hidden bg-zinc-800">
        <thead>
          <tr className="bg-zinc-700">
            {CREDENTIAL_FIELDS.map((field) => (
              <th className="px-2 py-1">{field.name}</th>
            ))}
            <th className="px-2 py-1">Actions</th>
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
                  value={newCredential[field.id]}
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
                  className="bg-green-400 hover:bg-green-500 my-auto h-6 px-2 rounded-lg"
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
