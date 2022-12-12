const { response } = require('express');
const express = require('express');
const binhLuanRoute = express.Router();
const {getBinhLuan, createBinhLuan, updateBinhLuan, deleteBinhLuan, getBinhLuanbyIdPhong} = require('../Controllers/binhLuanController');
const {checkToken} = require('../Middlewares/auth');
const {failToken} = require('../ultis/response');

binhLuanRoute.get('/binh-luan', getBinhLuan);
binhLuanRoute.get('/binh-luan/lay-binh-luan-theo-phong/:roomId', getBinhLuanbyIdPhong);
binhLuanRoute.post('/binh-luan', (req, res, next)=>{
    const{auth} = req.headers;
    try{
        if(checkToken(auth)){
            next();
        }
    }catch(err){
        failToken(res, "Token không hợp lệ !");
    }
}, createBinhLuan);

binhLuanRoute.put('/binh-luan/:userId', (req, res, next)=>{
    const {auth} = req.headers;
    try{
        if(checkToken(auth)){
            next();
        }
    }catch(err){
        failToken(res, "Token không hợp lệ");
    }
}, updateBinhLuan);

binhLuanRoute.delete('/binh-luan/:userId/:roomId', (req, res, next)=>{
    const {auth} = req.headers;
    try{
        if(checkToken(auth)){
            next();
        }
    }catch(err){
        failToken(res, "Token không hợp lệ");
    }
} ,deleteBinhLuan);

module.exports = binhLuanRoute