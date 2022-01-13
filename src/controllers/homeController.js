const db = require("../models")
import res from 'express/lib/response';
import CRUDService from '../services/CRUDService';


let index = async(req , res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage',{
            data :JSON.stringify(data)
        })     

    } catch (error) {
        console.log(error);
    }

    
}
//[GET] /crud
let getCrud = (req ,res) => {
    

    return res.render('crud')
}
//[POST] /post-crud
let postCrud = async (req ,res) => {
   let message =  await CRUDService.createNewUser(req.body);
   console.log(message);
    res.json(req.body)
}

//[GET] /get-crud
let indexCrud = async (req ,res) => {
    let data = await CRUDService.getUserAll();
     return res.render('index-crud',{
         data : data
     })
 }

//[GET] /edit-crud
let editCrud = async (req ,res) => {
    let userId = req.query.id;
    if(userId){
        let userData = await CRUDService.getUserInfoById(userId);
        res.render('edit-crud',{
            user : userData
        });
    }else{
        return res.send('ERROR !!!')
    }
    //  return res.render('edit-crud',{
    //      datas : datas
    //  })
 }

 //[PUT] /update-crud
 let updateCrud = async(req ,res) => {
    let dataUser = req.body;
    let allUser = await CRUDService.UpdateUserData(dataUser);
    return res.render('index-crud',{
        data : allUser,
        raw  :true
    })
 }

//[DELETE] //delete-crud

let deleteCrud = async(req ,res) => {
    let id = req.query.id;
    if(id){
         await CRUDService.deleteById(id);
         return res.send('Delete successfully !')
    }
    else{
        return res.send('error !')
    }
   

    
}
module.exports = {
    index,
    getCrud ,
    postCrud ,
    indexCrud,
    editCrud,
    updateCrud,
    deleteCrud,
}

