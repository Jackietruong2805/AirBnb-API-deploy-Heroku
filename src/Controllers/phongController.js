const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { successCode, failCode, errorCode, createSuccessCode } = require("../ultis/response");

const getPhong = async (req, res) => {
    try {
        const result = await prisma.Phong.findMany();
        if(result){
            successCode(res, result, "Lấy thông tin thành công");
        }else{
            failCode(res, result, "Không có phòng nào tồn tại");
        }
    } catch (err) {
        errorCode(res, err, "Lỗi backend");
    }
};

const createPhong = async (req, res) => {
    try {
        const data = req.body;
        const result = await prisma.Phong.create({data});
        if(result){
            createSuccessCode(res, result, "Thêm Phòng Thành công");
        }else{
            failCode(res, result, "Thêm phòng thất bại");
        }
    } catch (err) {
        errorCode(res, err, "Lỗi backend");
     }
};

const getPhongByVitri = async (req, res) =>{
    try{
        const {locationId} = req.query;
        const result = await prisma.Phong.findMany({where: {id_vitri: +locationId}});
        if(result){
            successCode(res, result, "Lấy thông tin thành công");
        }else{
            failCode(res, result, "Phòng không tồn tại");
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}

const getPhongById = async (req, res) =>{
    try{
        const {id} = req.params;
        const result = await prisma.Phong.findFirst({where: {id_phong: +id}});
        if(result){
            successCode(res, result, "Lấy thông tin thành công");
        }else{
            failCode(res, result, "Phòng không tồn tại");
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");

    }
}

const updatePhong = async (req, res) =>{
    try{
        const {id} = req.params;
        const data = req.body;
        const checkPhong = await prisma.Phong.findFirst({where: {id_phong: +id}});
        if(checkPhong){
            const result = await prisma.Phong.update({data, where: {id_phong: +id}});
            if(result){
                successCode(res, result, "Cập nhật phòng thành công");
            }else{
                failCode(res, result, "Cập nhật phòng thất bại");
            }
        }else{
            failCode(res, checkPhong, "Phòng có id: " + id + " không tồn tại");
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}

const deletePhong = async (req, res) =>{
    try{
        const {id} = req.params;
        const checkPhong = await prisma.Phong.findFirst({where: {id_phong: +id}});
        if(checkPhong){
            const result = await prisma.Phong.delete({where: {id_phong: +id}});
            if(result){
                successCode(res, result, "Xóa phòng thành công");
            }else{
                failCode(res, result, "Xóa phòng thất bại");
            }
        }else{
            failCode(res, checkPhong, "không tồn tại phòng có id: " + id);
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}

const uploadPhongImg = (req, res) =>{
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

const paginationPhong = async (req, res) =>{
    try{
        const {pageSize, pageIndex, keyword} = req.query;
        const result = await prisma.Phong.findMany({
            skip: +pageSize*+pageIndex - +pageSize,
            take: +pageSize,
            where: {
                ten_phong: {
                    contains: keyword
                }
            }
        });
        if(result){
            successCode(res, result, "Lấy phòng thành công");
        }else{
            failCode(res, result, "Lấy phòng thất bại");
        }   
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}


module.exports = { getPhong, createPhong, getPhongByVitri, getPhongById, updatePhong, deletePhong, uploadPhongImg, paginationPhong};
