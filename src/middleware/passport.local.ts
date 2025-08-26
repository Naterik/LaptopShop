import { prisma } from "config/client";
import { comparePassword } from "config/password";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByRoleId } from "services/client/auth.services";

const configPassportLocal = () => {
    passport.use(new LocalStrategy({ passReqToCallback: true }, async function verify(req, username, password, callback) {
        const { session } = req as any
        if (session?.messages) {
            session.messages = []
        }
        const user = await prisma.user.findUnique({ where: { username } })
        if (!user) {
            return callback(null, false, { message: `Username/password invalid.` });
        }
        const checkPassword = await comparePassword(password, user.password);
        if (!checkPassword) {
            return callback(null, false, { message: 'Username/password invalid.' })
        }
        return callback(null, user as any)
    }));

    // lưu thông tin có thể hiên thị cho người dùng khi tạo 1 session
    passport.serializeUser(function (user: any, cb) {
        return cb(null, { id: user.id, username: user.username });
    });
    // lấy dữ liệu dựa vào id mà người dùng lưu trong session thông qua id 
    passport.deserializeUser(async function (user: any, cb) {
        const { id, username } = user
        const userInDb: any = await getUserByRoleId(id)
        return cb(null, { ...userInDb });
    });
}

export default configPassportLocal