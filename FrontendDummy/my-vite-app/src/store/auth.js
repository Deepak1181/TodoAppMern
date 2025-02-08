// import {createSlice} from "@reduxjs/toolkit"
// const authSlice = createSlice({
//     name:"auth",
//     initilaState:{isLoggedIn:false},
//     reducers:{
//         login(state){
//             state.isLoggedIn = true
//         },
//         logout(state){
//             state.isLoggedIn = false
//         }
//     }
// })

// export const authActions= authSlice.actions;
// export default authSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { isLoggedIn: false }, // ✅ Fixed typo
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer; // ✅ Ensure correct export
