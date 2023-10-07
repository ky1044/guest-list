import { useEffect, useState } from "react";
import { CREDENTIAL_FIELDS } from "./CredentialContainer";
import {
  CheckIcon,
  CopyIcon,
  EditIcon,
  TrashIcon,
  XIcon,
} from "..//icons/icons";
import { CredentialType, getCredentialField } from "../utils/credential";
const { ipcRenderer } = window.require("electron");

function Credential({
  credential,
  onDelete,
  onUpdate,
}: {
  credential: CredentialType;
  onDelete: (credential: CredentialType) => void;
  onUpdate: (credential: CredentialType) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [editedCredential, setEditedCredential] = useState({ ...credential });
  const [copyConfirmedField, setCopyConfirmedField] = useState(null);

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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLElement;
    if (event.key === "Enter") {
      handleSaveClick();
      target.blur();
    } else if (event.key === "Escape") {
      resetChange();
      target.blur();
    }
  };

  useEffect(() => {
    setCopyConfirmedField(null);
  }, [isEditing, editedCredential]);

  return (
    <tr className={isEdited ? "bg-amber-950" : ""}>
      {CREDENTIAL_FIELDS.map((field) => (
        <td>
          <div className="flex space-evenly content-center">
            <input
              type="text"
              name={field.id}
              value={getCredentialField(editedCredential, field.id)}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              className={
                isEditing
                  ? "w-full px-2 py-1 bg-zinc-600 border rounded"
                  : "w-full px-2 py-1  bg-transparent border border-transparent focus:bg-zinc-600 inputWithButtonOverlay"
              }
            />
            {field.isCopyable && !isEditing && (
              <button
                onClick={(e) => {
                  ipcRenderer.send(
                    "writeText",
                    getCredentialField(editedCredential, field.id)
                  );
                  setCopyConfirmedField(field.id);
                }}
                className="bg-cyan-500 hover:bg-cyan-600 my-auto py-1.5 px-1.5 rounded-lg"
              >
                {field.id === copyConfirmedField ? (
                  <CheckIcon size={12} />
                ) : (
                  <CopyIcon size={12} />
                )}
              </button>
            )}
          </div>
        </td>
      ))}
      <td>
        <div className="flex justify-evenly gap-1">
          {isEditing || isEdited ? (
            <>
              <button
                onClick={handleSaveClick}
                className="bg-green-400 hover:bg-green-500 my-auto py-1.5 px-2 rounded-lg"
              >
                <CheckIcon size={16} />
              </button>
              <button
                onClick={resetChange}
                className="bg-red-500 hover:bg-red-600 my-auto py-1.5 px-2 rounded-lg"
              >
                <XIcon size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEditClick}
                className="bg-zinc-400 hover:bg-zinc-500 my-auto py-1.5 px-2 rounded-lg"
              >
                <EditIcon size={16} />
              </button>
              <button
                onClick={handleDeleteClick}
                className="bg-red-500 hover:bg-red-600 my-auto py-1.5 px-2 rounded-lg"
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
