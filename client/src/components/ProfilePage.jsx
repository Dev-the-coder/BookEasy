import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNavigation from './AccountNavigation';

export default function AccountPage() {

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  const { ready, user, setUser } = useContext(UserContext);

  //logout button function 
  const [redirect, setRedirect] = useState(null);
  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return 'Loading...';
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }


  if (ready && !user) {
    return <Navigate to={'/login '} />
  }

  function linkC(type = null) {
    let classes = "inline-flex gap-1 px-6 py-2 rounded-full";
    if (type === false) {
      classes += ' bg-primary text-white '
    }
    else {
      classes += 'bg-gray-200'
    }
    return classes;
  }



  return (
    <div>
      <AccountNavigation />
      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto'>
          Logged in as {user.name} ({user.email})<br />
          <button className="mt-6 m-auto w-1/2 transition rounded-full items-center transition-all block py-3 px-4 text-white font-bold rounded cursor-pointer bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-secondary focus:bg-indigo-900  transform hover:-translate-y-1 hover:shadow-lg"
            onClick={logout} value="Submit" >
            logout
          </button>
        </div>
      )}
      {subpage === "places" && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>


  )
}


