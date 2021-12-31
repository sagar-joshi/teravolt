import { IconContext } from 'react-icons/lib';
import { MdClose, MdNavigateNext, MdNavigateBefore, MdPeople } from 'react-icons/md';

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

    const activeCount = props.forAuthenticatedUsers?"":`${props.activeMem}`;

    return (
        
            <div className="ChatHeader h-100 row d-flex flex-row align-items-center card">
                    <div className="col-10 d-flex justify-content-center align-items-center">
                        <IconContext.Provider value={{size: "1.5em", color: "blue"}}>
                            <button className="btn" onClick={handlePrev}><MdNavigateBefore/></button>
                        </IconContext.Provider>
                        <IconContext.Provider value={{size: "1.5rem", color: "green"}}>
                            {props.groupName} <span className='ms-3'><MdPeople/></span>{activeCount}
                        </IconContext.Provider>
                        <IconContext.Provider value={{size: "1.5em", color: "blue"}}>
                            <button className="btn" onClick={handleNext}><MdNavigateNext/></button>
                        </IconContext.Provider>
                    </div>
                <div className="col-2 d-flex justify-content-end">
                    <IconContext.Provider value={{size: "1.5rem", color: "red"}}>
                        <button className="btn" onClick={handleClose}><MdClose/></button>
                    </IconContext.Provider>
                </div>
            </div>
        
    )
}