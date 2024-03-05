import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {useEffect } from 'react';

import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { SEND_EMAIL } from '../utils/mutations';

import Auth from '../utils/auth';

const PackageNotification = () => {
    const [formState, setFormState] = useState([]);
    const { loading, data } = useQuery(QUERY_USER);
    

  const [sendEmail, { error, unitNumber }] = useMutation(SEND_EMAIL);
  const users = data?.users  || [];
  useEffect(()=> {
    console.log(data);
    console.log(users);
  },[data])

  useEffect(()=> {
    console.log(formState);
  },[formState])

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleChange = (event) => {
    const { value } = event.target;

    setFormState([
      ...formState,
      value,
    ]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
        //send an email to each unit number
       formState.forEach(async unitNumber => {
        const { result } = await sendEmail({
                variables: { unitNumber: unitNumber },
              });
       })      
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
  <h1> Thanks for Being NeighborLY</h1>
  

      <div className="justify-center">

<div className="othercard">

        <div className="col-12 col-md-10 mb-5">
            <form onSubmit={handleFormSubmit} >
                
                {users && users.map((user) => (
                    <div key={user.unitNumber}>
                        <input type="checkbox" id="" name={user.unitNumber} value={user.unitNumber} onChange={handleChange} />
                        <label for={user.unitNumber}> {user.unitNumber} </label> <br/>  
                    </div>
                ))}
                
                <button
                className="btn btn-block btn-primary"
                style={{ cursor: 'pointer' }}
                type="submit"
                >
                Submit
                </button>
              </form>
        </div>
       
      </div>
    </div>
    </div>
  );
};

export default PackageNotification;
