import myFetch from "./fetch";

const SET_NOTES = "notes/SET_NOTES";
const GET_NOTE = "notes/GET_NOTE";
const REMOVE_NOTE = "notes/REMOVE_NOTE";
const ALL_NOTES = "notes/ALL_NOTES";
const COMMON_NOTE = "notes/COMMON_NOTE";

const setNotes = (notes) => ({
    type: SET_NOTES,
    notes
});

const getNote = (note) => ({
    type: GET_NOTE,
    note
});

const removeNote = (note) => ({
    type: REMOVE_NOTE,
    note
});

const allNotes = (notes) => ({
    type: ALL_NOTES,
    notes
});

const comNote = (note) => ({
    type: COMMON_NOTE,
    note
})

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
    return data;
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
    // const {[noteId]: {notebookId}} = data;
    // for(const key in data){
    //     noteId = key
    // };
    if(!res.ok) return;
    dispatch(getNote(data));
};

export const commonNotes = () => async dispatch => {
    const res = await myFetch(`/api/notes/`);
    const data = await res.json();
    if(!res.ok){
        return;
    };
    dispatch(allNotes(data));
};

const initialState = {notes: null, commonNotes: null};

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
            const editCommonNotes = {...state.commonNotes}
            for (const key in action.note){
                delete editNotes[key];
                delete editCommonNotes[key];
            };
            return {...state, notes: editNotes, commonNotes: editCommonNotes};
        case ALL_NOTES:
            return {...state, commonNotes: action.notes}
        case COMMON_NOTE:
            const updateComNotes = {...state.commonNotes}
            for (const key in action.note){
                updateComNotes[key] = action.note[key]
            };
            return {...state, commonNotes: updateComNotes}
        default:
            return state;
    };
};

export default noteReducer;
