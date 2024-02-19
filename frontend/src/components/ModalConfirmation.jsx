import React from "react";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonComponent } from "./ButtonComponent";

const ModalConfirmation = ({
  onClose,
  handleAccept,
  title,
  message,
  typeOfOption,
}) => {
  return (
    <React.Fragment>
      <h1 className="font-bold text-center text-lg my-5">{title}</h1>
      <p className="bg-[#d9ffea] p-2 border-l-2 border-[#3ffa9c] text-[#46bc2e] flex flex-col text-lg my-1">
        <span className="text-[#2f7705] font-bold flex items-center gap-1">
          <FontAwesomeIcon icon={faEnvelopeCircleCheck} size="lg" />
          {typeOfOption}
        </span>
        {message}
      </p>
      <div className="flex justify-evenly mt-5">
        <ButtonComponent
          text={"Cancel"}
          onFuction={onClose}
          colorOutline={"#d4473d"}
          bgColor={"#e45454"}
        />
        <ButtonComponent
          text={"Accept"}
          onFuction={handleAccept}
          colorOutline={"#2c881a"}
          bgColor={"#42df7e"}
        />
      </div>
    </React.Fragment>
  );
};
export default ModalConfirmation;
