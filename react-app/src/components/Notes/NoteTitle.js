import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { commonNotes, note, updateNote } from "../../store/note";

const NoteTitle = ({displayed, notes, setDisplayed, noteId}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(() => {
        if(notes) return notes[noteId]?.name
        // if(commNotes) return commNotes[noteId]?.name
        return ""
    });

    const onSubmit = e => {
        if(e.keyCode === 13){
            if(!name.length){
                setDisplayed(false);
                return;
            }else {
              console.log(name)
              let x;
              if(name.length){
                  x=name;
              }else{
                  x=notes[noteId].name;
              }

              const y = notes[noteId].content
              dispatch(updateNote(noteId, x, y));
              setDisplayed(false);
            };
        };
    };
    return(
        <>
            {!displayed && notes && (<div id="d">{notes[noteId]?.name}</div>)}
            {/* {!displayed && commNotes && (<div id="e">{commNotes[noteId]?.name}</div>)} */}
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
