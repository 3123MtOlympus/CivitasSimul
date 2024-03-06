import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {useEffect } from 'react';

import { QUERY_USER,QUERY_TOOLS} from '../utils/queries';
import { SEND_EMAIL } from '../utils/mutations';

import Auth from '../utils/auth';

const ToolLibrary = () => {
    //const [formState, setFormState] = useState([]);
    const { loading, data } = useQuery(QUERY_TOOLS);
    

 // const [sendEmail, { error, unitNumber }] = useMutation(SEND_EMAIL);
  const tools = data?.tools  || [];
  useEffect(()=> {
    console.log(data);
    console.log(tools);
  },[data])

//   useEffect(()=> {
//     console.log(formState);
//   },[formState])

  if (loading) {
    return <div>Loading...</div>;
  }

//   const handleChange = (event) => {
//     const { value } = event.target;

//     setFormState([
//       ...formState,
//       value,
//     ]);
//  };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     console.log(formState);

//     try {
//         //send an email to each unit number
//        formState.forEach(async unitNumber => {
//         const { result } = await sendEmail({
//                 variables: { unitNumber: unitNumber },
//               });
//        })      
//     } catch (e) {
//       console.error(e);
//     }
//   };

  return (
    <div>
      <div className="justify-center">
        <h2 className="bg-dark text-light">
          Tool Library 
        </h2>
<p> Here, we can join our community with sharing what we have. Need a hammer? Check here! Need some salt? Check here! You never know what your neighors may have to offer!</p>
        <div className="toolcard row-4">                
                {tools && tools.map((tool) => (
                        <div className="card list" key={tool._id}>
                            <img src={tool.imgUrl} className="img-top" alt={tool.name} />
                            <div className="card-body">
                                <h5 className="card-title">{tool.name}</h5>
                                <p className="card-text">{tool.description}</p>
                            </div>
                        </div>
                ))}
        </div>
       
      </div>
    </div>
  );
};

export default ToolLibrary;
