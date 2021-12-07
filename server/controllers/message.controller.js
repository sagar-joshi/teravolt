import {insertMessage} from '../models/message.model.js';

export async function sendMessage(req, res){
    const {receiverId, text} = req.body;
    const senderId = req.user.id;
    try{
        const result = await insertMessage(text, senderId, receiverId);
        res.status(200).send(result);
    }
    catch(err){
        res.status(500).send(err);
    }
}