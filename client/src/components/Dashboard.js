import { JoinedGroupsTab } from "./JoinedGroupsTab";
import { JoinGroupsTab } from "./JoinGroupsTab";

export function Dashboard(props){
    return(
        <div className="Dashboard h-100">
            <ul className="nav nav-tabs h-6">
                <li className="nav-item">
                    <button className="nav-link active" id="joined-groups-tab" data-bs-toggle="tab" data-bs-target="#joined-groups" type="button" role="tab">Joined Groups</button>
                </li>
                <li className="nav-item">
                    <button className="nav-link" id="join-groups-tab" data-bs-toggle="tab" data-bs-target="#join-groups" type="button" role="tab">Join Groups</button>
                </li>
            </ul>
            <div className="tab-content h-94" id="myTabContent">
                <div className="tab-pane fade show active h-100" id="joined-groups" role="tabpanel"><JoinedGroupsTab showChatBox={props.showChatBox}/></div>
                <div className="tab-pane fade h-100" id="join-groups" role="tabpanel"><JoinGroupsTab showChatBox={props.showChatBox}/></div>
            </div>
        </div>
    )
}