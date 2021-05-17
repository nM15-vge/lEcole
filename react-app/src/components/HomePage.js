import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotebook, notebooks } from "../store/notebook";
import NotebookForm from "./NotebookForm";
import Modal from "../context/Modal";
import { postNote } from "../store/note";

const HomePage = () => {
    const Notebook = require('../assets/Notebook.svg');

    const staticNotebooks = new Array(21).fill("staticNotebook")
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const userNotebooks = useSelector(state => state.notebooks.notebooks);

    const onClick = e => {
        e.preventDefault();
        setShowModal(true);
    };

    const createNote =  async () => {
        const newNote = await dispatch(postNote("Untitled Note"));
        for (const key in newNote){
            console.log(key)
            history.push(`/notes/${key}`)
        };
    };

    useEffect(() => {
        dispatch(notebooks())
    }, [dispatch]);


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
                <div className="coffeeTable">
                    <div onClick={onClick} id="newNotebook" className="center-flex">Create Notebook</div>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <NotebookForm onClose={() => setShowModal(false)}/>
                        </Modal>
                    )}
                    <div onClick={createNote} id="newNote" className="center-flex">Create Note</div>
                </div>
                <div className="bookshelf posY">
                    {staticNotebooks.map((val, idx) => {
                        updateLeft();
                        return <img  key={val+idx} alt={val +`${idx}`} style={{"top": `${currTop()}%`, "left": `${left}%`}} className="notebook"  src={Notebook}></img>
                    })}
                    {userNotebooks && Object.keys(userNotebooks).map(id => {
                        left = -14;
                        updateLeft();
                        return (
                        <Link key={id} to={`/notebooks/${id}`}>
                            <img id={id} className="notebook" title={userNotebooks[id].name} src={Notebook} style={{"top": `${top}%`, "left": `${left}%`}}/>
                        </Link>
                        )
                    })}
                </div>
                <div className="bookshelf posX"><img className="notebook" src={Notebook}/></div>
                <div className="carpet"></div>
            </div>
        </div>
    )
};

export default HomePage;
