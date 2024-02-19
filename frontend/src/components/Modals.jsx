import React, { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";

const initialState = {
  isModalOpen: false,
  modalContent: null,
  modalWidth: 400,
};

export const ModalContext = createContext(initialState);

export const ModalConsumer = () => {
  return (
    <ModalContext.Consumer>
      {({ isModalOpen, modalContent, setModalOpen, modalWidth }) => (
        <div
          className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center ${
            isModalOpen ? "" : "hidden"
          }`}
        >
          <div
            className="bg-white rounded-lg p-4"
            style={{ width: modalWidth }}
          >
            {modalContent}
          </div>
        </div>
      )}
    </ModalContext.Consumer>
  );
};

export const ModalProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const setModalOpen = (isModalOpen, modalContent, modalWidth = 400) => {
    setState({ isModalOpen, modalContent, modalWidth });
  };

  return (
    <ModalContext.Provider value={{ ...state, setModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node,
  modalWidth: PropTypes.number,
};

ModalProvider.defaultProps = {
  children: null,
  modalWidth: 400,
};

export const useModal = () => useContext(ModalContext);
