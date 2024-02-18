import { createSlice } from '@reduxjs/toolkit'

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPatients = createAsyncThunk(
  'patients/fetchPatients',
  async () => {
    const response = await axios.get(
      'https://patient-management-backend-gamma.vercel.app/patients',
    )
    console.log(response.data)
    return response.data
  },
)


export const addPatient = createAsyncThunk(
  'patients/addPatient',
  async (patientData) => {
    try {
      const response = await axios.post('https://patient-management-backend-gamma.vercel.app/patients', patientData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deletePatient = createAsyncThunk(
  'patients/deleteWard',
  async (patientId) => {
    try {
      const response = await axios.delete(`https://patient-management-backend-gamma.vercel.app/patients/${patientId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updatePatient = createAsyncThunk(
  'patients/updatePatient',
  async (patientData) => {
    console.log(patientData)
    try {
      const response = await axios.post(`https://patient-management-backend-gamma.vercel.app/patients/${patientData.editingWardId}`, patientData);
      console.log(response.data)
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);


const initialState = {
    patients: [],
  status: 'idle',
  error: null,
}

export const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPatients.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchPatients.fulfilled]: (state, action) => {
      state.status = 'success'
      state.patients = action.payload.data
    },
    [fetchPatients.rejected]: (state, action) => {
      state.status = 'error'
      console.log(action.error.message)
      state.error = action.error.message
    },
    [addPatient.pending]: (state) => {
      state.status = "loading";
    },
    [addPatient.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients.push(action.payload.data);
    },
    [addPatient.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updatePatient.pending]: (state) => {
      state.status = "loading";
    },
    [updatePatient.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedStudent = action.payload;
      const index = state.patients.findIndex((s) => s._id === updatedStudent._id);
      if (index !== -1) {
        state.patients[index] = updatedStudent;
      }
    },
    [updatePatient.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deletePatient.pending]: (state) => {
      state.status = "loading";
    },
    [deletePatient.fulfilled]: (state, action) => {
      state.status = "success";
      
      state.patients = state.patients.filter(
        (ward) => ward._id !== action.payload.data._id
      );
    },
    [deletePatient.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
})

export default patientSlice.reducer;