import React, { useState } from "react";
import TableActivo from "./TableActivo";
import NewNotes from "./NewNotes";
import { ModalConsumer } from "./Modals";
import NewCategory from "./NewCategory";

const View = () => {
  const [showNewNotes, setShowNewNotes] = useState(false);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [updateNotes, setUpdateNotes] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const toggleShowNewNotes = () => {
    setEditMode(false);
    setShowNewCategory(false);
    setShowNewNotes(!showNewNotes);
  };

  const toggleShowNewCategory = () => {
    setEditMode(false);
    setShowNewNotes(false);
    setShowNewCategory(true);
  };
  const handleCloseNewNotes = () => {
    setShowNewNotes(false);
    setShowNewCategory(false);
    setUpdateNotes((prev) => !prev);
  };

  return (
    <React.Fragment>
      <h1 className="text-4xl font-bold mb-4 text-center">Notes</h1>
      <div className="relative content-center">
        <div className="flex justify-around mb-2">
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={toggleShowNewNotes}
            >
              Create note
            </button>
          </div>
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={toggleShowNewCategory}
            >
              Create Category
            </button>
          </div>
        </div>
        {showNewNotes && <NewNotes onCloseNewNotes={handleCloseNewNotes} />}
        {showNewCategory && (
          <NewCategory onCloseNewNotes={handleCloseNewNotes} setEditMode={setEditMode}/>
        )}
        <div className="flex sm:flex-col ">
          <TableActivo
            updateNotes={updateNotes}
            showNotes={setShowNewNotes}
            setEditMode={setEditMode}
            setShowNewCategory={setShowNewCategory}
            editMode={editMode}
          />
        </div>
      </div>

      <ModalConsumer />
    </React.Fragment>
  );
};

export default View;
