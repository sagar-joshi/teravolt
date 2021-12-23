import { useState, useEffect, useRef, useContext } from "react";
import {io} from 'socket.io-client';

import { ChatHeader } from "./ChatHeader.js";
import { MessageArea } from "./MessageArea.js";
import {ax} from '../utils/axios.config.js';
import { InputArea } from "./InputArea.js";
import { AuthContext } from "../utils/contexts.js";

export function ChatBox(props){
    const forAuthenticatedUsers = props.type==="authenticated"?true:false;

    const auth = useContext(AuthContext);
    const userId = forAuthenticatedUsers? auth.user.id : null;

    const groupId = props.groupId;
    const [msgList, setMsgList] = useState([]);
    const [socket, setSocket] = useState(null);
    const groupName = useRef("");

    useEffect(() => {
        if(socket != null){
            socket.on("msg:new", (msg)=>{
                const newMsg = {name: msg.firstName +" "+ msg.lastName, msg: msg.text, self:msg.sender_id===null?msg.firstName===props.nickName:msg.sender_id===userId };
                setMsgList(msgList => [...msgList, newMsg]);
            })
        }
    },[socket, userId, props.nickName])

    useEffect(()=>{
        const socketUrl = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000/";
        const newSocket = io(socketUrl);
        newSocket.emit("socket:new", {groupId: groupId});
        setSocket(newSocket);
        return () => {newSocket.close()};
    },[groupId])

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

        if(forAuthenticatedUsers)
            setGroupName();
        else
            groupName.current = `Room ${groupId}`;
    },[groupId, forAuthenticatedUsers])

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

        if(forAuthenticatedUsers)
            updateMsgList();
    },[userId, groupId, forAuthenticatedUsers]);

    return (
        <div className="ChatBox h-100">
            <div className="h-6"><ChatHeader groupName={groupName.current} closeChatBox={props.closeChatBox}/></div>
            <div className="h-89"><MessageArea msgList={msgList}/></div>
            <div className="h-5"><InputArea groupId={groupId} socket={socket} forAuthenticatedUsers={forAuthenticatedUsers} nickName={props.nickName?props.nickName:null}/></div>
        </div>
    );
}