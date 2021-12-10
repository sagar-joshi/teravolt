import {insertMessage, getMessages} from '../models/message.model.js';
import {getGroupsByUserId} from '../models/group.model.js';

export async function ensureAuthorizedToSendMessages(req, res, next){
    const senderId = req.user.id;
    const receiverId = req.body.receiverId
    try{
        if(await isMember(senderId, receiverId)){
            next();
        }else{
            res.status(403).send("Sender is not a member of the group");
        }
    }
    catch(err){
        res.status(500).send(err);
    }
}

async function isMember(userId, groupId){
    try{
        const groups = await getGroupsByUserId(userId);
        for(const element of groups){
            if(element.group_id===groupId){
                return true;
            }else{
                return false;
            }
        }
    }
    catch(err){
        throw err;
    }
}

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

export async function getMessagesByGroupId(req, res){
    const groupId = req.body.groupId;
    try{
        const result = await getMessages(groupId);
        res.status(200).send(result);
    }
    catch(err){
        res.status(500).send(err);
    }
}