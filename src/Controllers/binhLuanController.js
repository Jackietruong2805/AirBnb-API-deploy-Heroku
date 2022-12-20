const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const { successCode, failCode, errorCode, createSuccessCode } = require('../ultis/response');


const getBinhLuan = async (req, res) =>{
    try{
        const result = await prisma.BinhLuan.findMany();
        if(result){
            successCode(res, result, "Lấy bình luận thành công");
        }else{
            failCode(res, result, "Lấy bình luận thất bại");
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}

const getBinhLuanbyIdPhong = async (req, res) =>{
    try{
        const {roomId} = req.params;
        const result = await prisma.BinhLuan.findMany({where: {id_phong: +roomId}});
        if(result){
            successCode(res, result, "Lấy lấy danhh sách bình luận có id: " + roomId + " thành công");
        }else{
            failCode(res, result, "Lấy danh sách thất bại");
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}

const createBinhLuan = async (req, res) =>{
    try{
        let data = req.body;
        let {id_nguoidung, id_phong} = data;
        const isUserExist = await prisma.NguoiDung.findFirst({where: {id_nguoidung: +id_nguoidung}});
        const isPhongExist = await prisma.Phong.findFirst({where: {id_phong: +id_phong}});
        const isCommentExist = await prisma.BinhLuan.findFirst({where: {id_nguoidung: +id_nguoidung, id_phong: +id_phong}});
        if(!isCommentExist){
            if(isUserExist){
                if(isPhongExist){
                    const result = await prisma.BinhLuan.create({data});
                    createSuccessCode(res, result, "Thêm bình luận thành công");
                }else{
                    failCode(res, isPhongExist, "Phòng có id: " + id_phong + " không tồn tại");
                }
            }else{
                failCode(res, isUserExist, "User có id: " + id_nguoidung + " không tồn tại");
            }
        }else{
            failCode(res, !isCommentExist, "Bình luận đã tồn tại");
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}

const updateBinhLuan = async (req, res) =>{
    try{
        let data = req.body;
        let {userId} = req.params;
        let {id_phong, ngay_binh_luan} = data;
        const isCommentExist = await prisma.BinhLuan.findFirst({where: {
            id_nguoidung: +userId, 
            id_phong: +id_phong
        }});
        if(isCommentExist){
            const result = await prisma.BinhLuan.update({data, where: {
                id_nguoidung_id_phong_ngay_binh_luan: {
                    id_nguoidung: +userId,
                    id_phong: +id_phong, 
                    ngay_binh_luan
                }
            }})
            successCode(res, result, "Cập nhật bình luận thành công");    
        }else{
            failCode(res, isCommentExist, "Bình Luận này không tồn tại");
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }   
}

const deleteBinhLuan = async (req, res) =>{
    try{
        const {userId, roomId} = req.params;
        const {ngay_binh_luan} = req.body;
        const isUserExist = await prisma.BinhLuan.findFirst({where: {id_nguoidung: +userId, id_phong: +roomId}});
        if(isUserExist){
            const result = await prisma.BinhLuan.delete({where: {
                id_nguoidung_id_phong_ngay_binh_luan: {
                    id_nguoidung: +userId,
                    id_phong: +roomId,
                    ngay_binh_luan   
                }
            }})
            successCode(res, result, "Xóa bình luận của user có id: " +userId + " ở phòng có id: " + roomId);
        }else{
            failCode(res, isUserExist, "Bình luận này không tồn tại");
        } 
    }catch(err){
        errorCode(res, err, "lỗi backend");
    }
}



module.exports = {getBinhLuan, createBinhLuan, updateBinhLuan, deleteBinhLuan, getBinhLuanbyIdPhong};