import React from "react";

const HomePage2 = () => {
    const Notebook = require('../assets/Notebook.svg')
    return (
        <div className="container">
            <div className="cube pers650 center-flex">
                <div className="right"></div>
                <div className="left posBookshelfY"><img className="notebook" src={Notebook}/></div>
                <div className="left posBookshelfX"><img src={Notebook} style={{"height": '50px', "width": '100px'}}/></div>
                <div className="face bottom"></div>
            </div>
            {/* <div id="floor"></div> */}
        </div>
    )
};

export default HomePage2;
