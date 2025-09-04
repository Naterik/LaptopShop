import { prisma } from "config/client"
import { comparePassword } from "config/password";
import jwt from "jsonwebtoken"
import "dotenv/config"
const handleGetAllUser = async () => {
    return prisma.user.findMany();
}

const handleGetUserById = async (userId: number) => {
    return await prisma.user.findUnique({ where: { id: userId } })
}

const handlePutUserByIdAPI = async (id: number, fullName: string, username: string) => {
    return await prisma.user.update({
        where: {
            id
        },
        data: {
            fullName, username
        }
    })
}

const handleLoginUser = async (username: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { username }, include: { role: true } })
    if (!user) {
        throw new Error("Username not exist")
    }
    const checkPassword = await comparePassword(password, user.password)
    if (!checkPassword) {
        throw new Error("Invalid password")
    }
    const payload = {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        accountType: user.accountType,
        roleId: user.roleId,
        role: user.role
    }
    const secret = process.env.JWT_SECRET
    const expiresIn: any = process.env.JWT_EXPIRES_IN
    const access_token = jwt.sign(payload, secret, {
        expiresIn: expiresIn
    });
    return access_token
}

const handleCreateUserAPI = async (fullName: string, email: string,
    password: string, confirmPassword: string) => {
    const createUser = await prisma.user.create({ data: { fullName, username: email, password, roleId: 2, phone: "", address: "", avatar: '', accountType: "SYSTEM" } })
    return createUser
}

export { handleGetAllUser, handleGetUserById, handlePutUserByIdAPI, handleLoginUser, handleCreateUserAPI }