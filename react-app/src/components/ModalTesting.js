import React, { useState } from "react";
import { Link } from "react-router-dom";
import NotebookForm from "./NotebookForm";
import Modal from "../context/Modal";

const ModalTesting = () => {
    const [showModal, setShowModal] = useState(false);
    const onClick = e => {
        e.preventDefault();
        setShowModal(true);
    };
    return (
        <div>
            <Link onClick={onClick} to="/new-project">Modal Testing</Link>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <NotebookForm />
                </Modal>
            )}

        </div>
    );
};

export default ModalTesting;
