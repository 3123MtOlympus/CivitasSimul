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
  // navigate to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return <Navigate to="/" />;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!user?.username) {
  //   return (
  //     <h4>
  //       You need to be logged in to see this. Use the navigation links above to
  //       sign up or log in!
  //     </h4>
  //   );
  // }

  return (
    <div>
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
    </div>
  );
};

export default Profile;
