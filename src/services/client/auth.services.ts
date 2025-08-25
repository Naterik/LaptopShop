import { prisma } from "config/client"
import { ACCOUNT_TYPE } from "config/constant"
import { comparePassword, hashPassword } from "config/password"


const handleRegister = async (email: string, username: string, password: string) => {
    const newPassword = await hashPassword(password);
    const userRole = await prisma.role.findUnique({ where: { name: "USER" } })
    if (userRole) {
        const register = await prisma.user.create({
            data: {
                fullName: email,
                password: newPassword,
                username,
                accountType: ACCOUNT_TYPE.SYSTEM,
                roleId: userRole.id
            }
        })
        return register
    } else {
        throw new Error("User k co role")
    }

}

const isExistEmail = async (email: string) => {
    const existEmail = await prisma.user.findUnique({
        where: { username: email }
    })
    if (existEmail) return true
    return false;
}

export { handleRegister, isExistEmail }