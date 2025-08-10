import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import rootReducer, { rootstate } from "./rootReducer";

export const store=configureStore({
    reducer:rootReducer,
    
})

export type AppThunk=ThunkAction<void,rootstate,unknown,Action<string>>
export type AppDispatch= typeof store.dispatch;
