const {PrismaClient} = require('@prisma/client');
const { successCode, failCode, errorCode, createSuccessCode } = require('../ultis/response');
const prisma = new PrismaClient();

const getDatPhong = async (req, res) =>{
    try{
        const result = await prisma.DatPhong.findMany();
        if(result){
            successCode(res, result, "Lấy thông tin đặt phòng thành công");
        }else{
            failCode(res, result, "Lấy thông tin đặt phòng thất bại");
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}


const getDatPhongByUserId = async (req, res) =>{
    try{
        const {userId} = req.params;
        const result = await prisma.DatPhong.findFirst({where: {id_nguoidung: +userId}});
        if(result){
            successCode(res, result, "Lấy user có id: " + userId + " thành công");
        }else{  
            failCode(res, result, "Không tồn tại user có id: " +userId);
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    } 
}

const getDatPhongById = async (req, res) =>{
    try{
        const {id_nguoidung, id_phong} = req.params;
        const result = await prisma.DatPhong.findFirst({where: {id_nguoidung: +id_nguoidung, id_phong: +id_phong}});
        if(result){
            successCode(res, result, "Lấy Phòng đặt thành công");
        }else{
            failCode(res, result, "Lấy đặt phòng thất bại");
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}

const createDatPhong = async (req, res) =>{
    try{
        let data = req.body;
        const {id_nguoidung, id_phong, ngay_den, ngay_di} = data;
        ngayDenFormat = new Date(ngay_den);
        ngayDiFormat = new Date(ngay_di);
        data = {...data, ngay_den: ngayDenFormat, ngay_di: ngayDiFormat};
        const checkIdUser = await prisma.NguoiDung.findFirst({where: {id_nguoidung: +id_nguoidung}});
        const checkIdPhong = await prisma.Phong.findFirst({where: {id_phong: +id_phong}});
        const isIdAlReadyExist = await prisma.DatPhong.findFirst({where: {id_nguoidung: +id_nguoidung, id_phong: +id_phong}});
        if(!isIdAlReadyExist){
            if(checkIdUser){
                if(checkIdPhong){
                    const result = await prisma.DatPhong.create({data});
                    createSuccessCode(res, result, "Thêm đặt phòng thành công");
                }else{
                    failCode(res, checkIdPhong, "Phòng có id: " + id_phong + " không tồn tại");
                }
            }else{
                failCode(res, checkIdUser, "Người Dùng có id: " + id_nguoidung + " không tồn tại");
            }
        }else{
            failCode(res, isIdAlReadyExist, "Đặt Phòng đã tồn tại");
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}



const updateDatPhong = async (req, res) =>{
    try{
        const {id} = req.params;
        let data = req.body;
        let {id_nguoidung, id_phong, ngay_den, ngay_di} = data;
        data = {...data, ngay_di: new Date(ngay_di), ngay_den: new Date(ngay_den)};
        const isPhongExist = await prisma.Phong.findFirst({where: {id_phong: +id}});
        const isDatPhongExist = await prisma.DatPhong.findFirst({where: {id_nguoidung: +id_nguoidung, id_phong: +id_phong}});
        if(isPhongExist){
            if(isDatPhongExist){
                const result = await prisma.DatPhong.update({where: {
                    id_nguoidung_id_phong:{
                        id_phong: +id_phong, 
                        id_nguoidung: +id_nguoidung
                    }
                }, data});
                successCode(res, result, "Cập nhật đặt phòng thành công");
            }else{
                failCode(res, isDatPhongExist, "Đặt phòng không tồn tại");
            }        
        }else{
            failCode(res, isPhongExist, "Phòng không tồn tại");
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}

const deleteDatPhong = async (req, res) =>{
    try{
        const {userId, roomId} = req.params;
        const isDatPhongExist = await prisma.DatPhong.findFirst({where: {
            id_nguoidung: +userId,
            id_phong: +roomId
        }});
        if(isDatPhongExist){
            const result = await prisma.DatPhong.delete({where: {
                id_nguoidung_id_phong: {
                    id_nguoidung: +userId, 
                    id_phong: +roomId
                }
            }});
            successCode(res, result, "Xóa đặt phòng thành công");
        }else{
            failCode(res, isDatPhongExist, "Đặt phòng này không tồn tại");
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}

module.exports = {getDatPhong, createDatPhong, getDatPhongById, getDatPhongByUserId, updateDatPhong, deleteDatPhong}