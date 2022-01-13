const bcrypt = require('bcrypt');
import { reject } from 'bcrypt/promises';
import res from 'express/lib/response';
import db from '../models';
const saltRounds = 10;

//LOGIN
let handleUserLogin = (email , password) => {
    return new Promise(async(resolve , reject) => {
        try {
            let userData = {};
            let isExits = await checkEmail(email);
            //tra ve true tuc la email co trong db
            if(isExits){
                let user = await db.User.findOne({
                    where : { email : email },
                    attributes : ['email' , 'roleId' , 'password', 'firstName' , 'lastName'],
                    raw : true,
                })
                if(user){
                    //comparePassword
                    let checkPassword = bcrypt.compareSync(password, user.password)
                    if(checkPassword){
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        delete user.password;
                        userData.user = user;
                    }else{
                        userData.errCode = 3;
                        userData.errMessage = 'Mat khau sai';
                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = 'Khong tim thay tai khoan cua ban trong he thong .'
                }
            }else{
                userData.errCode = 1;
                userData.errMessage = 'Email hoac mat khau cua ban k ton tai .'
                
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let checkEmail = (email) => {
    return new Promise(async(resolve , reject) => {
        try {
            let user = await db.User.findOne({
                where : {email : email}
            });
            if(user){
                resolve(true);
            }else{
                resolve(false);
            }

        } catch (e) {
            reject(e);
        }
    })
}

//GET ALL DATA -INDEX
let getAllUser = (id) => {
    return new Promise(async(resolve , reject) => {
        try {
            let users = '';
            if(id === 'ALL'){
                 users = await db.User.findAll({
                    attributes : { 
                        exclude : ['password']
                    }
                })
            }
            if(id && id != 'ALL'){
                users = await db.User.findOne({
                    where : {id : id},
                    attributes : { 
                        exclude : ['password']
                    }
                });
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

//POST /api/create-new-user
let createNewUser = (data) => {
    return new Promise(async(resolve , reject) => {
        try {
            //check email da ton tai trong he thong hay chua
            let check = await checkEmail(data.email);
            if(check){
                resolve({
                    errCode : 1 ,
                    errMessage : 'Email cua ban da ton tai '
                });
            }else{
                let hashNewPasswordFormBcrypt = await handleNewPassword(data.password);
                await db.User.create({
                    email : data.email,
                    password : hashNewPasswordFormBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender : data.gender === 1 ? true : false,
                    roleId : data.roleId,
                    phonenumber : data.phonenumber,
                })
                resolve({
                    errCode : 0 ,
                    message : 'Ok'
                });
            }
           
        } catch (e) {
            reject(e);
        }
    })
}

//HASH-PASSWORD
let handleNewPassword = (password) => {
    return new Promise(async(resolve , reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, saltRounds);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

//DELETE
let DeleteUser = (id) => {
    return new Promise(async(resolve , reject) => {
        try {
            let user = await db.User.findOne({
                where : { id : id}
            });
            if(!user){
                resolve({
                    errCode : 2,
                    errMessage : 'User is exist...'
                })
            }

            await db.User.destroy({
                where : {
                    id :id
                }
            });
            resolve({
                errCode: 0,
                message : 'Delete successfully'
            });
        } catch (e) {
            reject(e);
        }
    })
}

let EditUser = (data) => {
    return new Promise(async(resolve , reject) => {
        try {
            if(!data.id){
                resolve({
                    errCode : 2,
                    errMessage : 'Missing required pramster'
                }) 
            }
            let user = await db.User.findOne({
                where : { id : data.id },
                raw : false
            })
            if(user){
                user.firstName = data.firstName,
                user.lastName = data.lastName,
                user.address = data.address

                await user.save();

                resolve({
                    errCode: 0,
                    message : 'Update successfully'
                });
            }else{
                resolve({
                    errCode : 1,
                    errMessage : 'User not found !'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllCodeService = (type) => {
    return new Promise(async(resolve ,reject) => {
        try {
           if(!type){
               return resolve({
                   errCode : 1,
                   errMessage : 'Missing requied parameter'
               })
           }else{
                let res = {};
                let allCode = await db.Allcode.findAll({
                    where : { type : type }
                });
                res.errCode = 0;
                res.data = allCode;
                resolve(res);
           }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin,
    getAllUser,
    createNewUser,
    DeleteUser,
    EditUser,
    getAllCodeService
}