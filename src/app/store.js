import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import wardReducer from '../features/wards/wardSlice';
import patientsReducer from '../features/patients/patientSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    wards : wardReducer,
    patients : patientsReducer,
  },
});
