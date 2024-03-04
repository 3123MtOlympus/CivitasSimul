import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    unitNumber: '',
    phoneNumber: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <div className="card-body">
            {data ? (
              <p>
                Welcome{' '}!
                <Link to="/"></Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <h3>Join our Community</h3>
                <h6>Enter Username:</h6>
                <input
                  className="form-input"
                  placeholder="Username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                />
                <h6>Enter Unit Number:</h6>
                <input
                  className="form-input"
                  placeholder="Unit Number"
                  name="unitNumber"
                  type="text"
                  value={formState.unitNumber}
                  onChange={handleChange}
                />
                <h6>Enter Email:</h6>
                <input
                  className="form-input"
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <h6>Enter Phone Number:</h6>
                 <input
                  className="form-input"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  type="text"
                  value={formState.phoneNumber}
                  onChange={handleChange}
                />
                <h6>Enter Password:</h6>
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
