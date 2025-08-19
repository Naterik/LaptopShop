import { PrismaClient, Prisma } from '@prisma/client'
import { prisma } from 'config/client';
const handleCreateUser = async (fullName: string, email: string, address: string) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                fullName: fullName,
                username: email,
                address: address,
                password: "",
                accountType: "",
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
const handleUpdateUser = async (fullName: string, email: string, address: string, id: string) => {
    try {
        const updateUser = await prisma.user.update({
            where: {
                id: +id
            },
            data: {
                fullName,
                username: email,
                address: address,
                password: "",
                accountType: "",
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

export { handleCreateUser, getAllUsers, handleDeleteUser, handleViewUser, handleUpdateUser, getAllRoles }