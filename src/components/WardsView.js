import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWards } from '../features/wards/wardSlice'
import WardsList from '../features/wards/WardsList'

const WardsView = () => {
  const dispatch = useDispatch()


  const wards = useSelector((state) => state.wards.wards);
const status = useSelector((state) => state.wards.status);
const error = useSelector((state) => state.wards.error);


  useEffect(() => {
    if (status === 'idle' || status === 'error') {
      dispatch(fetchWards());
    }
  }, [status, dispatch]);


  

  return (
    <div>
      <h1>Wards View </h1>

      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <WardsList wards={wards} />

      {/* <h3>
        <Link to={`/wards/add`}>Add student</Link>
      </h3> */}
    </div>
  )
}

export default WardsView