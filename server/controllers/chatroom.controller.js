import { insertRoom, updateRoom, findEmptyRoomId, findRoomById, findNextRoomId, findPrevRoomId } from '../models/chatroom.model.js';

export async function incrementMemCount(roomId){
    try{
        const room = await findRoomById(roomId);
        updateRoom(roomId, room.member_count + 1);
    }
    catch(err){
        console.log(err);   //to be fixed later
    }
}

export async function decrementMemCount(roomId){
    try{
        const room = await findRoomById(roomId);
        updateRoom(roomId, room.member_count - 1);
    }
    catch(err){
        console.log(err);   //to be fixed later
    }
}

export async function getRoom(req, res) {
    const roomId = req.body.roomId;
    try{
        const room = await findRoomById(roomId);
        res.status(200).send(room);
    }
    catch(err){
        res.status(500).send(err);
    }
}

export async function getRoomId(req, res) {
    const maxMembers = req.body.maxMembers;
    try{
        let roomId = await findEmptyRoomId(maxMembers);
        if(roomId === null)
            roomId = await insertRoom(maxMembers);
        res.status(200).send({roomId:roomId});
    }
    catch(err){
        res.status(500).send(err);
    }
}

export async function getNextRoomId(req, res) {
    let roomId = req.body.roomId;
    try{
        roomId = await findNextRoomId(roomId);
        res.status(200).send({roomId:roomId});
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

export async function getPrevRoomId(req, res) {
    let roomId = req.body.roomId;
    try{
        roomId = await findPrevRoomId(roomId);
        res.status(200).send({roomId:roomId});
    }
    catch(err){
        res.status(500).send(err);
    }
}