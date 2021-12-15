import { useEffect, useState } from 'react';

import {ax} from './utils/axios.config.js';
import {Header} from './components/Header.js';
import {AuthContext} from './utils/contexts.js';

import "./utils/style.css";
import { Dashboard } from './components/Dashboard';
import { ChatBox } from './components/ChatBox.js';


function App() {
  const [user, setUser] = useState(null);
  const [chatBox, setChatBox] = useState(false);
  const [chatBoxGroupId, setChatBoxGroupId] = useState(null);

  const showChatBox = (groupId)=>{
    setChatBox(true);
    setChatBoxGroupId(groupId);
  }

  const closeChatBox = ()=>{
    setChatBox(false);
    setChatBoxGroupId(null);
  }

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

  const dashboard = user?<Dashboard showChatBox={showChatBox}/>:null;
  const body = chatBox?<ChatBox groupId={chatBoxGroupId} closeChatBox={closeChatBox}/>:dashboard;

  return (
    <AuthContext.Provider value={{user: user, updateUser: updateAuthenticatedUser}}>
      <div className="App vh-100 overflow-hidden">
        {/* with bootstrap only h-25, h-50, h-75, h-100 are supported by default */}
        <div className='h-5'><Header/></div>
        <div className='h-95'>{body}</div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
