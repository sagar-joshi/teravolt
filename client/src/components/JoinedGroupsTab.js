import { useContext, useEffect, useState } from "react"
import { ax } from "../utils/axios.config"
import { AuthContext } from "../utils/contexts"

export function JoinedGroupsTab(props){
    const auth = useContext(AuthContext);
    const [groupList, setGroupList] = useState([]);
    const [reRenderGroupList, toggleReRenderGroupList] = useState(false);

    useEffect(()=>{
        ax.post('/group/getByUserId',auth.user)
        .then((res)=>{
            setGroupList(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[auth.user, reRenderGroupList])

    function handleEnterGroup(groupId){
        props.showChatBox(groupId);
    }

    function handleLeaveGroup(groupId){
        ax.post('/group/removeMember',{
            groupId: groupId,
            userId: auth.user.id
        })
        .then((res)=>{
            if(res.status === 200){
                toggleReRenderGroupList(!reRenderGroupList);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const groups = groupList.length === 0?<div className="ms-3 mt-4">You have not joined any group yet.</div>:groupList.map((item, index)=>{
        return (
        <div className="card" key={index}>
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <div className="d-flex flex-row">
                    <button className="btn btn-primary ms-1 me-1" onClick={()=>{handleEnterGroup(item.group_id)}}>Enter Group</button>
                    <button className="btn btn-primary ms-1 me-1" onClick={()=>{handleLeaveGroup(item.group_id)}}>Leave Group</button>
                </div>
            </div>
        </div>
        )
    });

    return (
        <div className="h-100 overflow-auto">
            {groups}
        </div>
    )
}