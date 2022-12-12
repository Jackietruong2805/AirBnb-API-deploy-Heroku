const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { successCode, failCode, errorCode, createSuccessCode } = require("../ultis/response");

const getviTri = async (req, res) =>{
    try{
        const result = await prisma.ViTri.findMany();
        if(result){
            successCode(res, result, "Lấy thông tin thành công");
        }else{
            failCode(res, result, "Phòng không tồn tại");
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}

const createVitri = async (req, res) => {
    try {
        const data = req.body;
        const result = await prisma.ViTri.create({data});
        if(result){
            createSuccessCode(res, result, "Thêm Vị trí Thành công");
        }else{
            failCode(res, result, "Thêm vị trí thất bại");
        }
    } catch (err) {
        errorCode(res, err, "Lỗi backend");
     }
};

const getVitriById = async (req, res) => {
    try{
        const {id} = req.params;
        const result = await prisma.ViTri.findFirst({where: {id_vitri: +id}});
        if(result){
            successCode(res, result, "Lấy vị trí thành công");
        }else{
            failCode(res, result, "Lấy vị trí thất bại");
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}

const updateVitri = async (req, res) =>{
    try{
        const {id} = req.params;
        const data = req.body;
        const checkVitri = await prisma.ViTri.findFirst({where: {id_vitri: +id}});
        if(checkVitri){
            const result = await prisma.ViTri.update({data, where: {id_vitri: +id}});
            if(result){
                successCode(res, result, "Cập nhật vị trí thành công");
            }else{
                failCode(res, result, "Cập nhật vị trí thất bại");
            }
        }else{
            failCode(res, checkVitri, "Vị trí có id: " + id + " không tồn tại");
        } 
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}

const deleteVitri = async (req, res) => {
    try{
        const {id} = req.params;
        const checkVitri = await prisma.ViTri.findFirst({where: {id_vitri: +id}});
        if(checkVitri){
            const result = await prisma.ViTri.delete({where: {id_vitri: +id}});
            if(result){
                successCode(res, result, "Xóa vị trí thành công");
            }else{
                failCode(res, result, "Xóa vị trí thất bại");
            }   
        }else{
            failCode(res, checkVitri, "Không tồn tại vị trí có id: " + id); 
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}

const uploadVitriImg = (req, res) =>{
    try{
        const fs = require("fs");
        fs.readFile(process.cwd() + "/" + req.file.path, (err, data) => {
            let fileName = `"data:${req.file.mimetype};base64,${Buffer.from(data).toString("base64")}"`;
            fs.unlinkSync(process.cwd() + "/" + req.file.path);
            res.send(fileName);
          })
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}

const paginationviTri = async (req, res) => {
    try{
        const {pageSize, pageIndex, keyword} = req.query;

        const result = await prisma.ViTri.findMany({
            skip: +pageIndex*+pageSize - +pageSize,
            take: +pageSize,
            where: {
                ten_vi_tri: {
                    contains: keyword
                }
            }
        })
        if(result){
            successCode(res, result, "Lấy vị trí thành công");
        }else{
            failCode(res, result, "Lấy vị trí thất bại");
        }
    }catch(err){
        errorCode(res, err, "Lỗi");
    }
}


 
module.exports = {getviTri, createVitri, getVitriById, updateVitri, deleteVitri, uploadVitriImg, paginationviTri}