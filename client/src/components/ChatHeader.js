import { IconContext } from 'react-icons/lib';
import { MdClose, MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

export function ChatHeader(props){
    const handleClose = ()=>{
        if(props.forAuthenticatedUsers)
            props.socket.emit("groupMem:out", {groupId: props.groupId});
        if(!props.forAuthenticatedUsers)
            props.socket.emit("roomMem:out", {roomId: props.groupId});

        props.closeChatBox();
    }

    const handleNext = ()=>{

    }

    const handlePrev = ()=>{

    }

    const activeCount = props.forAuthenticatedUsers?"":`(${props.activeMem} online)`;
    return (
        <IconContext.Provider value={{size: "1.5em"}}>
            <div className="ChatHeader h-100 row d-flex flex-row align-items-center card">
                    <div className="col-10 d-flex justify-content-center align-items-center">
                        <button className="btn" onClick={handlePrev}><MdNavigateBefore/></button>
                        {`${props.groupName} ${activeCount}`}
                        <button className="btn" onClick={handleNext}><MdNavigateNext/></button>
                    </div>
                <div className="col-2 d-flex justify-content-end">
                    <button className="btn" onClick={handleClose}><MdClose/></button>
                </div>
            </div>
        </IconContext.Provider>
    )
}