const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { successCode, failCode, errorCode, createSuccessCode } = require("../ultis/response");

const getUsers = async (req, res) => {
    try{
        const result = await prisma.NguoiDung.findMany();
        if(result){
            successCode(res, result, "Lấy danh sách users thành công");
        }else{
            failCode(res, result, "Lấy danh sách users thất bại");
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
};

const createUser = async (req, res) =>{
    try{
        const data = req.body;
        const {email, phone} = data;
        const checkEmail = await prisma.NguoiDung.findFirst({where: {email}});
        const checkPhone = await prisma.NguoiDung.findFirst({where: {phone}});
        if(!checkEmail){
            if(!checkPhone){
                const result = await prisma.NguoiDung.create({data});
                if(result){
                    createSuccessCode(res, result, "Thêm user thành công");
                }else{
                    failCode(res, result, "thêm user thất bại");
                }
            }else{
                failCode(res, !checkPhone, "Số điện thoại này đã tồn tại");
            }
        }else{
            failCode(res, !checkEmail, "Email này đã tồn tại");
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}

const getUserById = async (req, res) =>{
    try{
        const {id} = req.params;
        const result = await prisma.NguoiDung.findFirst({where: {id_nguoidung: +id}});
        if(result){
            successCode(res, result, "Lấy user thành công");
        }else{
            failCode(res, result, "Lấy user thất bại");
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}

const updateUser = async (req, res) =>{
    try{
        const {id} = req.params;
        const data = req.body;
        const {email, phone} = data;
        const checkUser = await prisma.NguoiDung.findFirst({where: {id_nguoidung: +id}});
        const checkEmail = await prisma.NguoiDung.findMany({where: {OR: {email} ,NOT: {id_nguoidung: +id}}});
        const checkPhone = await prisma.NguoiDung.findMany({where: {OR:{phone}, NOT: {id_nguoidung: +id}}});
        if(checkUser){
            if(checkEmail.length === 0){
                if(checkPhone.length === 0){
                    const result = await prisma.NguoiDung.update({data, where: {id_nguoidung: +id}});
                    if(result){
                        successCode(res, result, "Cập nhật user thành công");
                    }else{
                        failCode(res, result, "Cập nhật user thất bại");
                    }
                }else{
                    failCode(res, !checkPhone, "Số điện thoại này đã tồn tại");
                }
            }else{
                failCode(res, !checkEmail, "Email này đã tồn tại");
            }
        }else{
            failCode(res, checkUser, "Không tồn tại user có id: " + id);
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}

const deleteUser = async (req, res) =>{
    try{
        const id = req.query.id;
        const checkUser = await prisma.NguoiDung.findFirst({where: {id_nguoidung: +id}});
        if(checkUser){
            const result = await prisma.NguoiDung.delete({where: {id_nguoidung: +id}});
            successCode(res, result, "Xóa user thành công");
        }else{
            failCode(res, null, "Xóa user thất bại");
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}
const searchUserName = async (req, res) =>{
    try{
        const {userName} = req.params;
        const result = await prisma.NguoiDung.findFirst({where: {name: {contains: `${userName}`}}});
        if(result){
            successCode(res, result, "Tìm thấy tên thành công");
        }else{
            failCode(res, result, "Tìm thấy tên thất bại");
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    } 
}

const uploadUserAvatar = async(req, res) =>{
    try{
        const {id_nguoidung} = req.query;
        const isUserExist = await prisma.NguoiDung.findFirst({where: {id_nguoidung: +id_nguoidung}});
        if(isUserExist){
            const fs = require("fs");
            fs.readFile(process.cwd() + "/" + req.file.path, async (err, data) => {
                let fileName = `"data:${req.file.mimetype};base64,${Buffer.from(data).toString("base64")}"`;
                fs.unlinkSync(process.cwd() + "/" + req.file.path);
                await prisma.NguoiDung.update({data: {image: fileName}, where: {id_nguoidung: +id_nguoidung}})
                res.send(fileName);
              })
        }else{
            failCode(res, isUserExist, "Không tồn tại người dùng có id: " + id_nguoidung);
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}

const paginationUser = async (req, res) =>{
    try{
        const {pageIndex, pageSize, keyword} =  req.query;
        const result = await prisma.NguoiDung.findMany({
            skip: +pageSize*+pageIndex - +pageSize,
            take: +pageSize,
            where: {
                name: {
                    contains: keyword
                }
            }
        })
        if(result){
            successCode(res, result, "Lấy thông tin người dùng thành công");
        }else{
            failCode(res, result, "Lấy thông tin người dùng thất bại");
        }
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}

module.exports = {getUsers, createUser, getUserById, updateUser, deleteUser, searchUserName, uploadUserAvatar, paginationUser}