import { useEffect, useState } from 'react';

import {ax} from './utils/axios.config.js';
import {Header} from './components/Header.js';
import {AuthContext} from './utils/contexts.js';

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const updateAuthenticatedUser = ()=>{
    ax.get('/user/getAuthenticatedUser')
    .then((res)=>{
      if(res.status === 200){
        setUser(res.data);
      }
    })
    .catch((err)=>{
      if(err.response.status === 401)
        setUser(null);
    })
  }

  useEffect(updateAuthenticatedUser,[])

  return (
    <AuthContext.Provider value={{user: user, updateUser: updateAuthenticatedUser}}>
      <div className="App">
        <Header/>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
