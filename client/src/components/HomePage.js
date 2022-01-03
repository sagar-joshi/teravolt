import { useState } from 'react';
import slide1 from '../images/slide1.webp';
import slide2 from '../images/slide2.webp';
import { ax } from '../utils/axios.config';
import { ChatBox } from './ChatBox';
import './HomePage.css';

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

    const updateChatRoomId = (id) => {
        setChatRoomId(id);
    }

    return(
        (chatRoomId !== null)?<ChatBox groupId={chatRoomId} type="unAuthenticated" updateChatRoomId={updateChatRoomId} closeChatBox={closeChatBox} nickName={nickName}/>:
        <div className='h-100'>
            <div id="carouselExampleInterval" className="carousel slide h-60" data-bs-ride="carousel">
                <div className="carousel-inner h-100">
                    <div className="carousel-item active h-100" data-bs-interval="4000">
                        <img src={slide1} className="d-block w-100 h-100" alt="Securely chat with strangers anonymously"/>
                    </div>
                    <div className="carousel-item h-100" data-bs-interval="4000">
                        <img src={slide2} className="d-block w-100 h-100" alt="Get started instantly, no registration required"/>
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
            <div className='d-flex flex-column align-items-center h-40 '>
                <h5 className='color-grey'>Dont want to register ?</h5>
                <div className='m-2'>
                    <input className="nickNameInput" type="text" placeholder='    Type nickname here' value={nickName} onChange={handleNickNameChange}></input>
                </div>
                <h8 className='color-grey'>and start chatting with random people</h8>
                <div className='m-2'>
                    <button id='btn-1-on-1-chat' className='btn btn-primary me-2' onClick={handleEnterOneOneChatRoom}>1 on 1 Chat</button>
                    <button id='btn-group-chat' className='btn btn-primary ms-2' onClick={handleEnterGroupChatRoom}>Group Chat</button>
                </div>                
            </div>
        </div>
    );
}