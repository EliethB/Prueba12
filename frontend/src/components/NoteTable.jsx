import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useAlert } from './AlertContext';



function NoteTable({ notes, onDelete, onEditClick, onNumberChange, messageNote }) {
  const { showAlert } = useAlert();
  const noteNumbers = Array.from({ length: notes.length }, (_, i) => i + 1);
  const handleStateChange = (id, newState) => {
    axios.put(`http://localhost:3001/updateNoteState/${id}`, { id_state: newState })
      .then(response => {
        onNumberChange();
        showAlert(messageNote, "success");
      })
      .catch(error => {
        showAlert("Oops, an error occurred.", "error");
      });
     
  };
  const handleNumberChange = (id, currentNumber, newNumber) => {
    axios.put(`http://localhost:3001/updateNoteNumber/${id}`, { current_number: currentNumber, new_number: newNumber })
      .then(response => {
        onNumberChange();
        showAlert("Numbered note with success!", "success");
      })
      .catch(error => {
        showAlert("Oops, an error occurred.",messageNote, "error");
      });
   
  };
  
  const sortedNotes = notes.sort((a, b) => {
    if (a.number === null && b.number === null) return 0;
    if (a.number === null) return 1;
    if (b.number === null) return -1;
    return a.number - b.number;
});
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
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 text-sm">
      {sortedNotes.map((note) => (
          <tr key={note.id}>
            <td className="p-2">
            <div className="text-left">
              <select 
                  value={note.number !== null ? note.number : ''} 
                  onChange={(e) =>{ handleNumberChange(note.id, note.number, parseInt(e.target.value));
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
                <button onClick={() => onDelete(note.id)}>
                  <svg className="h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
                <button onClick={() => onEditClick(note)}>
                  <svg className="h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-blue-600" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="100" viewBox="0 0 24 24">
                    <path d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z"></path>
                  </svg>
                </button>
                  <button onClick={() => handleStateChange(note.id, note.id_state === 2 ? 1 : 2)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default NoteTable;