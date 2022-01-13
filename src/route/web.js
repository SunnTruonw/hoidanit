import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/',homeController.index);
    router.get('/crud',homeController.getCrud);
    router.post('/post-crud',homeController.postCrud);
    router.get('/get-crud',homeController.indexCrud);
    router.get('/edit-crud',homeController.editCrud);
    router.post('/update-crud',homeController.updateCrud);
    router.get('/delete-crud',homeController.deleteCrud);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-user', userController.handleGetAllUser);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    router.get('/api/all-code', userController.handleAllCode);

    return app.use('/', router);
}

module.exports = initWebRoutes;