import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { deletePatient } from './patientSlice';
import AddPatientModal from '../../components/addEdit/AddPatintModal';
import EditPatientModal from '../../components/addEdit/EditPatientModal';
import { useDispatch } from 'react-redux';



const PatientsList = ({ patients }) => {
  const dispatch = useDispatch()
    console.log(patients);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setEditModal] = useState(false)
   const openAddPatientModal = () => {
     setOpenModal(true)
   }
   const closeAddPatientModal = () => {
     setOpenModal(false)
   }
   
   const closeEditPatientModal = () => {
     setEditModal(false)
   }
   
   const handleEdit = (patient) => {
    console.log(patient)
    setEditModal(true);
    console.log(openEditModal)
   };
   
   const handleDelete = (patient) => {
     dispatch(deletePatient(patient._id));
   };
  return (
    <div>
      <h2>Patients List</h2>
      <button onClick={openAddPatientModal}>Add New Patient</button>
     <AddPatientModal openModal={openModal} onRequestClose={closeAddPatientModal} />
     <EditPatientModal openEditModal={openEditModal} onRequestClose={closeEditPatientModal} />
     
      <table className="wards-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Ward</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td>{patient.name.fistName} {patient.name.lastName}</td>
              <td>{patient.assignedWard == null ? (<span>not assigned</span>) : <span>{patient.assignedWard.wardNumber}</span>}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>
                <button onClick={() => handleEdit(patient)}>Edit</button>
                <button onClick={() => handleDelete(patient)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
     
    </div>
  )
}

export default PatientsList