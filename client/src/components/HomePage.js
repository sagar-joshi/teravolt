import { useState } from 'react';
import slide1 from '../images/slide1.jpg';
import slide2 from '../images/slide2.jpg';
import { ax } from '../utils/axios.config';
import { ChatBox } from './ChatBox';

export function HomePage(props){
    const [nickName, setNickName] = useState('');
    const [chatRoomId, setChatRoomId] = useState(null);

    const handleNickNameChange = (e) => {
        setNickName(e.target.value);
    }

    const handleEnterGroupChatRoom = () => {
        ax.post('/room/emptyRoomId',{maxMembers: 10})
        .then((res) => {
            setChatRoomId(res.data.roomId);
        })
        .catch((err) => {
            console.log(err);   //to be fixed later
        })
    }

    const handleEnterOneOneChatRoom = () => {
        ax.post('/room/emptyRoomId',{maxMembers: 2})
        .then((res) => {
            setChatRoomId(res.data.roomId);
        })
        .catch((err) => {
            console.log(err);   //to be fixed later
        })
    }

    const closeChatBox = () => {
        setChatRoomId(null);
    }

    return(
        (chatRoomId !== null)?<ChatBox groupId={chatRoomId} type="unAuthenticated" closeChatBox={closeChatBox} nickName={nickName}/>:
        <div className='h-100'>
            <div id="carouselExampleInterval" className="carousel slide h-70" data-bs-ride="carousel">
                <div className="carousel-inner h-100">
                    <div className="carousel-item active h-100" data-bs-interval="4000">
                        <img src={slide1} className="d-block w-100 h-100" alt="Chat with Strangers"/>
                    </div>
                    <div className="carousel-item h-100" data-bs-interval="4000">
                        <img src={slide2} className="d-block w-100 h-100" alt="Get started instantly"/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='d-flex flex-column align-items-center h-30 justify-content-center'>
                <div className='m-2'>
                    <input type="text" placeholder='Type nickname here' value={nickName} onChange={handleNickNameChange}></input>
                </div>
                <div className='m-2'>
                    <button className='btn btn-primary me-2' onClick={handleEnterGroupChatRoom}>Enter Group Chat Room</button>
                    <button className='btn btn-primary ms-2' onClick={handleEnterOneOneChatRoom}>Enter 1-1 Chat room</button>
                </div>                
            </div>
        </div>
    );
}