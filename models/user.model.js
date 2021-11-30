import mysql from 'mysql2/promise';

import { dbInfo } from "../utils/dbInfo.js";

export async function insertUser(email,firstName, lastName, hash){
    const query = "INSERT INTO `users` (`email`, `firstName`, `lastName`, `hash`) VALUES (?,?,?,?)";
    const values = [email, firstName, lastName, hash];

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

export async function getUserByEmail(email){
    const query = "SELECT * from `users` WHERE `email` = ?";
    const values = [email];
    try{
        const mysqlConnection = await mysql.createConnection(dbInfo);
        const [rows, fields] = await mysqlConnection.execute(query, values);
        mysqlConnection.end();
        return rows;    // rows is the array of rows returned by the query
    }
    catch(err){
        throw err;
    }
}