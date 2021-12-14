import mysql from 'mysql2/promise';

import { dbInfo } from "../utils/dbInfo.js";

export async function insertMessage(text, sender_id, receiver_id){
    const query = "INSERT INTO `messages` (`text`, `sender_id`, `receiver_id`) VALUES (?, ?, ?)";
    const values = [text, sender_id, receiver_id];
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

export async function getMessage(msgId){
    const query = "SELECT messages.`id`, `sender_id`, `receiver_id`, `firstName`, `lastName`, `text` from messages join users ON `sender_id` = users.`id` WHERE messages.`id` = ?";
    const values = [msgId];
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

export async function getMessages(groupId){
    const query = "SELECT messages.`id`, `sender_id`, `receiver_id`, `firstName`, `lastName`, `text` from messages join users ON `sender_id` = users.`id` WHERE `receiver_id` = ? order by messages.`id`";
    const values = [groupId];
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