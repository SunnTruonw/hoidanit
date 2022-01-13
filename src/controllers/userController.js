import { reject } from 'bcrypt/promises'
import { resolveInclude } from 'ejs'
import res from 'express/lib/response'
import userService from '../services/userService'

let handleLogin = async(req , res) => {
    let email = req.body.email
    let password = req.body.password

    if(!email || !password){
        res.status(500).json({
            errCode : 1,
            message : 'Email hoac Password khong duoc bo trong'
        })
    }

    let userData = await userService.handleUserLogin(email,password);


    res.status(200).json({
        errCode : userData.errCode,
        message : userData.errMessage,
        user : userData.user ? userData.user : {},
    })
}

let handleGetAllUser = async(req ,res) => {
    let id = req.query.id; //All , id
    if(!id){
        return res.status(200).json({
            errCode : 1,
            errMessage : 'Missing required paramster',
            users : []
        })
    }
    let users = await userService.getAllUser(id);
    return res.status(200).json({
        errCode : 0,
        errMessage : 'Ok',
        users
    })
}

let handleCreateNewUser = async(req, res) => {
    let message =  await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

let handleDeleteUser = async(req ,res) => {
    if(!req.body.id){
       return res.status(200).json({
        errCode : 1,
        message : 'Missing required paramsted'
       })
    }

    let message =  await userService.DeleteUser(req.body.id);
    return res.status(200).json(message);
}

let handleEditUser = async(req ,res) => {
    let message =  await userService.EditUser(req.body);
    return res.status(200).json(message);
}

let handleAllCode = async(req ,res) => {
    try {
            let data = await userService.getAllCodeService(req.query.type);
            return res.status(200).json(data);
        
    } catch (e) {
        return res.status(200).json({
            errCode : -1,
            errMessage : 'ERROR SERVER !!!'
        })
    }
}

module.exports = {
    handleLogin,
    handleGetAllUser,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
    handleAllCode
}