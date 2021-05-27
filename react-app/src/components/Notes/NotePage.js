import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { note, updateNote } from "../../store/note";
import NavBar from "../NavBar";
import NoteTitle from "./NoteTitle";

const NotePage = () => {
    const {noteId, notebookId} = useParams();
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.notes);
    // const commNotes = useSelector(state => state.notes.commonNotes)
    const [content, setContent] = useState("")
    const [displayed, setDisplayed] = useState(false)
    const [contentDisplay, setContentDisplay] = useState(false);

    const clickName = () => {
        setDisplayed(true)
    };

    const clickContent = () => {
        setContentDisplay(true)
    };

    const onSubmit2 = e => {
        if(e.keyCode === 13){
            if(!content.length){
                setContentDisplay(false);
                return;
            }else {
              const x = notes[noteId].name;
              const y = content.length? content: notes[noteId].content
              dispatch(updateNote(noteId, x, y));
              setContentDisplay(false);
            };
        };
    }

    useEffect(() => {
        dispatch(note(noteId));
    }, [dispatch]);

    return (
        <div id="notePage">
            <div className="blankPage">
                <iframe style={{"width": "92.5%", "height":"97%"}}src="https://open.appacademy.io/">
                </iframe>
            </div>
            <div className="notes">
                <div onClick={clickName} className="titleNotes center-flex">
                    <NavBar notebookId={notebookId}/>
                    <NoteTitle displayed={displayed} notes={notes} setDisplayed={setDisplayed} noteId={noteId} />
                </div>
                <div onClick={clickContent} className="contentNotes">
                    {!contentDisplay && notes && (<div className="contentDiv">
                        {notes[noteId]?.content}
                    </div>)}
                    {contentDisplay && (<textarea
                        id="contentTextArea"
                        onKeyDown={onSubmit2}
                        type="text"
                        name="content"
                        onChange={e => setContent(e.target.value)}
                        value={content}
                    />)}
                </div>
            </div>
        </div>
    )
};

export default NotePage
