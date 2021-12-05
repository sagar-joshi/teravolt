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