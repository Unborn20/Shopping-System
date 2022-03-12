'use strict';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

/**
 * 
 * @param {*} credentials 
 * @returns Response object
 */
export async function login(credentials){
    const { email, password } = credentials;
    try{
        const user = await User.findOne({attributes: ['password'], where: {email} });
        if(!user) return { ok: false, status: 204, data: {msg: 'User doesn\'t exists'}  };        

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return { ok: false, status: 303, data: {msg: 'Password don\'t match'}  };        
        
        const userVerified = await User.findOne({attributes: ['id', 'name', 'roleId'], where: {email} });    
        return {
            ok: true,
            status: 200,
            data: {
                userVerified
            }
        };
    }catch(err){
        throw new Error(err);
    }
}

/**
 * 
 * @param {*} userData 
 * @returns Response object
 */
export async function register(userData){
    const {email, password} = userData;
    try{
        const userExists = await User.findOne({where: {email}});
        
        if(userExists) return { ok: false, status: 204, data: {msg: 'This user exists already'} };

        const hashPassword = await bcrypt.hash(password, 10);
        userData = {...userData, password: hashPassword, roleId: 2};        
        const user = new User(userData);
        await user.save();

        if(!user) return { ok: false, status: 400, data: {msg: 'Can\'t register this user'} };

        return { ok: true, status: 200, data: {msg: 'User registered successfully'} };
    }catch(err){
        throw new Error(err);
    }
}