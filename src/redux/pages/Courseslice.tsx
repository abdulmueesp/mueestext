import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axiosInstance from "../interceptors/axiosconfig";

interface course{
    name:string;
    discription:string;
    language:string;
    document?:FileList;
    video?:FileList;
    thumbnail?:FileList;
    price:number;
    offerprice:number;
    category:string
}

interface coursestate{
    courseList:course[]
}

const initialState:coursestate={
    courseList:[]
}


const Courseslice=createSlice({
    name:"courseslice",
    initialState,
    reducers:{
        setCourseList:(state,{payload}:PayloadAction<any>)=>{
           state.courseList=payload;
        }
    }
})

export const courseadd=(data:any):AppThunk=>async()=>{
    const response=await axiosInstance.post("admin/courseadd",data,{
        
        headers:{
            "Content-Type":"multipart/form-data",
        },
    })

}