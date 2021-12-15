import { JoinedGroupsTab } from "./JoinedGroupsTab";

export function Dashboard(props){
    return(
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button className="nav-link active" id="joined-groups-tab" data-bs-toggle="tab" data-bs-target="#joined-groups" type="button" role="tab">Joined Groups</button>
                </li>
                <li className="nav-item">
                    <button className="nav-link" id="join-groups-tab" data-bs-toggle="tab" data-bs-target="#join-groups" type="button" role="tab">Join Groups</button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="joined-groups" role="tabpanel"><JoinedGroupsTab showChatBox={props.showChatBox}/></div>
                <div className="tab-pane fade" id="join-groups" role="tabpanel">No groups to join</div>
            </div>
        </div>
    )
}