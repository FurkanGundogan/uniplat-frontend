
let user = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : "";

console.log("localdeki user:",user)

export const initialState = {
    user:"" || user,
    loading: false,
};

console.log("initialstate user:",user)
export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case "REQUEST_LOGIN":
            return {
                ...initialState,
                loading: true
            };
        case "LOGIN_SUCCESS":
            return {
                ...initialState,
                user: action.payload,
                loading: false
            };
        case "UPDATE":
            return {
                 ...initialState,
                user: action.payload,
                loading: false
            };
        case "LOGOUT":
            return {
                ...initialState,
                user: "",
            };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};