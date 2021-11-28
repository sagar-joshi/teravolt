import bcrypt from 'bcrypt';
import {body, validationResult} from 'express-validator';

import { insertUser } from "../models/user.model.js";

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
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password,salt);
        const result =await insertUser(email, firstName, lastName, salt, hash);
        res.status(201).send(result);
    }
    catch(err){
        res.status(500).send(err);
    }
}