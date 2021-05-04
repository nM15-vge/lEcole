import myFetch from "./fetch";

const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
    type: SET_USER,
    user
});

const removeUser = () => ({
    type: REMOVE_USER
});

export const authenticate = () => async(dispatch) => {
    const data = await myFetch('/api/auth/',{
    });
    dispatch(setUser(data));
};

export const login = (email, password) => async (dispatch) => {
    const data = await myFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        })
    });
    dispatch(setUser(data));
};

export const logout = () => async (dispatch) => {
    const data = await myFetch("/api/auth/logout");
    console.log(data)
    dispatch(removeUser());
};

export const signUp = (username, firstName, lastName, email, password) => async (dispatch)=> {
    const data = await myFetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
            username,
            first_name: firstName,
            last_name: lastName,
            email,
            password,
        }),
    });
    dispatch(setUser(data));
};

const initialState = {user: null};

const sessionReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_USER:
            return {user: action.user};
        case REMOVE_USER:
            return {user: null};
        default:
            return state;
    };
};

export default sessionReducer;
