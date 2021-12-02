import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: "alert/detail",
    initialState: {
        alertValue: "",
        alertType: "",
        alertChanged: 0,
    },
    reducers: {
        setAlert: (state, action) => {
            const payload = action.payload
            return {
                alertValue: payload.alertValue || "",
                alertType: payload.alertType || "success",
                alertChanged: Math.random(),
            }
        }
    }
})

export const { setAlert } = dataSlice.actions;
export default dataSlice.reducer;

