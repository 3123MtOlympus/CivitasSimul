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
        <h2 className="col-12 col-md-10 bg-dark text-light  mb-5">
          Tool Library 
        </h2>

        <div className="col-12 col-md-10 mb-5">                
                {tools && tools.map((tool) => (
                        <div className="card" key={tool._id}>
                            <img src={tool.imgUrl} className="card-img-top" alt={tool.name} />
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
