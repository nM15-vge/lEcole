import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotebook, notebooks } from "../store/notebook";


const Sidebar = () => {
    const dispatch = useDispatch();
    const userNotebooks = useSelector(state => state.notebooks.notebooks);
    useEffect(() => {
        dispatch(notebooks())
    }, [dispatch]);
    const onClick = (e) => {
        dispatch(deleteNotebook(e.target.id))
    }
    return(
        <div>
            {userNotebooks && Object.keys(userNotebooks).map( id => (
                <div id={id} onClick={onClick} key={id}>{userNotebooks[id].name}</div>
            ))}
        </div>
    )
}

export default Sidebar;
