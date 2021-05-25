import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateNote } from "../../store/note";

const NoteForm = ({onClose, id}) => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [publish, setPublish] = useState(true);
    const [errors, setErrors] = useState([])
    const onSubmit = e => {
        e.preventDefault();
        if(name.length === 0){
            setErrors(["A note should have a name."])
        }else if(errors.length === 0){
            const content = null;
            dispatch(updateNote(id, name, content, publish));
            onClose();
        }
    };
    return(
        <form onSubmit={onSubmit}>
            <ul>
                {errors && errors.map(error => (<li key={error}>{error}</li>))}
            </ul>
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
                <label>Public</label>
            </div>
            <button type="submit">Update Note</button>
            <button onClick={onClose}>Cancel</button>
        </form>
    )
};

export default NoteForm;
