import React from "react";
import { faEnvelopeCircleCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const  ModalConfirmation = ({onClose, handleAccept,  title, message, typeOfOption}) => {

return(
   <React.Fragment>
        <h1 className='font-bold text-center text-lg my-5'>{title}</h1>
          <p className='bg-[#d9ffea] p-2 border-l-2 border-[#3ffa9c] text-[#46bc2e] flex flex-col text-lg my-1'>
            <span className='text-[#2f7705] font-bold flex items-center gap-1'>
            <FontAwesomeIcon icon={faEnvelopeCircleCheck} size="lg" />
             {typeOfOption}
            </span>
           {message}
          </p>
        <div className='flex justify-evenly mt-5'>
          <button className='outline outline-1 outline-[#d4473d] bg-[#e45454] text-white py-2 px-4 hover:bg-transparent hover:text-black'
         onClick={onClose} 
          >Cancel</button>
          <button className='outline outline-1 outline-[#2c881a] bg-[#42df7e] text-white py-2 px-4 hover:bg-transparent hover:text-black'
          onClick={handleAccept}
          >Accept</button>
            </div>
          </React.Fragment>
          );
}
export default ModalConfirmation;
