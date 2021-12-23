import { Router } from 'express';

import * as MessageController from '../controllers/message.controller.js';
import { ensureAuthenticated } from '../utils/auth.js';

const router = new Router();

router.post('/send', ensureAuthenticated,MessageController.ensureAuthorizedToSendMessages, MessageController.sendMessage);
router.post('/getByGroupId', ensureAuthenticated, MessageController.getMessagesByGroupId);

export function msgHandlers(io,socket){
    socket.on("msg:new",async (data)=>{
        const msg = await MessageController.getMsgByMsgId(data.msgId);
        io.to(msg.receiver_id).emit("msg:new", msg);
    })
    socket.on("msg:new:noSave", async (data) => {
        const msg = {sender_id: null, firstName: data.nickName, lastName:'', text: data.text};
        io.to(data.groupId).emit("msg:new", msg);
    })
}

export default router;