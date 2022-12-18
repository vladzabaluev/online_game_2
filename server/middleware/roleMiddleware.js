const { secret } = require("../config/config");
const jwt = require('jsonwebtoken')

module.exports = function(roles){
    return function (req, res, next) { 
        if(req.method == "OPTIONS"){
            next()
        }
    
        try{
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
               
                return res.status(403).json({message: "Пользователь не авторизован"})
            }
            const {roles: userRoles} = jwt.verify(token, secret)
            let hasRole = false;
            console.log(userRoles);
            userRoles.forEach(role => {
                if(roles.includes(role)){
                    hasRole = true;
                }
            })
            if(!hasRole){
                return res.status(403).json({message: "К сожалению, у вас нет доступа"})
            }
            next()
        } catch(e){
            console.log(e) 
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
     }
}; 