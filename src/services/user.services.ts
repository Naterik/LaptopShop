
import { PrismaClient, Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'
const saltRounds = 10;
import { prisma } from 'config/client';
import { ACCOUNT_TYPE } from 'config/constant';

const hashPassword = async (plainText: string) => {
    const hash = await bcrypt.hash(plainText, saltRounds)
    return hash
}

const handleCreateUser = async (fullName: string, username: string, address: string, avatar: string, phone: string, accountType: string, role: string) => {
    try {
        const defaultPassword = await hashPassword("123456");
        const newUser = await prisma.user.create({
            data: {
                fullName,
                username,
                address,
                password: defaultPassword,
                accountType: ACCOUNT_TYPE.SYSTEM,
                avatar,
                phone,
                roleId: +role,
            }
        })
        return newUser;
    } catch (err) {
        console.log(err);
        return [];
    }
}
const getAllUsers = async () => {
    try {
        const users = await prisma.user.findMany()
        return users
    } catch (err) {
        console.log(err);
        return [];
    }

}
const handleDeleteUser = async (id: string) => {
    try {
        const user = await prisma.user.delete({
            where: {
                id: +id,
            },
        })
        return user
    } catch (err) {
        throw (err)
    }
}
const handleViewUser = async (id: string) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: +id,
            },
        })
        return user
    } catch (err) {
        throw (err)
    }

}
const handleUpdateUser = async (id: string, fullName: string, address: string, avatar: string, phone: string, role: string) => {
    try {

        const updateUser = await prisma.user.updateMany({
            where: {
                id: +id
            },
            data: {
                fullName,
                address,
                phone,
                roleId: +role,
                ...(avatar !== undefined && { avatar: avatar })
            },
        })
        return updateUser
    } catch (err) {
        throw (err)
    }
}

const getAllRoles = async () => {
    try {
        const roles = await prisma.role.findMany();
        return roles
    } catch (err) {
        throw (err)

    }

}

export { handleCreateUser, getAllUsers, handleDeleteUser, handleViewUser, handleUpdateUser, getAllRoles, hashPassword }