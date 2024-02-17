import React, { useState, useEffect } from "react";
import TableActivo from "./TableActivo";
import NewNotes from "./NewNotes";
import { ModalConsumer } from "./Modals";


 const  View = () => {
  const [showNewNotes, setShowNewNotes] = useState(false);
  const [updateNotes, setUpdateNotes] = useState(false);
  const [editMode, setEditMode] = useState(false);


  const toggleMostrarNewNotes = () => {
    setEditMode(false);
    setShowNewNotes(!showNewNotes);
  };
  const handleCloseNewNotes = () => {
    setShowNewNotes(false);
    setUpdateNotes(prev => !prev); 
  };

  return (
   <>
      <h1 className="text-4xl font-bold mb-4 text-center">Notes</h1>
      <div className="relative content-center">
        <div className="flex justify-around mb-2">
          <div>
          <button className="bg-blue-500 text-white px-4 py-2" onClick={toggleMostrarNewNotes}>
          Create note
          </button>
          </div>
          <div>
          <button className="bg-blue-500 text-white px-4 py-2" onClick={toggleMostrarNewNotes}>
          Create category
          </button>
          </div>
        </div>
        {showNewNotes && <NewNotes onCloseNewNotes={handleCloseNewNotes}  />}
        <div className="flex sm:flex-col ">
        
        <TableActivo updateNotes={updateNotes} showNotes={setShowNewNotes}  setEditMode = {setEditMode} editMode ={editMode} />
        </div>
      </div>
  
    <ModalConsumer />
    </>

  );
}

export default View;
