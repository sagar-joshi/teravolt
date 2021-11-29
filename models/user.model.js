import mysql from 'mysql2/promise';

import { dbInfo } from "../utils/dbInfo.js";

export async function insertUser(email,firstName, lastName, salt, hash){
    const query = "INSERT INTO `users` (`email`, `firstName`, `lastName`, `salt`, `hash`) VALUES (?,?,?,?,?)";
    const values = [email, firstName, lastName, salt, hash];

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

export async function findUserByEmail(email){
    const query = "SELECT `email`, `firstName`, `lastName` from `users` WHERE `email` = ?";
    const values = [email];
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