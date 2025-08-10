import { combineReducers } from "@reduxjs/toolkit";
import adminslice from "./pages/Adminslice"
import categoryslice from "../redux/pages/Categoryslice"
const rootReducer=combineReducers({
    adminslice:adminslice,
    categoryslice:categoryslice
})

export type rootstate =ReturnType<typeof rootReducer>

export default rootReducer