import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { libraryLinks } from "../../store/libraryLink";

const LibraryLinkSelect = ({linkId, onChange}) => {
    const dispatch = useDispatch();
    const links = useSelector(state =>  state.libraryLinks.libraryLinks)

    useEffect(() => {
        dispatch(libraryLinks())
    }, [dispatch])

    return (
        <div className="librarySelect">
            <label> Choose resource: </label>
            <select value={linkId} onChange={onChange}>
                <option value={0}>--Please select an option-- </option>
                {links && Object.keys(links).map(id =>
                (<option key={links[id].title} value={Number(id)}>{links[id].title}</option>))}
            </select>
        </div>

    )
};
export default LibraryLinkSelect;
