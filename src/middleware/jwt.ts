import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import "dotenv/config"
const checkValidToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const path = req.path
        const whiteList = ["/add-product-to-cart", "/login"]
        const checkWhiteList = whiteList.some(route => route === path);
        if (checkWhiteList) {
            next();
            return;
        }
        const token = req.headers['authorization']?.split(' ')[1];
        const secret = process?.env.JWT_SECRET
        const data: any = jwt.verify(token, secret)
        req.user = {
            id: +data.id,
            fullName: data.fullName,
            username: data.username,
            password: "",
            address: "",
            phone: "",
            accountType: data.accountType,
            avatar: "",
            roleId: data.roleId,
            role: data.role,
            sumCart: 0
        }
        next();
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(401).json({
            data: null,
            message: "Token invalid or expires"
        })
    }

}
export {
    checkValidToken
}