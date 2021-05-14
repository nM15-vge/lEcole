import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotebook, notebooks } from "../store/notebook";

const HomePage = () => {
    const Notebook = require('../assets/Notebook.svg');
    const staticNotebooks = new Array(21).fill("staticNotebook")
    const dispatch = useDispatch();
    const userNotebooks = useSelector(state => state.notebooks.notebooks);

    useEffect(() => {
        dispatch(notebooks())
    }, [dispatch]);

    const onClick = e => {
        dispatch(deleteNotebook(e.target.id));
    };

    let top = 9;
    let left = -14;
    const currTop = () => {
        return top + 66;
    };
    const updateLeft = () => {
        left +=4
    };
    return (
        <div className="container">
            <div className="floorPlan center-flex">
                <div className="coffeeTable"></div>
                <div className="bookshelf posY">
                    {staticNotebooks.map((val, idx) => {
                        updateLeft();
                        return <img  key={val+idx} alt={val +`${idx}`} style={{"top": `${currTop()}%`, "left": `${left}%`}} className="notebook"  src={Notebook}></img>
                    })}
                    {userNotebooks && Object.keys(userNotebooks).map(id => {
                        left = -14;
                        updateLeft();
                        return <img id={id} className="notebook" key={id} onClick={onClick} title={userNotebooks[id].name} src={Notebook} style={{"top": `${top}$`, "left": `${left}%`}}/>
                    })}
                </div>
                <div className="bookshelf posX"><img className="notebook" src={Notebook}/></div>
                <div className="carpet"></div>
            </div>
        </div>
    )
};

export default HomePage;
