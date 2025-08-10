import { TypedUseSelectorHook } from "react-redux";
import { rootstate } from "./rootReducer";
import { useSelector } from "react-redux";
import { AppDispatch } from "./store";
import { useDispatch } from "react-redux";


export const useAppselector:TypedUseSelectorHook<rootstate>=useSelector;

export const useAppDispatch:()=>AppDispatch=useDispatch;
