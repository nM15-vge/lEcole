import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postNote } from "../../store/note";

const NoteForm = ({onClose}) => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [publish, setPublish] = useState(true);
    const [notesUrl, setNotesUrl] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        if(name.length === 0){
            setErrors(["A note should have a name."])
        }else if(errors.length === 0){
            dispatch(postNote(name, content, notebookId, publish, notesUrl));
            onClose;
        }
    };
    return(
        <form onSubmit={onSubmit}>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    onChange={e => setName(e.target.value)}
                    value={name}
                />
            </div>
            <p className="form-text">Status:</p>
            <div>
                <input className="radio"
                    type="radio"
                    name="private"
                    value="true"
                    onChange={() => setPublish(true)}
                    checked={publish === true? true: false}
                />
                <label>Private</label>
            </div>
            <div>
                <input className="radio"
                    type="radio"
                    name="private"
                    value="false"
                    onChange={() => setPublish(false)}
                    checked={publish === false? true: false}
                />
            </div>
            <button type="submit">Create Note</button>
        </form>
    )
};
