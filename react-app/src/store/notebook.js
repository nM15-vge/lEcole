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
