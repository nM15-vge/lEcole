import React from "react";

const HomePage2 = () => {
    const Notebook = require('../assets/Notebook.svg')
    return (
        <div className="container">
            <div className="cube pers650 center-flex">
                <div className="right"></div>
                <div className="left posBookshelfY"><img className="notebook" src={Notebook}/></div>
                <div className="left posBookshelfX"></div>
                <div className="face bottom"></div>
            </div>
            {/* <div id="floor"></div> */}
        </div>
    )
};

export default HomePage2;
