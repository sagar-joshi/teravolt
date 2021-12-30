export function ChatHeader(props){
    const handleClose = ()=>{
        if(props.forAuthenticatedUsers)
            props.socket.emit("groupMem:out", {groupId: props.groupId});
        if(!props.forAuthenticatedUsers)
            props.socket.emit("roomMem:out", {roomId: props.groupId});

        props.closeChatBox();
    }
    const activeCount = props.forAuthenticatedUsers?"":`(${props.activeMem} online)`;
    return (
        <div className="ChatHeader h-100 row d-flex flex-row align-items-center card">
            <div className="col-10 d-flex justify-content-center">
                {`${props.groupName} ${activeCount}`}
            </div>
            <div className="col-2 d-flex justify-content-end">
                <button className="btn btn-close" onClick={handleClose}></button>
            </div>
        </div>
    )
}