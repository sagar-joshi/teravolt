import { useState, useEffect, useRef, useContext } from "react";

import { ChatHeader } from "./ChatHeader.js";
import { MessageArea } from "./MessageArea.js";
import {ax} from '../utils/axios.config.js';
import { InputArea } from "./InputArea.js";
import { AuthContext } from "../utils/contexts.js";

export function ChatBox(props){
    const auth = useContext(AuthContext);
    const groupId = props.groupId;
    const [msgList, setMsgList] = useState([]);
    const [fetchMsgFlag, toggleFetchMsgFlag] = useState(false);
    const groupName = useRef("");
    const userId = auth.user.id;

    const updateFetchMsgFlag = ()=>{
        toggleFetchMsgFlag(!fetchMsgFlag);
    }

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
    },[fetchMsgFlag, userId, groupId]);

    return (
        <div className="ChatBox h-100">
            <div className="h-6"><ChatHeader groupName={groupName.current}/></div>
            <div className="h-90"><MessageArea msgList={msgList}/></div>
            <div className="h-4"><InputArea groupId={groupId} updateMsgList={updateFetchMsgFlag}/></div>
        </div>
    );
}