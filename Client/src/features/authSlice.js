import {createSlice} from '@reduxjs/toolkit';
const authSlice = createSlice({
    name : 'auth',
    initialState : {
        user : null,
        isAuthenticated : false
    },
    reducers : {
        userLoggedIn : (state,action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        userLoggedOut : (state,action) => {
            state.user = null
            state.isAuthenticated = false;
        }
    }
})
export const {userLoggedIn,userLoggedOut} = authSlice.actions;
export default authSlice.reducer;