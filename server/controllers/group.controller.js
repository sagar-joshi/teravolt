import { insertGroup, insertMember, getGroup, getGroupsByUserId } from "../models/group.model.js";

export async function createGroup(req, res){
    const {name} = req.body;
    const createrId = req.user.id;
    try{
        const groups =await insertGroup(name);
        if(groups.affectedRows == 1){
            const groupId = groups.insertId;
            await insertMember(groupId, createrId);
            res.status(200).send();
        }
    }
    catch(err){
        res.status(500).send(err);
    }
}

export async function addMember(req, res){
    const {groupId} = req.body;
    const userId = req.user.id;
    try{
        const result =await insertMember(groupId, userId);
        res.status(200).send(result);
    }
    catch(err){
        res.status(500).send(err);
    }
}

export async function getUserGroups(req, res){
    const userId = req.body.id;
    try{
        const groupList = await getGroupsByUserId(userId);
        res.status(200).send(groupList);
    } 
    catch(err){
        res.status(500).send(err);
        console.log(err)
    }
}

export async function getGroupByGroupId(req, res){
    const {groupId} = req.body;
    try{
        const group = await getGroup(groupId);
        res.status(200).send(group);
    } 
    catch(err){
        res.status(500).send(err);
    }
}