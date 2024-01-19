import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux';
import { useGetUserByIdQuery } from '../slices/usersApiSlice'

const ProfileScreen = () => {
    const [user, setUser] = useState({});
    const { userInfo } = useSelector((state) => state.auth);
    const { data, error } = useGetUserByIdQuery(userInfo?._id)

    useEffect(() => {
        if (data) {
          setUser(data);
        }
        if (error) {
          console.error('Error fetching user data:', error);
        }
      }, [data, error]);

  return (
    <div>
    {user._id ? (
      <div>
        <h2>User Profile</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>

        {user.proficiencyLevel && (
            <div>
              <h3>Proficiency in Languages:</h3>
              <ul>
                {Object.entries(user.proficiencyLevel).map(([language, proficiency]) => (
                  <li key={language}>
                    {language}: {proficiency}
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  )
}

export default ProfileScreen