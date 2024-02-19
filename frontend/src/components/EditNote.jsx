import { useState, useEffect } from "react";
import axios from "axios";
import ModalConfirmation from "./ModalConfirmation";
import { useModal } from "./Modals";
import { useAlert } from "./AlertContext";
import { noteApi } from "../api/noteApi";
import { ButtonComponent } from "./ButtonComponent";

function EditNote({ note, updateChange, onCloseUpdate }) {
  const { setModalOpen } = useModal();
  const { showAlert } = useAlert();
  const [formData, setFormData] = useState({
    id: 0,
    description: "",
    number: 0,
    id_state: 0,
  });

  useEffect(() => {
    if (note) {
      setFormData({
        id: note.id,
        description: note.description,
        number: note.number,
        id_state: note.id_state,
      });
    }
  }, [note]);

  const handleUpdateNote = async () => {
    try {
      await noteApi.put(`/updateNote/${formData.id}`, formData);
      updateChange();
      onCloseUpdate();
      onClose();
      showAlert("The note was edited successfully!", "success");
    } catch (error) {
      showAlert("Oops, an error occurred.", "error");
    }
  };
  const onClose = () => {
    setModalOpen(false, "");
  };

  const handleAdd = () => {
    setModalOpen(
      true,
      <ModalConfirmation
        onClose={onClose}
        handleAccept={handleUpdateNote}
        title={"Update"}
        message={"Are you sure you want to edit this note?"}
        typeOfOption={"Update"}
      />,
      500
    );
  };
  return (
    <div className="min-h-screenpy-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Edit note</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="peer resize-none placeholder-transparent h-32 w-full border border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 mb-4 p-2"
                  ></textarea>
                  <label className="absolute left-0 -top-4 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-4 peer-focus:text-gray-600 peer-focus:text-sm">
                    Description
                  </label>
                </div>
                <div className="relative flex justify-between">
                  <ButtonComponent
                    text={"Cancel"}
                    onFuction={onCloseUpdate}
                    colorOutline={"#d4473d"}
                    bgColor={"blue-500"}
                  />
                  <ButtonComponent
                    text={"Accept"}
                    onFuction={handleAdd}
                    colorOutline={"#2c881a"}
                    bgColor={"red-500"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditNote;
