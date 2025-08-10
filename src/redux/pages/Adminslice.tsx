import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axiosInstance from "../interceptors/axiosconfig";
import { alert } from "../../Components/common/sweetAlert/alert";
interface signupstate {
  isAuthenticated:boolean;
}

const initialState :signupstate={
  isAuthenticated:false,
}

const Adminslice =createSlice({
    name:"adminslice",
    initialState,
    reducers:{
      setIsAuthenticated:(state,{ payload } : PayloadAction<any>)=>{
            state.isAuthenticated=payload;
        },

    },
})


  export const createadmin=(values:any):AppThunk => async ()=>{  
    try{
       console.log("hi");  
     const response=await axiosInstance.post("/admin/signup",values)
          if(response.status===201){
            alert("success",response.data.message)
            }
        }catch (error: any) {
          if (error.response && error.response.status === 409) {
            alert("error", error.response.data.message);
          }
           
          }
        }


     export const Login=(values:any):AppThunk=>async(dispatch)=>{
      try{
         const response=await axiosInstance.post("/admin/login",values)
           if(response.status===200){
            localStorage.setItem('token',response.data.token)
            dispatch(setIsAuthenticated(true))
            window.location.href = "/admin/sample";
           }      
      }catch(error:any){
             if (error.response) {
            if (error.response.status === 404) {
                alert('error', error.response.data.message);
            } else if (error.response.status === 401) {
                alert('error', error.response.data.message);
            }
        }
        

          }
          
     }
         


export const{setIsAuthenticated}=Adminslice.actions

export default Adminslice.reducer;