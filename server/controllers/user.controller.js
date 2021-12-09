import bcrypt from 'bcrypt';
import {body, validationResult} from 'express-validator';

import { insertUser, getUserByEmail } from "../models/user.model.js";

export async function getUser(email){
    try{
        const user = await getUserByEmail(email);
        if(user.length == 1)
            return user[0];
        else
            return null;
    }
    catch(err){
        throw err;
    }
}

export async function matchPassword(email, password){
    try{
        const user  = await getUser(email);
        const storedhash = user.hash;
        const match =await bcrypt.compare(password, storedhash);
        if(match)
            return true;
        else
            return false;
    }catch(err){
        throw err;
    }
}

export const userValidation = [
    body('email').isEmail().withMessage("invalid email address"),
    body('firstName').isLength({min: 2}).withMessage("min length for first name is 2"),
    body('lastName').isLength({min: 2}).withMessage("min length for last name is 2"),
    body('password').isStrongPassword().withMessage("min len: 8, atleast 1 lowercase, uppercase, number, symbol")
]

export async function createUser(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).send(errors.array());
        return;
    }

    const {firstName, lastName, email, password} = req.body;
    const saltRounds = 12;
    try{
        if(await getUser(email)){
            res.status(400).send(`${email} is already in use`);
            return;
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password,salt);
        const result =await insertUser(email, firstName, lastName, hash);
        res.status(201).send(result);
    }
    catch(err){
        res.status(500).send(err);
    }
}

export async function getAuthenticatedUser(req, res){
    res.status(200).send(req.user);
}