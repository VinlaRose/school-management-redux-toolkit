import { createSlice } from '@reduxjs/toolkit'

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchWards = createAsyncThunk(
  'wards/fetchWards',
  async () => {
    const response = await axios.get(
      'https://patient-management-backend-psi.vercel.app/wards',
    )
    console.log(response.data)
    return response.data
  },
)


export const addWard = createAsyncThunk(
  'wards/addWard',
  async (wardData) => {
    try {
      const response = await axios.post('https://patient-management-backend-psi.vercel.app/wards', wardData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteWard = createAsyncThunk(
  'wards/deleteWard',
  async (wardId) => {
    try {
      const response = await axios.delete(`https://patient-management-backend-psi.vercel.app/wards/${wardId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateWard = createAsyncThunk(
  'wards/updateWard',
  async (wardData) => {
    console.log(wardData)
    try {
      const response = await axios.post(`https://patient-management-backend-psi.vercel.app/wards/${wardData.editingWardId}`, wardData);
      console.log(response.data)
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);




const initialState = {
  wards: [],
  status: 'idle',
  error: null,
}

export const wardSlice = createSlice({
  name: 'wards',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchWards.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchWards.fulfilled]: (state, action) => {
      state.status = 'success'
      state.wards = action.payload.data
    },
    [fetchWards.rejected]: (state, action) => {
      state.status = 'error'
      console.log(action.error.message)
      state.error = action.error.message
    },
    [addWard.pending]: (state) => {
      state.status = "loading";
    },
    [addWard.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards.push(action.payload.data);
    },
    [addWard.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updateWard.pending]: (state) => {
      state.status = "loading";
    },
    [updateWard.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedStudent = action.payload;
      const index = state.wards.findIndex((s) => s._id === updatedStudent._id);
      if (index !== -1) {
        state.wards[index] = updatedStudent;
      }
    },
    [updateWard.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteWard.pending]: (state) => {
      state.status = "loading";
    },
    [deleteWard.fulfilled]: (state, action) => {
      state.status = "success";
      
      state.wards = state.wards.filter(
        (ward) => ward._id !== action.payload.data._id
      );
    },
    [deleteWard.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  },
})

export default wardSlice.reducer;