import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axiosInstance from "../interceptors/axiosconfig";
import { alert } from "../../Components/common/sweetAlert/alert";

interface categorystate{
    categoryList:any
}
const initialState:categorystate={
    categoryList:""
}

const Categoryslice=createSlice({
    name:"categoryslice",
    initialState,
    reducers:{
        setCategoryList:(state,{payload}:PayloadAction<any>)=>{
            state.categoryList=payload
        }
    }
})


  export const createcategory=(value:any):AppThunk =>async (dispatch)=>{
      try{
        const response=await axiosInstance.post("admin/category",value)
        if(response.status===201){
            alert("success",response.data.message)
            dispatch(setCategoryList(response.data.category))
        }
    }catch(error:any){
        if (error.response && error.response.status === 409){
            alert("error",error.response.data.message)
        }
    }
  }

   export const getcategoryList=():AppThunk=>async(dispatch)=>{
      try{
        const response=await axiosInstance.get("admin/categorylist")
        if(response.status===201){
            dispatch(setCategoryList(response.data.data))
        }
    }catch(error){
      console.log(`error is getcategorylist${error}`);
      
    }
   }

   export const deletecategory=(id:any):AppThunk=>async(dispatch)=>{
           const response=await axiosInstance.delete(`admin/categorydlt?id=${id}`)
           if(response.status===201){
            alert('success',response.data.message)
            dispatch(setCategoryList(response.data.data))
           }
   }





export const {setCategoryList}=Categoryslice.actions
export default Categoryslice.reducer

