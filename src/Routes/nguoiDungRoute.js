const express = require('express');
const nguoiDungRoute = express.Router();
const {getUsers, createUser, getUserById, updateUser, deleteUser, searchUserName, uploadUserAvatar, paginationUser} = require('../Controllers/nguoiDungController');
const upload = require("../Middlewares/upload");
const {failToken} = require('../ultis/response');
const {checkToken} = require('../Middlewares/auth')

nguoiDungRoute.get('/users/phan-trang-tim-kiem', paginationUser);
nguoiDungRoute.get('/users', getUsers);
nguoiDungRoute.get('/users/:id', getUserById);
nguoiDungRoute.get('/users/search/:userName', searchUserName);
nguoiDungRoute.post('/users/upload-avatar', (req, res, next)=>{
    try{
        const {auth} = req.headers;
        if(checkToken(auth)){
            next();
        }
    }catch(err){
        failToken(res, "Token không hợp lệ !");
    }
}, upload.single("avatar"), uploadUserAvatar);
nguoiDungRoute.post('/users', createUser);
nguoiDungRoute.put('/users/:id', updateUser);
nguoiDungRoute.delete('/users', deleteUser);

module.exports = nguoiDungRoute; 