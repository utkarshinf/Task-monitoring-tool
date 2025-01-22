import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isFormVisible: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    toggleFormVisibility:(state) => {
      state.isFormVisible = !state.isFormVisible;

    },
    setFormVisibility: (state,action)=>{
      state.isFormVisible = action.payload
    }
  },
});

export const { loginSuccess, logout ,toggleFormVisibility , setFormVisibility} = authSlice.actions;

export default authSlice.reducer;
