import React from "react";
import ModalTesting from "./ModalTesting";

const HomePage = () => {
    return (
        <div className="homepage">
            <div className="sidebar">
                <ModalTesting />
            </div>
            <div className="main">
                <div className="header">Hello</div>
                <div className="notes">Bye</div>
            </div>
        </div>
    )
};

export default HomePage;
