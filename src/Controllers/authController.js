const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const { successCode, failCode, errorCode, createSuccessCode } = require('../ultis/response');
const bcrypt = require('bcrypt');
const {encodeToken} = require('../Middlewares/auth');

const signUp = async (req, res) =>{
    try{
        let data = req.body;
        const isEmailExist = await prisma.NguoiDung.findFirst({where: {email: data.email}});
        const isPhoneExist = await prisma.NguoiDung.findFirst({where: {phone: data.phone}});
        if(!isEmailExist){
            if(!isPhoneExist){
                const hashPassword = bcrypt.hashSync(data.pass_word, 10);
                data = {...data, pass_word: hashPassword};
                const result = await prisma.NguoiDung.create({data});
                successCode(res, result, "Đăng ký thành công");
            }else{
                failCode(res, "", "Số điện thoại này đã tồn tại");
            }
        }else{
            failCode(res, "", "Email này đã tồn tại");
        } 
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}

const signIn = async (req, res) =>{
    try{
        let data = req.body;
        const isEmailValid = await prisma.NguoiDung.findFirst({where: {email: data.email}});
        if(isEmailValid){
            const isPasswordValid = bcrypt.compareSync(data.pass_word, isEmailValid.pass_word);
            if(isPasswordValid){
                const token = encodeToken(data);
                successCode(res, token, "Đăng nhập thành công");
            }else{
                failCode(res, isPasswordValid, "Mật khẩu không hợp lệ");
            }
        }else{
            failCode(res, isEmailValid, "Email không hợp lệ");
        } 
    }catch(err){
        errorCode(res, err, "Lỗi backend");
    }
}

module.exports = {signUp, signIn}