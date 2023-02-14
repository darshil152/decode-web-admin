import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    state: {
        isFetching: false,
        userRole: false,
    },
    user: {
        name: "collins",
        isAuthenticated: true,

    },
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsFetching: (state) => {
            state.state.isFetching = true;
        },
        setUserRole: (State) => {
            state.state.userRole = 1
        }
    }
});

export const {
    setIsFetching,
} = userSlice.actions;


export default userSlice.reducer;