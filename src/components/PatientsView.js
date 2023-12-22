import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPatients } from '../features/patients/patientSlice'
import PatientsList from '../features/patients/PatientsList'


const PatientsView = () => {
  const dispatch = useDispatch()

  

  const patients = useSelector((state) => state.patients.patients);
const status = useSelector((state) => state.patients.status);
const error = useSelector((state) => state.patients.error);


  useEffect(() => {
    if (status === 'idle' || status === 'error') {
      dispatch(fetchPatients());
    }
  }, [status, dispatch]);


  

  return (
    <div>
      <h1>Patients View </h1>

      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <PatientsList patients={patients} />

      {/* <h3>
        <Link to={`/wards/add`}>Add student</Link>
      </h3> */}
    </div>
  )
}

export default PatientsView