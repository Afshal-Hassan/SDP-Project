function baseResponse(data, status, message, errorName) {
    return {
        body: data,
        meta: {
            status: status, 
            message: message, 
            errorName: errorName? errorName: null, 
        }
    }
}


module.exports = baseResponse