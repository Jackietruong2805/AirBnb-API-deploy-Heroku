const successCode = (res, data, message)=>{
    res.status(200).json({
        message,
        content: data
    })
}

const createSuccessCode = (res, data, message)=>{
    res.status(201).json({message, content: data});
}

const failCode = (res, data, message)=>{
    res.status(400).json({
        message,
        content: data
    })
}

const errorCode = (res, err, message)=>{
    res.status(500).send("Lỗi: " + err, message)
}

const failToken = (res, message) =>{
    res.status(401).send(message);
}


module.exports = {
    successCode,
    failCode,
    errorCode,
    createSuccessCode,
    failToken
}