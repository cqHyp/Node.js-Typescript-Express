import User from "../models/userEntity";

class BaseController {
    static verifyToken = function verifyToken(token:any) {
        return new Promise((resolve, reject) => {
            if(!token) return reject("token 为空");
            User.findOne({
                where: {
                    token: token
                }
            }).then(res => {
                if (res) {
                    let userData:any = res;
                    resolve(userData);
                } else {
                    reject("用户不存在");
                }
            }).catch(err => {
                reject(err);
            });
        })
    }
}

export default BaseController;