const express = require('express');
const viTriRoute = express.Router();
const {getviTri, createVitri, getVitriById, updateVitri, deleteVitri, uploadVitriImg, paginationviTri} = require('../Controllers/viTriController');
const upload = require("../Middlewares/upload");
const {failToken} = require('../ultis/response');
const {checkToken} = require('../Middlewares/auth');

viTriRoute.get('/vi-tri/phan-trang-tim-kiem', paginationviTri);

viTriRoute.get('/vi-tri', getviTri);

viTriRoute.post('/vi-tri', (req, res, next) =>{
    try{
        const {auth} = req.headers;
        if(checkToken(auth)){
            next();
        }
    }catch(err){
        failToken(res, "Token không hợp lệ !");
    }
} ,createVitri);
viTriRoute.post('/vi-tri/upload-hinh-vitri', (req, res, next) =>{
    try{
        const {auth} = req.headers;
        if(checkToken(auth)){
            next();
        }
    }catch(err){
        failToken(res, "Token không hợp lệ !");
    }
} ,upload.single("imgVitri"), uploadVitriImg);

viTriRoute.get('/vi-tri/:id', getVitriById);

viTriRoute.put('/vi-tri/:id', (req, res, next) =>{
    try{
        const {auth} = req.headers;
        if(checkToken(auth)){
            next();
        }
    }catch(err){
        failToken(res, "Token không hợp lệ !");
    }
} ,updateVitri);

viTriRoute.delete('/vi-tri/:id', (req, res, next) =>{
    try{
        const {auth} = req.headers;
        if(checkToken(auth)){
            next();
        }
    }catch(err){
        failToken(res, "Token không hợp lệ !");
    }
} ,deleteVitri);


module.exports = viTriRoute;
