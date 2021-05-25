import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { note, updateNote } from "../../store/note";

const NoteTitle = ({displayed, notes, setDisplayed, noteId}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(notes? notes[noteId].name: "");

    const onSubmit = e => {
        if(e.keyCode === 13){
            if(!name.length){
                setDisplayed(false);
                return;
            }else {
              const x = name.length? name: notes[noteId].name
              const y = notes[noteId].content
              dispatch(updateNote(noteId, x, y));
              setDisplayed(false);
            };
        };
    };
    return(
        <>
            {!displayed && notes && (<div>{notes[noteId]?.name}</div>)}
            {displayed &&
            (<input
                id="nameInput"
                onKeyDown={onSubmit}
                type="text"
                name="name"
                onChange={e => setName(e.target.value)}
                value={name}
            />)}
        </>
    )
};
export default NoteTitle;
