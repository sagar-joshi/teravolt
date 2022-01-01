import { Router } from 'express';

import * as ChatRoomController from '../controllers/chatroom.controller.js';

const router = new Router();

router.post('/', ChatRoomController.getRoom);
router.post('/emptyRoomId', ChatRoomController.getRoomId);
router.post('/nextEmptyRoomId', ChatRoomController.getNextRoomId);
router.post('/prevEmptyRoomId', ChatRoomController.getPrevRoomId);

export function roomMemHandlers(io,socket){
    socket.on("roomMem:in", async (data) => {
        socket.join(`R${data.roomId}`);
        const newCount = await ChatRoomController.incrementMemCount(data.roomId);
        io.to(`R${data.roomId}`).emit("mem:in", {memCount: newCount});
    })
    socket.on("roomMem:out", async (data) => {
        socket.leave(`R${data.roomId}`);
        const newCount = await ChatRoomController.decrementMemCount(data.roomId);
        io.to(`R${data.roomId}`).emit("mem:out", {memCount: newCount});
        
    })
}

export default router;