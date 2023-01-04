import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';

export default function Profile({ id }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    API.GET(API.ENDPOINTS.singleUser(id))
      .then(({ data }) => {
        setUserData(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  return (
    <>
      <p>Profile component</p>
      <p>{userData?.username}</p>
    </>
  );
}
