import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userdata : []
}

const user = createSlice({
    name : "user",
    initialState,
    reducers : {
        setUser : (state,action) => {
            state.userdata = [];
            state.userdata.push(action.payload)
        }
    }
})

export const {setUser} = user.actions;
export default user.reducer