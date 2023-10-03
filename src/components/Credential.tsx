import { useState } from "react";
import { CREDENTIAL_FIELDS } from "./CredentialContainer";
import { CheckIcon, EditIcon, TrashIcon, XIcon } from "..//icons/icons";

export type CredentialType = {
  id: number;
  email: string;
  password?: string;
  environment?: string;
  notes?: string;
  created: Date;
};

function Credential({ credential, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [editedCredential, setEditedCredential] = useState({ ...credential });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setIsEdited(false);
    onUpdate(editedCredential);
  };

  const handleDeleteClick = () => {
    onDelete(credential);
  };

  const resetChange = () => {
    setEditedCredential({ ...credential });
    setIsEdited(false);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsEdited(true);
    setEditedCredential({ ...editedCredential, [name]: value });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSaveClick();
      event.target.blur();
    } else if (event.key === "Escape") {
      resetChange();
      event.target.blur();
    }
  };

  return (
    <tr>
      {CREDENTIAL_FIELDS.map((field) => (
        <td>
          <input
            type="text"
            name={field.id}
            value={editedCredential[field.id]}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            className={
              isEditing
                ? "w-full px-2 py-1 bg-zinc-600 border rounded"
                : "w-full px-2 py-1  bg-zinc-800 border border-transparent focus:bg-zinc-600"
            }
          />
        </td>
      ))}
      <td>
        <div className="flex justify-evenly">
          {isEditing || isEdited ? (
            <>
              <button
                onClick={handleSaveClick}
                className="bg-green-400 hover:bg-green-500 my-auto h-6 px-2 rounded-lg"
              >
                <CheckIcon size={16} />
              </button>
              <button
                onClick={resetChange}
                className="bg-red-500 hover:bg-red-600 my-auto h-6 px-2 rounded-lg"
              >
                <XIcon size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEditClick}
                className="bg-zinc-400 hover:bg-zinc-500 my-auto h-6 px-2 rounded-lg"
              >
                <EditIcon size={16} />
              </button>
              <button
                onClick={handleDeleteClick}
                className="bg-red-500 hover:bg-red-600 my-auto h-6 px-2 rounded-lg"
              >
                <TrashIcon size={16} />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

export default Credential;
