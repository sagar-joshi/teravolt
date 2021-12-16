import { useContext, useEffect, useState } from "react"
import { ax } from "../utils/axios.config"
import { AuthContext } from "../utils/contexts";

export function JoinGroupsTab(props){
    const [groupList, setGroupList] = useState([]);
    const auth = useContext(AuthContext);

    useEffect(()=>{
        ax.post('/group/getGroups')
        .then((res)=>{
            const groups = res.data;
            ax.post('/group/getByUserId',auth.user)
            .then((res)=>{
                const userGroups = res.data;
                const userGroupsIds = userGroups.map((x) => x.group_id);
                const newGroups = groups.filter(group => !(userGroupsIds.includes(group.id)));
                setGroupList(newGroups);
            })
            .catch((err)=>{
                console.log(err);
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    },[auth.user])

    function handleJoinGroup(groupId){
        ax.post('/group/addMember',{groupId: groupId})
        .then((res)=>{
            if(res.status === 200)
                props.showChatBox(groupId);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const groups = groupList.length === 0?<div className="ms-3 mt-4">No groups to show.</div>:groupList.map((item, index)=>{
        return (
        <div className="card" key={index}>
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Description</p>
                <button className="btn btn-primary" onClick={()=>{handleJoinGroup(item.id)}}>Join Group</button>
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