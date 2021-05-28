import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postLibraryLink, updateLibraryLink } from "../../store/libraryLink";

const LibraryLinkForm = ({libraryLinkId, onClose, link}) => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState(link ? link.title: "");
    const [libraryLinkUrl, setLibraryLinkUrl] = useState(link? link.library_link_url:"")
    const [errors, setErrors] = useState([]);

    const onSubmit = e => {
        e.preventDefault();
        if(title.length === 0){
            setErrors(["A library link should have a title."])
        }else if(libraryLinkId){
            dispatch(updateLibraryLink(libraryLinkId, title, libraryLinkUrl))
            onClose();
        }else if(errors.length === 0){
            dispatch(postLibraryLink(title, libraryLinkUrl));
            onClose();
        }
    };
    return (
        <form onSubmit={onSubmit}>
            <ul>
                {errors && errors.map(error => (<li key={error}>{error}</li>))}
            </ul>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                />
            </div>
            <div>
                <label>Url</label>
                <input
                    type="text"
                    name="url"
                    onChange={e => setLibraryLinkUrl(e.target.value)}
                    value={libraryLinkUrl}
                />
            </div>
            <button type="submit">{libraryLinkId? "Update Link":"Create Link"}</button>
            <button onClick={onClose}>Cancel</button>
        </form>
    )
};

export default LibraryLinkForm;
