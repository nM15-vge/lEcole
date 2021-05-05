import myFetch from "./fetch";

const SET_NOTEBOOKS = "notebooks/SET_NOTEBOOKS";
const GET_NOTEBOOK = "notebooks/GET_NOTEBOOK";
const REMOVE_NOTEBOOK = "notebooks/REMOVE_NOTEBOOK";

const setNotebooks = (notebooks) => ({
    type: SET_NOTEBOOKS,
    notebooks
});

const getNotebook = (notebook) => ({
    type: GET_NOTEBOOK,
    notebook
});

const removeNotebook = (notebook) => ({
    type: REMOVE_NOTEBOOK,
    notebook
});

export const notebook = (notebookId) => async dispatch => {
    const res = await myFetch(`/api/notebooks/${notebookId}`);
    const data = await res.json();
    if(!res.ok){
        return;
    }
    dispatch(getNotebook(data));
};

export const notebooks = () => async dispatch => {
    const res = await myFetch(`/api/notebooks/`)
    const data = await res.json();
    if(!res.ok){
        return;
    };
    dispatch(setNotebooks(data));
};

export const deleteNotebook = (notebookId) => async dispatch => {
    const res = await myFetch(`/api/notebooks/${notebookId}`);
    const data = await res.json();
    if(!res.ok){
        return;
    };
    dispatch(removeNotebook(data));
};

export const postNotebook = (name, private) => async dispatch => {
    const res = await myFetch(`/api/notebooks/`, {
        method: "POST",
        body: JSON.stringify({name, private})
    });
    const data = await res.json();
    if(!res.ok){
        return;
    };
    dispatch(getNotebook(data));
};

export const updateNotebook = (name, private, notebookId) => async dispatch => {
    const res = await myFetch(`/api/notebooks/${notebookId}`, {
        method: "PUT",
        body: JSON.stringify({name, private})
    });
    const data = res.json();
    if(!res.ok){
        return;
    };
    dispatch(getNotebook(data));
};

const initialState = {notebooks: null}

const notebookReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_NOTEBOOKS:
            return {...state, notebooks: action.notebooks};
        case GET_NOTEBOOK:
            const updatedNotebooks = {...state.notebooks};
            for (const key in action.notebook){
                updateNotebook[key] = action.notebook[key]
            };
            return {...state, notebooks: updatedNotebooks};
        case REMOVE_NOTEBOOK:
            const editNotebooks = {...state.notebooks};
            for (const key in action.notebook){
                delete editNotebooks[key]
            };
            return {...state, notebooks: editNotebooks};
        default:
            return state;
    };
};

export default notebookReducer;
