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

export async function getGroup(groupId){
    const query = "SELECT * from `table_groups` where `id`=?";
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

export async function getGroups(){
    const query = "select * from `table_groups`";
    try{
        const mysqlConnection = await mysql.createConnection(dbInfo);
        const [rows, fields] = await mysqlConnection.execute(query);
        mysqlConnection.end();
        return rows;
    }
    catch(err){
        throw err;
    }
}

export async function getGroupsByUserId(userId){
    const query = "select `name`, `group_id` from `table_groups` join `group_user_map` on table_groups.`id`=group_user_map.`group_id` where user_id=?";
    const values = [userId];
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