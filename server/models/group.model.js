import mysql from 'mysql2/promise';

import { dbInfo } from "../utils/dbInfo.js";

export async function insertGroup(name, createrId){
    const query = "INSERT INTO `table_groups` (`name`) VALUES (?)";
    const values = [name];
    try{
        const mysqlConnection = await mysql.createConnection(dbInfo);
        const [rows, fields] = await mysqlConnection.execute(query, values);
        mysqlConnection.end();
        return rows;
        // rows format for insert queries
        // ResultSetHeader {
        //     fieldCount: 0,
        //     affectedRows: 1,
        //     insertId: 9,
        //     info: '',
        //     serverStatus: 2,
        //     warningStatus: 0
        // }
    }
    catch(err){
        throw err;
    }
}

export async function insertMember(groupId, userId){
    const query = "INSERT INTO `group_user_map` (`group_id`, `user_id`) VALUES (?, ?)"
    const values = [groupId, userId]
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