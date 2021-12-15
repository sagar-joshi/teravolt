
export function ChatHeader(props){
    const handleClose = ()=>{
        props.closeChatBox();
    }
    return (
        <div className="ChatHeader h-100 row">
            <div className="col-11 d-flex justify-content-center">
                {props.groupName}
            </div>
            <div className="col-1 d-flex justify-content-end">
                <button className="btn btn-close" onClick={handleClose}></button>
            </div>
        </div>
    )
}