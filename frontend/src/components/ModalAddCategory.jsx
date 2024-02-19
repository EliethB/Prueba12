import { SelectComponent } from "./SelectComponent";
import { useEffect, useState } from "react";
import ModalConfirmation from "./ModalConfirmation";
import { useModal } from "./Modals";
import { useAlert } from "./AlertContext";
import { noteApi } from "../api/noteApi";
import { ButtonComponent } from "./ButtonComponent";

export const ModalAddCategory = ({ onClose, noteID, updateChange }) => {
  const [listCategories, setListCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const { setModalOpen } = useModal();
  const { showAlert } = useAlert();

  const onAcept = async () => {
    onClose();
    try {
      await noteApi.put(`/addCategoryANote/${noteID}`, {
        id_category: selectedCategory,
      });
      showAlert("Your category has been added successfully.", "success");
      updateChange();
    } catch (error) {
      showAlert("Oops, an error occurred.", "error");
    }
  };
  const handleAccept = () => {
    setModalOpen(
      true,
      <ModalConfirmation
        onClose={onClose}
        handleAccept={onAcept}
        title={"Create"}
        message={"Are you sure you want add this category a note?"}
        typeOfOption={"Create"}
      />,
      500
    );
  };
  const getCategories = async () => {
    try {
      const { data } = await noteApi.get("/getCategories");
      setListCategories(data);
      setSelectedCategory(data[0].id);
    } catch (error) {}
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <SelectComponent
        optionsSelect={listCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="flex justify-evenly mt-5">
        <ButtonComponent
          text={"Cancel"}
          onFuction={onClose}
          colorOutline={"#d4473d"}
          bgColor={"blue-500"}
        />
        <ButtonComponent
          text={"Accept"}
          onFuction={handleAccept}
          colorOutline={"#2c881a"}
          bgColor={"red-500"}
        />
      </div>
    </div>
  );
};
