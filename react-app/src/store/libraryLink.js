import myFetch from "./fetch";

const SET_LINKS = "libraryLinks/SET_LINKS";
const GET_LINK = "libraryLinks/GET_LINK";
const REMOVE_LINK = "libraryLinks/REMOVE_LINK";

const setLinks = (libraryLinks) => ({
    type: SET_LINKS,
    libraryLinks
});

const getLink = (libraryLink) => ({
    type: GET_LINK,
    libraryLink
});

const removeLink = (libraryLink) => ({
    type: REMOVE_LINK,
    libraryLink
});

export const libraryLinks = () => async dispatch => {
    const res = await myFetch(`/api/libraryLinks/`);
    const data = await res.json();
    if(!res.ok){
        return;
    };
    dispatch(setLinks(data));
};

export const postLibraryLink= (title, libraryLinkUrl) => async dispatch => {
    const res = await myFetch(`/api/libraryLinks/`, {
        method: "POST",
        body: JSON.stringify({title, library_link_url: libraryLinkUrl})
    });
    const data = await res.json();
    if(!res.ok){
        return;
    };
    dispatch(getLink(data));
};


export const deleteLibraryLink = (libraryLinkId) => async dispatch => {
    const res = await myFetch(`/api/libraryLinks/${libraryLinkId}`, {
        method: "DELETE"
    });
    const data = await res.json();
    if(!res.ok){
        return;
    };
    dispatch(removeLink(data))
};

export const updateLibraryLink = (libraryLinkId, title, libraryLinkUrl) => async dispatch => {
    const res = await myFetch(`/api/libraryLinks/${libraryLinkId}`, {
        method: "PUT",
        body: JSON.stringify({title, library_link_url: libraryLinkUrl})
    });
    const data = await res.json();
    if(!res.ok){
        return;
    };
    dispatch(getLink(data))
};

const initialState = {libraryLinks: null}

const libraryLinkReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_LINKS:
            return {...state, libraryLinks: action.libraryLinks}
        case GET_LINK:
            const updateLibraryLinks = {...state.libraryLinks};
            for(const key in action.libraryLink){
                updateLibraryLinks[key] = action.libraryLink[key];
            };
            return {...state, libraryLinks: updateLibraryLinks}
        case REMOVE_LINK:
            const editLibraryLinks = {...state.libraryLinks};
            for(const key in action.libraryLink){
                delete editLibraryLinks[key];
            };
            return {...state, libraryLinks: editLibraryLinks}
        default:
            return state;

    };
};

export default libraryLinkReducer;
