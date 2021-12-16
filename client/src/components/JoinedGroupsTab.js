import { useContext, useEffect, useState } from "react"
import { ax } from "../utils/axios.config"
import { AuthContext } from "../utils/contexts"

export function JoinedGroupsTab(props){
    const auth = useContext(AuthContext);
    const [groupList, setGroupList] = useState([]);

    useEffect(()=>{
        ax.post('/group/getByUserId',auth.user)
        .then((res)=>{
            setGroupList(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[auth.user])

    function handleEnterGroup(groupId){
        props.showChatBox(groupId);
    }

    const groups = groupList.length === 0?<div className="ms-3 mt-4">You have not joined any group yet.</div>:groupList.map((item, index)=>{
        return (
        <div className="card" key={index}>
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Description</p>
                <button className="btn btn-primary" onClick={()=>{handleEnterGroup(item.group_id)}}>Enter Group</button>
            </div>
        </div>
        )
    });

    return (
        <div>
            {groups}
        </div>
    )
}