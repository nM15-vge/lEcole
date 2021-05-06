import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postNotebook } from "../store/notebook";

const NotebookForm = ({onClose}) => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [privatePublic, setPrivatePublic] = useState(true);
    const [errors, setErrors] = useState([]);

    const onSubmit = e => {
        e.preventDefault();
        if(name.length === 0){
            setErrors(["A notebook should have a name."])
        }else if(errors.length === 0){
            dispatch(postNotebook(name, privatePublic));
            onClose()
        };
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
                    onChange={() => setPrivatePublic(true)}
                    checked={privatePublic === true? true: false}
                />
                <label>Private</label>
            </div>
            <div>
                <input className="radio"
                    type="radio"
                    name="private"
                    value="false"
                    onChange={() => setPrivatePublic(false)}
                    checked={privatePublic === false? true: false}
                />
                <label>Publish</label>
            </div>
            <button type="submit">Create Notebook</button>
        </form>
    )
};

export default NotebookForm;
