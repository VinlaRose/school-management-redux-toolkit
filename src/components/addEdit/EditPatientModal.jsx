import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { addPatient, fetchPatients } from '../../features/patients/patientSlice';
import { fetchWards } from '../../features/wards/wardSlice';

function EditPatientModal({openEditModal, onRequestClose}) {
  const wards = useSelector(state => state.wards.wards)
    const dispatch = useDispatch();
   
  
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [conditions, setConditions] = useState([]);
    const [surgeries, setSurgeries] = useState([]);
    const [allergies, setAllergies] = useState([]);
    const [medications, setMedications] = useState([]);
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [assignedWard, setAssignedWard] = useState('');

    
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const newPatient = {
        name: {
          firstName,
          lastName,
        },
        age,
        gender,
        medicalHistory: {
          conditions,
          surgeries,
          allergies,
          medications,
        },
        contactInformation: {
          address: {
            street,
            city,
            state,
            zipCode,
          },
          phoneNumber,
          emailAddress,
          
        },
        assignedWard,
        
      };

      console.log(newPatient)
  
      dispatch(addPatient(newPatient));
  
     
      setFirstName('');
      setLastName('');
      setAge('');
      setGender('');
      setConditions([]);
      setSurgeries([]);
      setAllergies([]);
      setMedications([]);
      setStreet('');
      setCity('');
      setState('');
      setZipCode('');
      setPhoneNumber('');
      setEmailAddress('');
      setAssignedWard('')
    
    onRequestClose()
    
    };

    const handleSelectChange = (id) => {
      setAssignedWard(id)
    }
  
    useEffect(() => {
      dispatch(fetchPatients());
      dispatch(fetchWards());
    }, [dispatch]);

    
  


    return (
        <div>
 {
            openEditModal && <div className='patient-modal'>
       
            <form onSubmit={handleSubmit}>
              <label>First Name:
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </label>
              <br />
              <label>Last Name:
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </label>
              <br />
              <label>Age:
                <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
              </label>
              <br />
              <label>Gender:
                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
              </label>
              <br />
              <label>Conditions (comma-separated):
                <input type="text" value={conditions} onChange={(e) => setConditions(e.target.value.split(','))} />
              </label>
              <br />
              <label>Surgeries (comma-separated):
                <input type="text" value={surgeries} onChange={(e) => setSurgeries(e.target.value.split(','))} />
              </label>
              <br />
              <label>Allergies (comma-separated):
                <input type="text" value={allergies} onChange={(e) => setAllergies(e.target.value.split(','))} />
              </label>
              <br />
              <label>Medications (comma-separated):
                <input type="text" value={medications} onChange={(e) => setMedications(e.target.value.split(','))} />
              </label>
              <br />
              <label>Street:
                <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
              </label>
              <br />
              <label>City:
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
              </label>
              <br />
              <label>State:
                <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
              </label>
              <br />
              <label>Zip Code:
                <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
              </label>
              <br />
              <label>Phone Number:
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </label>
              <br />
              <label>Assigned Ward:
                
                
                <select className='.select-field ' value={assignedWard} onChange={(e) => setAssignedWard(e.target.value)}>
      <option value="">Select an option</option>
      {wards.map((ward) => (
        <option key={ward._id} value={ward._id}>
          {ward.wardNumber}
        </option>
      ))}
    </select></label>
              
              <br/>
              <label>Email Address:
                <input type="text" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
              </label>
              <br />
              <div>
              <button type="submit">Edit Patient</button>
              <button className="close-button" onClick={onRequestClose}>Close</button>
          
              </div>
             

            </form>
           
            
          </div>
        }
        </div>
       
      
    );
  }
  
  export default EditPatientModal;
  