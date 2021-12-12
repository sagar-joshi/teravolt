import { useEffect, useState } from 'react';

import {ax} from './utils/axios.config.js';
import {Header} from './components/Header.js';
import {AuthContext} from './utils/contexts.js';

import "./utils/style.css";
import { ChatBox } from './components/ChatBox.js';

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
      <div className="App vh-100 overflow-hidden">
        {/* with bootstrap only h-25, h-50, h-75, h-100 are supported by default */}
        <div className='h-5'><Header/></div>
        <div className='h-95'>{user?<ChatBox groupId={16}/>:null}</div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
