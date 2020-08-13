import User from "../models/userEntity";
import Admin from "../models/adminEntity";
import HttpException from "../../dist/exceptions/HttpException";

class BaseController {
    static verifyToken = function verifyToken(token: any) {
        return new Promise((resolve, reject) => {
            if (!token) return reject(new HttpException(500, -1, "token 为空"));
            User.findOne({
                where: {
                    token: token
                },
                attributes: {
                    exclude: ["password"]
                }
            }).then(res => {
                if (res) {
                    let userData: any = res;
                    resolve(userData);
                } else {
                    reject(new HttpException(500, -10023, "token失效"));
                }
            }).catch(err => {
                reject(new HttpException(500, -1, err));
            });
        })
    }

    static verifyAdminTokenn = function verifyAdminToken(token: any) {
        return new Promise((resolve, reject) => {
            if (!token) return reject(new HttpException(500, -1, "token 为空"));
            Admin.findOne({
                where: {
                    token: token
                },
                attributes: {
                    exclude: ["password"]
                }
            }).then(res => {
                if (res) {
                    let userData: any = res;
                    resolve(userData);
                } else {
                    reject(new HttpException(500, -10023, "token失效"));
                }
            }).catch(err => {
                reject(new HttpException(500, -1, err));
            });
        })
    }
}

export default BaseController;