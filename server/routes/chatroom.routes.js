import { Router } from 'express';

import * as ChatRoomController from '../controllers/chatroom.controller.js';

const router = new Router();

router.post('/id', ChatRoomController.getRoomId);

export function roomMemHandlers(io,socket){
    socket.on("roomMem:in", async (data) => {
        socket.join(`R${data.roomId}`);
        await ChatRoomController.incrementMemCount(data.roomId);
    })
    socket.on("roomMem:out", async (data) => {
        socket.leave(`R${data.roomId}`);
        await ChatRoomController.decrementMemCount(data.roomId);
    })
}

export default router;