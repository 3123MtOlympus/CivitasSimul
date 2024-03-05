import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

//import ToolForm from '../components/ToolForm';
import ToolList from '../components/ToolList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  //const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_ME);

  const user = data?.me || {};
  useEffect(() => {
    console.log(data);
  }, [data])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div >
      <div className="justify-center">
        <div className="card">
          <div>
            <h3>
              Viewing {`${user.username}'s`} profile
            </h3>
            <div>
              <h4>
                Email:<span style={{ fontSize: '1rem' }}> {user.email} </span>
              </h4>
              <h4>
                Phone Number: <span style={{ fontSize: '1rem' }}>{user.phoneNumber}</span>
              </h4>
            </div>
          </div>

          {user.tools ? (
            <ToolList
              tools={user.tools}
            />
          ) : (<div></div>)}
        </div>

      </div>

      
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add a Tool</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              The form goes here
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Add Tool</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Profile;
