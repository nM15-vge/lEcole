import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { notes, postNote } from "../store/note";
import NavBar from "./NavBar";

const NotebookIndex = () => {
    const {notebookId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const notebookNotes = useSelector(state => state.notes.notes);

    const createNote =  async () => {
        const newNote = await dispatch(postNote("Untitled Note", null, notebookId));
        for (const key in newNote){
            history.push(`/notebooks/${notebookId}/notes/${key}`)
        };
    };
    useEffect(() => {
        dispatch(notes(notebookId))
    }, [dispatch]);

    return (
        <div id="notebookIndex">
            <div className="backcover">
                <NavBar notebookId={notebookId}/>
                <div onClick={createNote} className="newNote center-flex">Create Note</div>
            </div>
            <ol className="index">
                {notebookNotes && Object.keys(notebookNotes).map(id => (
                <li type="I" key={id}>
                    <Link to={`/notebooks/${notebookId}/notes/${id}`}>{notebookNotes[id].name}</Link>
                </li>
                ))}
            </ol>
        </div>)
}

export default NotebookIndex;
