import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { note, updateNote } from "../../store/note";
import NavBar from "../NavBar";

const NotePage = () => {
    const {noteId} = useParams();
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.notes);
    const [name, setName] = useState("")
    const [content, setContent] = useState("")
    const [displayed, setDisplayed] = useState(false)
    const [contentDisplay, setContentDisplay] = useState(false);

    const clickName = () => {
        setDisplayed(true)
    };

    const clickContent = () => {
        setContentDisplay(true)
    };

    const onSubmit = e => {
        if(e.keyCode === 13){
            if(!name.length || !content.length){
                setDisplayed(false);
                setContentDisplay(false);
                return;
            }else {
              dispatch(updateNote(noteId, name? name: notes[noteId].name , content? content: notes[noteId].content))
              setDisplayed(false);
              setContentDisplay(false);
            };
        };
    };

    useEffect(() => {
        dispatch(note(noteId));
    }, [dispatch]);

    return (
        <div id="notePage">
            <div className="blankPage"></div>
            <div className="notes">
                <div onClick={clickName} className="titleNotes center-flex">
                    <NavBar />
                    {!displayed && notes && (<div>{notes[noteId].name}</div>)}
                    {displayed && (<input
                       id="nameInput"
                       onKeyDown={onSubmit}
                       type="text"
                       name="name"
                       onChange={e => setName(e.target.value)}
                       value={name}
                    />)}
                </div>
                <div onClick={clickContent} className="contentNotes">
                    {!contentDisplay && notes && (<div className="contentDiv">
                        {notes[noteId].content}
                    </div>)}
                    {contentDisplay && (<input
                        id="contentInput"
                        onKeyDown={onSubmit}
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
