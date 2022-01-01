import { Router } from 'express';

import * as ChatRoomController from '../controllers/chatroom.controller.js';

const router = new Router();

router.post('/', ChatRoomController.getRoom);
router.post('/emptyRoomId', ChatRoomController.getRoomId);
router.post('/nextEmptyRoomId', ChatRoomController.getNextRoomId);
router.post('/prevEmptyRoomId', ChatRoomController.getPrevRoomId);

export function roomMemHandlers(io,socket){
    let map = new Map();    //later socketId->roomId can be put on database
    socket.on("roomMem:in", async (data) => {
        socket.join(`R${data.roomId}`);
        const newCount = await ChatRoomController.incrementMemCount(data.roomId);
        io.to(`R${data.roomId}`).emit("mem:in", {memCount: newCount});
        map.set(socket.id, data.roomId);
    })
    socket.on("roomMem:out", async (data) => {
        map.delete(socket.id);
        socket.leave(`R${data.roomId}`);
        const newCount = await ChatRoomController.decrementMemCount(data.roomId);
        io.to(`R${data.roomId}`).emit("mem:out", {memCount: newCount});
        
    })
    socket.on("disconnect", async ()=> {
        const roomId = map.get(socket.id);
        if(roomId !== undefined){
            map.delete(socket.id);
            socket.leave(`R${roomId}`);
            const newCount = await ChatRoomController.decrementMemCount(roomId);
            io.to(`R${roomId}`).emit("mem:out", {memCount: newCount});
        }
    })
}

export default router;