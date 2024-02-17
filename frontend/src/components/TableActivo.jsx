import React, { useState, useEffect } from "react";
import axios from 'axios';
import EditNote from './EditNote';
import NoteTable from './NoteTable';
import {  useModal } from "./Modals";
import ModalConfirmation from "./ModalConfirmation";
import { useAlert } from "./AlertContext";

function TableActivo({ updateNotes, showNotes,  setEditMode , editMode }) {
    const [listNotes, setListNotes] = useState([]);
    const { showAlert } = useAlert();
    const [selectedNote, setSelectedNote] = useState(null);
    let idNoteSelected = 0;
    const { setModalOpen } = useModal();
    const messageArchive = "Archived note.";
    const messageActive = "Note activated.";
    const getNotes = () => {
      axios.get("http://localhost:3001/Notes")
        .then((response) => {
          setListNotes(response.data);
        })
        .catch((error) => {
        });
    }
  
   useEffect(() => {
      getNotes();
   }, [updateNotes]);

    const deleteNote = async() => {
    await  axios.delete(`http://localhost:3001/deleteNote/${idNoteSelected}`)
        .then((response) => {
       getNotes();
          onClose();
          showAlert("The note has been deleted.", "error");
        })
        .catch((error) => {
          showAlert("Oops, an error occurred.", "error");
        });
    }
  
    const handleEditClick = (note) => {
      setEditMode(true);
      setSelectedNote(note);
      showNotes(false);
   
    }
  
    const closeEditNote = () => {
      setEditMode(false);
      setSelectedNote(null);
    }
  
    const filterNotesByState = (state) => {
      return listNotes.filter(note => note.id_state === state);
    }
    const onClose = () => {
      setModalOpen(false, "");
    };
  
  const handleDelete = (id) => {
   idNoteSelected = id;
      setModalOpen(
         true,
       <ModalConfirmation onClose = {onClose} handleAccept={deleteNote} title={"Delete"} message={"Are you sure you want to delete this note?"} typeOfOption={"Delete"} /> ,
     500
      );
  };
    return (
        <div>
              {editMode && (
          <EditNote
            note={selectedNote}
            id={selectedNote.id} 
            onCloseUpdate={closeEditNote}
            updateChange={getNotes}
            
          />
        )}
      <div className="flex h-full  justify-between flex-col xl:flex-row">
        
        <div className="mx-auto w-full max-w-2xl rounded-sm border border-gray-200 bg-white shadow-lg">
          <header className="border-b border-gray-100 px-5 py-4">
            <div className="font-semibold text-gray-800">Active Notes</div>
          </header>
  
          <div className="overflow-x-auto p-3">
          <NoteTable
  notes={filterNotesByState(1)}
  onDelete={handleDelete}
  onEditClick={handleEditClick}
  onNumberChange={getNotes}
  messageNote={messageArchive}
/>

          </div>
        </div>
        <div className="mx-auto w-full max-w-2xl rounded-sm border border-gray-200 bg-white shadow-lg">
          <header className="border-b border-gray-100 px-5 py-4">
            <div className="font-semibold text-gray-800">Archived notes</div>
          </header>
  
          <div className="overflow-x-auto p-5">
            <NoteTable
              notes={filterNotesByState(2)}
              onDelete={handleDelete}
              onEditClick={handleEditClick}
              onNumberChange={getNotes}
              messageNote={messageActive}
            />
          </div>
        </div>
       
      </div>
      </div>
    
    );
  }
  
  export default TableActivo;