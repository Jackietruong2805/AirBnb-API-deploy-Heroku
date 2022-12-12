const jwt = require('jsonwebtoken');

// mã hóa dữ liệu thành token
const encodeToken = (data) =>{
    const token = jwt.sign({data}, "AirBnb", {expiresIn: "1200s"});
    return token;
}

// kiểm tra token có hợp lệ hay không
const checkToken = (token) =>{
    const verifyToken = jwt.verify(token, "AirBnb");

    if(verifyToken){
        return verifyToken;
    }else
        return false;
}

// giải mã token
const decode = (token) =>{
    return jwt.decode(token);
}

module.exports = {encodeToken, checkToken, decode}