import { useState, useEffect, useRef, useContext } from "react";
import {io} from 'socket.io-client';

import { ChatHeader } from "./ChatHeader.js";
import { MessageArea } from "./MessageArea.js";
import {ax} from '../utils/axios.config.js';
import { InputArea } from "./InputArea.js";
import { AuthContext } from "../utils/contexts.js";
import './ChatBox.css';

export function ChatBox(props){
    const forAuthenticatedUsers = props.type==="authenticated"?true:false;

    const auth = useContext(AuthContext);
    const userId = forAuthenticatedUsers? auth.user.id : null;

    const groupId = props.groupId;
    const [msgList, setMsgList] = useState([]);
    const [socket, setSocket] = useState(null);
    const [activeMem, setActiveMem] = useState(0);
    const [groupName, setGroupName] = useState("");

    useEffect(() => {
        if(socket != null){
            socket.on("msg:new", (msg)=>{
                const newMsg = {name: msg.firstName +" "+ msg.lastName, msg: msg.text, self:msg.sender_id===null?msg.firstName===props.nickName:msg.sender_id===userId };
                setMsgList(msgList => [...msgList, newMsg]);
            })
            socket.on("mem:in", (data)=>{
                setActiveMem(data.memCount);
            });
            socket.on("mem:out", (data)=>{
                setActiveMem(data.memCount);
            });
        }
    },[socket, userId, props.nickName])

    useEffect(()=>{
        const socketUrl = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000/";
        let newSocket = null;
        if(socket === null){
            newSocket = io(socketUrl);
                setSocket(newSocket);
        }else if (!socket.connected){
            newSocket = io(socketUrl);
                setSocket(newSocket);
        }else{
            if(forAuthenticatedUsers)
                socket.emit("groupMem:in", {groupId: groupId});
            if(!forAuthenticatedUsers)
                socket.emit("roomMem:in", {roomId: groupId});
        }
        if(newSocket !== null){
            if(forAuthenticatedUsers)
                newSocket.emit("groupMem:in", {groupId: groupId});
            if(!forAuthenticatedUsers)
                newSocket.emit("roomMem:in", {roomId: groupId});
        }   
    },[groupId, forAuthenticatedUsers])

    useEffect(()=>{
        const updateGroupName = ()=>{
            ax.post('/group/getByGroupId',{
                groupId: groupId
            })
            .then((res)=>{
                setGroupName(res.data[0].name);
            })
            .catch((err)=>{
                console.log(err);
            });
        }
        if(forAuthenticatedUsers)
            updateGroupName();
        else{
            setGroupName(`Room ${groupId}`);
        }
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
            <div className="h-6"><ChatHeader groupId = {groupId} groupName={groupName} activeMem={activeMem} socket={socket} forAuthenticatedUsers={forAuthenticatedUsers} updateChatRoomId={props.updateChatRoomId} closeChatBox={props.closeChatBox}/></div>
            <div className="h-88"><MessageArea msgList={msgList}/></div>
            <div className="h-6"><InputArea groupId={groupId} socket={socket} forAuthenticatedUsers={forAuthenticatedUsers} nickName={props.nickName?props.nickName:null}/></div>
        </div>
    );
}

