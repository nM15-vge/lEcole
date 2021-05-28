import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { libraryLinks } from "../../store/libraryLink";

const LibraryLinkPage = ({linkId}) => {
    const dispatch = useDispatch();
    const links = useSelector(state => state.libraryLinks.libraryLinks)

    useEffect(() => {
        dispatch(libraryLinks());
        console.log(links[linkId])
    }, [dispatch])
    return (
        <>
            {linkId && links && <iframe style={{"width": "92.5%", "height":"97%"}} src={links[linkId].library_link_url}></iframe>}
        </>
    )
};

export default LibraryLinkPage;
