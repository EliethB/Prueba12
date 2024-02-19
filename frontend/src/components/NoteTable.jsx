import React from "react";
import { useAlert } from "./AlertContext";
import { useModal } from "./Modals";
import { ModalAddCategory } from "./ModalAddCategory";
import ModalConfirmation from "./ModalConfirmation";
import { noteApi } from "../api/noteApi";

const NoteTable = ({
  notes,
  onDelete,
  onEditClick,
  onNumberChange,
  messageNote,
  categoryFiltered,
  updateChange,
}) => {
  const { showAlert } = useAlert();
  const { setModalOpen } = useModal();
  const noteNumbers = Array.from({ length: notes.length }, (_, i) => i + 1);
  let idNote = 0;
  const handleStateChange = async (id, newState) => {
    try {
      await noteApi.put(`/updateNoteState/${id}`, {
        id_state: newState,
      });
      onNumberChange();
      showAlert(messageNote, "success");
    } catch (error) {
      showAlert("Oops, an error occurred.", "error");
    }
  };
  const handleNumberChange = async (id, currentNumber, newNumber) => {
    try {
      await noteApi.put(`/updateNoteNumber/${id}`, {
        current_number: currentNumber,
        new_number: newNumber,
      });
      updateChange();
    } catch (error) {}
  };

  const sortedNotes = notes.sort((a, b) => {
    if (a.number === null && b.number === null) return 0;
    if (a.number === null) return 1;
    if (b.number === null) return -1;
    return a.number - b.number;
  });

  const filteredNotes = categoryFiltered
    ? sortedNotes.filter(
        (note) =>
          note.category &&
          note.category.toLowerCase().includes(categoryFiltered.toLowerCase())
      )
    : sortedNotes;
  const onClose = () => {
    setModalOpen(false, null);
  };

  const handleAddCategory = (noteID) => {
    setModalOpen(
      true,
      <ModalAddCategory
        onClose={onClose}
        noteID={noteID}
        updateChange={updateChange}
      />,
      500
    );
  };

  const onDeleteCategory = async () => {
    onClose();
    try {
      await noteApi.put(`/addCategoryANote/${idNote}`, {
        id_category: null,
      });
      showAlert("Your category has been delete successfully.", "success");
      updateChange();
    } catch (error) {
      showAlert("Oops, an error occurred.", "error");
    }
  };
  const handleDeleteCategoryOfNote = (id) => {
    idNote = id;
    setModalOpen(
      true,
      <ModalConfirmation
        onClose={onClose}
        handleAccept={onDeleteCategory}
        title={"Confirmation"}
        message={"Are you sure delete this category?"}
        typeOfOption={"Delete"}
      />,
      500
    );
  };
  return (
    <table className="w-full table-auto">
      <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
        <tr>
          <th className="p-2">
            <div className="text-left font-semibold">Number</div>
          </th>
          <th className="p-2">
            <div className="text-left font-semibold">Description</div>
          </th>
          <th className="p-2">
            <div className="text-center font-semibold">Action</div>
          </th>
          <th className="p-2">
            <div className="text-center font-semibold">Category</div>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 text-sm">
        {filteredNotes.map((note) => (
          <tr key={note.id}>
            <td className="p-2">
              <div className="text-left">
                <select
                  value={note.number !== null ? note.number : ""}
                  onChange={(e) => {
                    handleNumberChange(
                      note.id,
                      note.number,
                      parseInt(e.target.value)
                    );
                    onNumberChange();
                  }}
                >
                  <option value=""> </option>
                  {noteNumbers.map((number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  ))}
                </select>
              </div>
            </td>
            <td className="p-2">
              <div className="text-left">{note.description}</div>
            </td>
            <td className="p-2">
              <div className="flex justify-center">
                <button onClick={() => onDelete(note.id)} title="Delete Note">
                  <img
                    src="./assets/trash.svg"
                    className="h-8 w-8 rounded-full p-1 hover:bg-gray-200 hover:text-blue-600"
                    alt="DeleteNote"
                  />
                </button>
                <button onClick={() => onEditClick(note)} title="Edit Note">
                  <img
                    src="./assets/pencilEdit.svg"
                    className="h-8 w-8 rounded-full p-1 hover:bg-gray-200 hover:text-blue-600"
                    alt="addCategory"
                  />
                </button>
                <button
                  onClick={() =>
                    handleStateChange(note.id, note.id_state === 2 ? 1 : 2)
                  }
                  title="Archive Note"
                >
                  <img
                    src="./assets/archive.svg"
                    className="h-8 w-8 rounded-full p-1 hover:bg-gray-200 hover:text-blue-600"
                    alt="addCategory"
                  />
                </button>
              </div>
            </td>

            <td className="p-2">
              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center justify-center">
                {note.category ? (
                  <React.Fragment>
                    <span className="mr-1">{note.category}</span>
                    <button
                      type="button"
                      aria-label="deleteCategory"
                      className="text-blue-500 hover:text-blue-800 focus:outline-none"
                      onClick={() => handleDeleteCategoryOfNote(note.id)}
                      title="Delete category"
                    >
                      <img
                        src="./assets/delete.svg"
                        className="w-4 h-4  hover:bg-blue-300 rounded-full"
                        alt="deleteCategory"
                      />
                    </button>
                  </React.Fragment>
                ) : (
                  <button
                    type="button"
                    aria-label="addCategory"
                    className="text-blue-500 hover:text-blue-800 focus:outline-none"
                    onClick={() => handleAddCategory(note.id)}
                    title="Add category"
                  >
                    <img
                      src="./assets/addCircle.svg"
                      className="w-6 h-6  hover:bg-blue-300 rounded-full"
                      alt="addCategory"
                    />
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default NoteTable;
