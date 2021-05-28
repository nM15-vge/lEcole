import React, { useEffect, useState } from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotebook, notebooks } from "../store/notebook";
import NotebookForm from "./NotebookForm";
import Modal from "../context/Modal";
import { commonNotes, deleteNote, postNote } from "../store/note";
import { logout } from "../store/session";
import NoteForm from "./Notes/NoteForm"
import LibraryLinkForm from "./LibraryLinks/LibraryLinkForm";
import { deleteLibraryLink, libraryLinks } from "../store/libraryLink";

const HomePage = () => {
    const Notebook = require('../assets/Notebook.svg');

    const staticNotebooks = new Array(21).fill("staticNotebook")
    const dispatch = useDispatch();
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);
    const [linkModal, setLinkModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [editModal, setEditModal] = useState(null);
    const [editNBModal, setEditNBModal] = useState(null);
    const [editLinkModal, setEditLinkModal] = useState(null);

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
    const links = useSelector(state => state.libraryLinks.libraryLinks)
    const user = useSelector(state => state.session.user);

    const onClick = e => {
        e.preventDefault();
        setShowModal(true);
    };

    const onLinkClick = e => {
        e.preventDefault();
        setLinkModal(true);
    };

    const onLogout = e => {
        dispatch(logout())
    };

    const onDeleteNote = (e, data) => {
        dispatch(deleteNote(data.id))
    };

    const onEditNote = (e, data) => {
        setEditModal(data.id);
    };

    const onDeleteNotebook = (e, data) => {
        dispatch(deleteNotebook(data.id));
    };

    const onEditNotebook = (e, data) => {
        setEditNBModal(data.id)
    };

    const onEditLink = (e, data) => {
        setEditLinkModal(data.id);
    };

    const onDeleteLink = (e, data) => {
        dispatch(deleteLibraryLink(data.id));
    };

    const createNote =  async () => {
        const newNote = await dispatch(postNote("Untitled Note"));
        for (const key in newNote){
            history.push(`/notes/${key}`)
        };
    };

    useEffect(() => {
        dispatch(notebooks());
        dispatch(commonNotes());
        dispatch(libraryLinks());
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
                    <div onClick={onLinkClick} id="newBookmark" className="center-flex">Create Link</div>
                    {linkModal && (
                        <Modal onClose={() => setLinkModal(false)}>
                            <LibraryLinkForm onClose={() => setLinkModal(false)}/>
                        </Modal>
                    )}
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
                        <ContextMenuTrigger key={`${id}notebook`} id={`${id}notebooks`}>
                            {editNBModal && <Modal onClose={() => setEditNBModal(null)}>
                                <NotebookForm onClose={() => setEditNBModal(null)} id={editNBModal}/>
                            </Modal>}
                            <Link  to={`/notebooks/${id}`} id={id} className="notebook" title={userNotebooks[id].name} style={{"top": `${top}%`, "left": `${left}%`}}>
                                <span className="textTransform">{userNotebooks[id].name}</span>
                            </Link>
                            <ContextMenu id={`${id}notebooks`} className="leftClick">
                                <MenuItem data={{id}} onClick={onDeleteNotebook} >
                                Delete
                                </MenuItem>
                                <MenuItem data={{id}} onClick={onEditNotebook} >
                                Edit
                                </MenuItem>
                            </ContextMenu>
                        </ContextMenuTrigger>
                        )
                    })}
                </div>
                <div className="bookshelf posX">
                    {notebooKIdNotes && Object.keys(notebooKIdNotes).map(id => {
                        noteLeft();
                        return (
                                <ContextMenuTrigger key={`${id}notes`} id={`${id}notes`}>
                                    {editModal && <Modal onClose={() => setEditModal(null)}>
                                        <NoteForm onClose={() => setEditModal(null)} id={editModal}/>
                                    </Modal>}
                                    <Link key={`${id}xyz`} to={`/notes/${id}`} id={id} className="paperNote" alt={`${id}staticNB`} title={notebooKIdNotes[id].name} style={{"top": `${top}%`, "left": `${left2}%`}}>
                                        <span>{notebooKIdNotes[id].name}</span>
                                    </Link>
                                    <ContextMenu id={`${id}notes`} className="rightClick">
                                        <MenuItem data={{id}} onClick={onDeleteNote}>
                                        Delete
                                        </MenuItem>
                                        <MenuItem data={{id}} onClick={onEditNote}>
                                        Edit
                                        </MenuItem>
                                    </ContextMenu>
                                </ContextMenuTrigger>
                        )
                    })}
                </div>
                <div id="bookmarkContainer">
                    {links && Object.keys(links).map(id =>
                        <ContextMenuTrigger key={`bookmark${id}`} id={`${id}bookmark`}>
                            {editLinkModal && <Modal onClose={() => setEditLinkModal(null)}>
                                <LibraryLinkForm libraryLinkId={editLinkModal} onClose={() => setEditLinkModal(null)} link={links[editLinkModal]}/>
                            </Modal>}
                            <div className="starBookmark center-flex">
                                {links[id].title}
                            </div>
                            <ContextMenu id={`${id}bookmark`} className="clickLink">
                                <MenuItem data={{id}} onClick={onDeleteLink}>
                                    Delete
                                </MenuItem>
                                <MenuItem data={{id}} onClick={onEditLink}>
                                    Edit
                                </MenuItem>
                            </ContextMenu>
                        </ContextMenuTrigger>
                    )}
                </div>
                <div className="carpet"></div>
            </div>
        </div>
    )
};

export default HomePage;
