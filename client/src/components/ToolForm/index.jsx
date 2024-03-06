import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_TOOL } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const ToolForm = () => {
  const [toolText, setToolText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [name, setToolName] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImageUrl] = useState('');

  useEffect(()=>{
    console.log(name);
    console.log(description);
    console.log(imgUrl);
  })


  const [addTool, { error }] = useMutation
  (ADD_TOOL, {
    refetchQueries: [
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addTool({
        variables: {
          name,
          description,
          imgUrl,
        },
      });

      setToolText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'toolText' && value.length <= 280) {
      setToolText(value);
      setCharacterCount(value.length);
    }
  };

  //const handleImageUpload = () => {
    const myWidget = cloudinary.createUploadWidget({
      cloudName: 'dwjrsllb0', 
      uploadPreset: 'hike_img'}, (error, result) => { 
        if (!error && result && result.event === "success") { 
          console.log('Done! Here is the image info: ', result.info); 
          setImageUrl(result.info.secure_url);
        }
      }
    )
  //}

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <input
                name="toolText"
                placeholder="Name of tool..."
                value={name}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={(event)=>setToolName(event.target.value)}
              />

              <input
                name="description"
                placeholder="Tool description..."
                value={description}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={(event)=>setDescription(event.target.value)}
              />
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Tool
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
          <button id="upload_widget" className="cloudinary-button" onClick={()=>myWidget.open()}>Upload Image</button>
        </>
      ):(<></>)}
    </div>
  );
};

export default ToolForm;
