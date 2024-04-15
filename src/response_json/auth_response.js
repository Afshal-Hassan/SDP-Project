
function user_response(user, token){
    return {
        user: {
            id: user._id,
            seatNo: user.seatNo,
            first_name: user.fname, 
            last_name: user.lname,
            email: user.email,
        }, 
        token: {
            access: token,
        }
    }
}


module.exports = {user_response}