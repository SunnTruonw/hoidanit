import db from '../models';
const bcrypt = require('bcrypt');
const { reject } = require('bcrypt/promises');
const saltRounds = 10;

let createNewUser = async (data) => {
    return new Promise(async (resolve , reject) => {
        try {
             let hashNewPasswordFormBcrypt = await hashNewPassword(data.password);
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

             resolve();
        } catch (error) {
            reject(error);
        }
    })
   
    
}

let hashNewPassword = (password) => {
    return new Promise( async (resolve , reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, saltRounds);
                    resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
        
        
    })
}

let getUserAll = async () =>{
    return new Promise( async(resolve , reject) => {
        try {
            let user = await db.User.findAll();
            resolve(user);
        } catch (error) {
            reject(error);
        }
    })
}
let getUserInfoById = async (userId) => {
    return new Promise(async(resolve , reject) => {
        try {
            let user = db.User.findOne({ id : userId });
            if(user){
                resolve(user);
            }else{
                resolve([]);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let UpdateUserData = (data) => {
    return new Promise(async(resolve , reject) => {
        try {
            let user = await db.User.findOne({ id : data.id});
            if(user){
                user.firstName = data.firstName,
                user.lastName = data.lastName,
                user.address = data.address

                await user.save();

                let allUser = await db.User.findAll();
                resolve(allUser);
            }else{
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    })
}

let deleteById = (id) => { 
    return new Promise(async(resolve , reject) => {
        try {
            let user =await db.User.findOne({
                id  : id
            });
            if(user){
                await user.destroy();
            }
            resolve();

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewUser , getUserAll ,getUserInfoById, UpdateUserData , deleteById
}