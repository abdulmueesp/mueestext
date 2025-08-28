// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface UserState {
//   phoneNumber: string;
//   role: 'admin' | 'user' | null;
//   isAuthenticated: boolean;
//   isProfileCompleted: boolean;
// }

// const initialState: UserState = {
//   phoneNumber: '',
//   role: null,
//   isAuthenticated: false,
//   isProfileCompleted: false,
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setPhoneNumber: (state, action: PayloadAction<string>) => {
//       state.phoneNumber = action.payload;
//     },
//     setRole: (state, action: PayloadAction<'admin' | 'user'>) => {
//       state.role = action.payload;
//       state.isAuthenticated = true;
//     },
//     setProfileCompleted: (state, action: PayloadAction<boolean>) => {
//       state.isProfileCompleted = action.payload;
//     },
//     logout: (state) => {
//       state.phoneNumber = '';
//       state.role = null;
//       state.isAuthenticated = false;
//       state.isProfileCompleted = false;
//     },
//   },
// });

// export const { setPhoneNumber, setRole, setProfileCompleted, logout } = userSlice.actions;
// export default userSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userData: UserData;
  phoneNumber: string;
  role: 'admin' | 'user' | null;
  isAuthenticated: boolean;
  isProfileCompleted: boolean;
}
interface UserData {
  name: string;
  email: string;
  type: 'student' | 'parent' | 'teacher' | null;
  PhoneNumber: string;
}

const initialState: UserState = {
  userData: {
    name: '',
    email: '',
    type: null,
    PhoneNumber: '',
  },
  phoneNumber: '',
  role: null,
  isAuthenticated: false,
  isProfileCompleted: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
     setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setRole: (state, action: PayloadAction<'admin' | 'user'>) => {
      state.role = action.payload;
      state.isAuthenticated = true; // ✅ This automatically sets authentication
    },
    setProfileCompleted: (state, action: PayloadAction<boolean>) => {
      state.isProfileCompleted = action.payload;
    },
    // 🔄 CORRECTED LOGOUT - Returns initial state for redux-persist
    logout: () => {
      return initialState; // ✅ This properly clears ALL persisted state
    },
  },
});

export const { setPhoneNumber, setRole, setProfileCompleted, logout,setUserData } = userSlice.actions;
export default userSlice.reducer;