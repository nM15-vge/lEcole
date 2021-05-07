import myFetch from "./fetch";

const SET_NOTES = "notes/SET_NOTES";
const GET_NOTE = "notes/GET_NOTE";
const REMOVE_NOTE = "notes/REMOVE_NOTE";

export const setNotes = (notes) => ({
    type: SET_NOTES,
    notes
});

export const getNote = (note) => ({
    type: GET_NOTE,
    note
});

export const removeNote = (note) => ({
    type: REMOVE_NOTE,
    note
});

export const note = (noteId) => async dispatch => {
    const res = await myFetch(`/api/notes/${noteId}`);
    const data = await res.json();
    if(!res.ok){
        return;
    };
    dispatch(getNote(data));
};

export const notes = (notebookId) => async dispatch => {
    const res = await myFetch(`/api/notebooks/${notebookId}/notes`);
    const data = await res.json();
    if(!res.ok){
        return;
    };
    dispatch(setNotes(data));
};

export const postNote = (name, content, notebookId, publish, notesUrl) => async dispatch => {
    const res = await myFetch(`/api/notes/`, {
        method: "POST",
        body: JSON.stringify({name, content, notebookId, private: publish, notesUrl})
    });
    const data = await res.json();
    if(!res.ok){
        return;
    };
    dispatch(getNote(data));
};

export const deleteNote = (noteId) => async dispatch => {
    const res = await myFetch(`/api/notes/${noteId}`, {
        method: "DELETE"
    });
    const data = await res.json();
    if(!res.ok){
        return;
    };
    dispatch(removeNote(data));
};

export const updateNote = (noteId, name, content, publish) => async dispatch => {
    const res = await myFetch(`/api/notes/${noteId}`, {
        method: "PUT",
        body: JSON.stringify({name, content, private: publish})
    });
    const data = await res.json();
    if(!res.ok){
        return;
    };
    dispatch(getNote(data));
};

const initialState = {notes: null};

const noteReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_NOTES:
            return {...state, notes: action.notes};
        case GET_NOTE:
            const updatedNotes = {...state.notes};
            for (const key in action.note){
                updatedNotes[key] = action.note[key];
            };
            return {...state, notes: updatedNotes};
        case REMOVE_NOTE:
            const editNotes = {...state.notes};
            for (const key in action.note){
                delete editNotes[key];
            };
            return {...state, notes: editNotes};
        default:
            return state;
    };
};

export default noteReducer;
