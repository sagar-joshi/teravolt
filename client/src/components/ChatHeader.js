import { IconContext } from 'react-icons/lib';
import {ax} from '../utils/axios.config.js';
import { MdClose, MdNavigateNext, MdNavigateBefore, MdPeople } from 'react-icons/md';

export function ChatHeader(props){

    const handleClose = ()=>{
        props.decrementActiveMemCount();
        props.closeChatBox();
    }

    const handleNext = ()=>{
        ax.post('/room/nextEmptyRoomId', {
            roomId: props.groupId,
        })
        .then((res) => {
            if(props.groupId !== res.data.roomId){
                props.decrementActiveMemCount();
                props.updateChatRoomId(res.data.roomId);
                props.focusInput();
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handlePrev = ()=>{
        ax.post('/room/prevEmptyRoomId', {
            roomId: props.groupId,
        })
        .then((res) => {
            if(props.groupId !== res.data.roomId){
                props.decrementActiveMemCount();
                props.updateChatRoomId(res.data.roomId);
                props.focusInput();
            }
        })
        .catch((err) => {
            console.log(err);
        })
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