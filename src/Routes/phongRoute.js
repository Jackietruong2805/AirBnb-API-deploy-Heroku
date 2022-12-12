const express = require('express');
const phongRoute = express.Router();
const {getPhong, createPhong, getPhongByVitri, getPhongById, updatePhong, deletePhong, uploadPhongImg, paginationPhong} = require('../Controllers/phongController');
const upload = require("../Middlewares/upload");
const {failToken} = require('../ultis/response');
const {checkToken} = require('../Middlewares/auth');

phongRoute.get('/phong-thue/phan-trang-tim-kiem', paginationPhong);
phongRoute.get('/phong-thue', getPhong);
phongRoute.post('/phong-thue', (req, res, next)=>{
    try{
        const {auth} = req.headers;
        if(checkToken(auth)){
            next();
        }
    }catch(err){
        failToken(res, "Token không hợp lệ");
    }
} ,createPhong);
phongRoute.post('/phong-thue/upload-hinh-phong', (req, res, next)=>{
    try{
        const {auth} = req.headers;
        if(checkToken(auth)){
            next();
        }
    }catch(err){
        failToken(res, "Token không hợp lệ");
    }
}, upload.single("imgPhong"), uploadPhongImg);
phongRoute.get('/phong-thue/lay-phong-theo-vi-tri', getPhongByVitri);
phongRoute.get('/phong-thue/:id', getPhongById);
phongRoute.put('/phong-thue/:id', (req, res, next)=>{
    try{
        const {auth} = req.headers;
        if(checkToken(auth)){
            next();
        }
    }catch(err){
        failToken(res, "Token không hợp lệ");
    }
} ,updatePhong);

phongRoute.delete('/phong-thue/:id', (req, res, next)=>{
    try{
        const {auth} = req.headers;
        if(checkToken(auth)){
            next();
        }
    }catch(err){
        failToken(res, "Token không hợp lệ");
    }
}, deletePhong);

module.exports = phongRoute;