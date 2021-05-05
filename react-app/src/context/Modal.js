import React, { createContext, useRef, useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";

const ModalContext = createContext();

export const ModalProvider = ({children}) => {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, []);

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
};

const Modal = ({onClose, children, styleSheet}) => {
    const modalNode = useContext(ModalContext);
    if(!modalNode) return null;

    return ReactDOM.createPortal (
        <div className="modal">
            <div className="modal-background" onClick={onClose} />
            <div className="modal-content">
                {children}
            </div>
        </div>,
        modalNode
    );
};

export default Modal;
