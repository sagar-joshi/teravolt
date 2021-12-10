import { useState, useEffect, useRef } from "react";

import { ChatHeader } from "./ChatHeader.js";
import { MessageArea } from "./MessageArea.js";
import {ax} from '../utils/axios.config.js';
import { InputArea } from "./InputArea.js";

export function ChatBox(props){
    const groupId = props.groupId;
    const [msgList, setMsgList] = useState([]);
    const groupName = useRef("");
    const userId = useRef("");

    useEffect(()=>{
        ax.post('/group/getByGroupId',{
            groupId: groupId
        })
        .then((res)=>{
            groupName.current = res.data[0].name;
        })
        .catch((err)=>{
            console.log(err);
        });

        ax.get('/user/getAuthenticatedUser')
        .then((res)=>{
            userId.current=res.data.id;
            ax.post('/message/getByGroupId',{
                groupId: groupId
            })
            .then((res)=>{
                let result = res.data;
                result = result.map((row)=>{
                    return {name: row.firstName +" "+ row.lastName, msg: row.text, self:row.sender_id===userId.current }
                })
                setMsgList(result)
            })
            .catch((err)=>{
                console.log(err);
            });
        })
        .catch((err)=>{
            console.log(err);
        });
    },[groupId]);
    return (
        <div>
         <ChatHeader groupName={groupName.current}/>
        <MessageArea msgList={msgList}/>
        <InputArea/>
        </div>
    );
}