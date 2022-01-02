import mysql from 'mysql2/promise';

import { dbInfo } from "../utils/dbInfo.js";

export async function insertRoom(maxMembers){
    const query = "INSERT INTO `chat_rooms` (`member_count`, `max_members`) VALUES (?, ?)";
    const values = [0, maxMembers];
    try{
        const mysqlConnection = await mysql.createConnection(dbInfo);
        const [rows, fields] = await mysqlConnection.execute(query, values);
        mysqlConnection.end();
        return rows.insertId;
    }
    catch(err){
        throw err;
    }
}

export async function updateRoom(roomId, memberCount){
    const query = "UPDATE `chat_rooms` SET `member_count` = ? WHERE `room_id` = ?";
    const values = [memberCount, roomId];
    try{
        const mysqlConnection = await mysql.createConnection(dbInfo);
        const [rows, fields] = await mysqlConnection.execute(query, values);
        mysqlConnection.end();
        return rows;
    }
    catch(err){
        throw err;
    }
}

export async function findRoomById(roomId){
    const query = "SELECT * FROM `chat_rooms` WHERE `room_id` = ?";
    const values = [roomId];
    try{
        const mysqlConnection = await mysql.createConnection(dbInfo);
        const [rows, fields] = await mysqlConnection.execute(query, values);
        mysqlConnection.end();
        return rows[0];
    }
    catch(err){
        throw err;
    }
}

export async function findNextRoomId(roomId){
    const room = await findRoomById(roomId);
    const maxMembers = room.max_members;
    const query = "SELECT * FROM `chat_rooms` WHERE `room_id` > ? AND `max_members` = ? AND `member_count` < `max_members` LIMIT 1";
    const values = [roomId, maxMembers];
    try{
        const mysqlConnection = await mysql.createConnection(dbInfo);
        const [rows, fields] = await mysqlConnection.execute(query, values);
        mysqlConnection.end();
        if(rows.length === 0)
            return roomId;
        else
            return rows[0].room_id;
    }
    catch(err){
        throw err;
    }
}

export async function findPrevRoomId(roomId){
    const room = await findRoomById(roomId);
    const maxMembers = room.max_members;
    const query = "SELECT * FROM `chat_rooms` WHERE `room_id` < ? AND `max_members` = ? AND `member_count` < `max_members` ORDER BY `room_id` DESC LIMIT 1";
    const values = [roomId, maxMembers];
    try{
        const mysqlConnection = await mysql.createConnection(dbInfo);
        const [rows, fields] = await mysqlConnection.execute(query, values);
        mysqlConnection.end();
        if(rows.length === 0)
            return roomId;
        else
            return rows[0].room_id;
    }
    catch(err){
        throw err;
    }
}

export async function findEmptyRoomId(maxMembers){
    const query = "SELECT `room_id` from `chat_rooms` WHERE `max_members` = ? AND `member_count` < `max_members` LIMIT 1";
    const values = [maxMembers];
    try{
        const mysqlConnection = await mysql.createConnection(dbInfo);
        const [rows, fields] = await mysqlConnection.execute(query, values);
        mysqlConnection.end();
        if(rows.length === 0)
            return null;
        else
            return rows[0].room_id;
    }
    catch(err){
        throw err;
    }
}