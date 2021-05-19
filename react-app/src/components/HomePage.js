import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotebook, notebooks } from "../store/notebook";
import NotebookForm from "./NotebookForm";
import Modal from "../context/Modal";
import { commonNotes, deleteNote, postNote } from "../store/note";
import { logout } from "../store/session";


const HomePage = () => {
    const Notebook = require('../assets/Notebook.svg');
    const Note = require('../assets/Paper.svg')

    const staticNotebooks = new Array(21).fill("staticNotebook")
    const dispatch = useDispatch();
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = e => {
        e.preventDefault();
        if(showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if(!showMenu) return;
        const closeMenu = e => {
          e.preventDefault();
          setShowMenu(false);
        };
        document.addEventListener("click", closeMenu);
        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);


    const userNotebooks = useSelector(state => state.notebooks.notebooks);
    const notebooKIdNotes = useSelector(state => state.notes.commonNotes);
    const user = useSelector(state => state.session.user);

    const onClick = e => {
        e.preventDefault();
        setShowModal(true);
    };

    const onLogout = e => {
        dispatch(logout())
    };

    const onDeleteNote = e => {
        console.log("I was here.....")
        dispatch(deleteNote(e.target.parentNode.id))
    };

    const createNote =  async () => {
        const newNote = await dispatch(postNote("Untitled Note"));
        for (const key in newNote){
            history.push(`/notes/${key}`)
        };
    };

    useEffect(() => {
        dispatch(notebooks())
        dispatch(commonNotes())
    }, [dispatch]);


    let top = 9;
    let left = -14;
    let left2 = -14;
    const currTop = () => {
        return top + 66;
    };
    const updateLeft = () => {
        if(left === 70){
            left = -14;
        };
        left +=4
    };

    const noteLeft = () => {
        left2 +=8
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
                    <div>
                        <div className="avatar" onClick={openMenu}>
                            <img id="avatar" alt="avatar" src={user?.avatarUrl}/>
                        </div>
                        {showMenu && <div className="logout center-flex" onClick={onLogout}>Logout</div> }
                    </div>
                </div>
                <div className="bookshelf posY">
                    {staticNotebooks.map((val, idx) => {
                        updateLeft();
                        return <img  key={val+idx} alt={val +`${idx}`} style={{"top": `${currTop()}%`, "left": `${left}%`}} className="notebook"  src={Notebook}></img>
                    })}
                    {userNotebooks && Object.keys(userNotebooks).map(id => {
                        updateLeft();
                        return (
                        <Link key={id} to={`/notebooks/${id}`} id={id} className="notebook" title={userNotebooks[id].name} style={{"top": `${top}%`, "left": `${left}%`}}>
                            <span className="textTransform">{userNotebooks[id].name}</span>
                            <div className="delete"></div>
                        </Link>
                        )
                    })}
                </div>
                <div className="bookshelf posX">
                    {notebooKIdNotes && Object.keys(notebooKIdNotes).map(id => {
                        noteLeft();
                        return (
                            <Link key={`${id}xyz`} to={`/notes/${id}`} id={id} className="paperNote" alt={`${id}staticNB`} title={notebooKIdNotes[id].name} style={{"top": `${top}%`, "left": `${left2}%`}}>
                                <span>{notebooKIdNotes[id].name}</span>
                                {/* <div onClick={onDeleteNote} className="delete"></div> */}
                            </Link>
                        )
                    })}
                    </div>
                <div className="carpet"></div>
                <div className="chair"></div>
            </div>
        </div>
    )
};

export default HomePage;
