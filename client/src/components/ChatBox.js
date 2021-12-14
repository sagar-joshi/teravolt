import { useState, useEffect, useRef, useContext } from "react";
import {io} from 'socket.io-client';

import { ChatHeader } from "./ChatHeader.js";
import { MessageArea } from "./MessageArea.js";
import {ax} from '../utils/axios.config.js';
import { InputArea } from "./InputArea.js";
import { AuthContext } from "../utils/contexts.js";

export function ChatBox(props){
    const auth = useContext(AuthContext);
    const groupId = props.groupId;
    const [msgList, setMsgList] = useState([]);
    const [socket, setSocket] = useState(null);
    const groupName = useRef("");
    const userId = auth.user.id;

    if(socket != null){
        socket.on("msg:new", (msg)=>{
            const newMsg = {name: msg.firstName +" "+ msg.lastName, msg: msg.text, self:msg.sender_id===userId };
            const newMsgList = [...msgList, newMsg];
            setMsgList(newMsgList);
        })
    }

    useEffect(()=>{
        const newSocket = io("http://localhost:5000");
        setSocket(newSocket);
        return () => {newSocket.close()};
    },[])

    useEffect(()=>{
        const setGroupName = ()=>{
            ax.post('/group/getByGroupId',{
                groupId: groupId
            })
            .then((res)=>{
                groupName.current = res.data[0].name;
            })
            .catch((err)=>{
                console.log(err);
            });
        }

        setGroupName();
    },[groupId])

    useEffect(()=>{
        const updateMsgList = ()=>{
            ax.post('/message/getByGroupId',{
                groupId: groupId
            })
            .then((res)=>{
                let result = res.data;
                result = result.map((row)=>{
                    return {name: row.firstName +" "+ row.lastName, msg: row.text, self:row.sender_id===userId }
                })
                setMsgList(result)
            })
            .catch((err)=>{
                console.log(err);
            });
        }

        updateMsgList();
    },[userId, groupId]);

    return (
        <div className="ChatBox h-100">
            <div className="h-6"><ChatHeader groupName={groupName.current}/></div>
            <div className="h-90"><MessageArea msgList={msgList}/></div>
            <div className="h-4"><InputArea groupId={groupId} socket={socket}/></div>
        </div>
    );
}