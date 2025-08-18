import { PrismaClient, Prisma } from '@prisma/client'
import { prisma } from 'config/client';
const handleCreateUser = async (name: string, email: string, address: string) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                address: address
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
const handleUpdateUser = async (name: string, email: string, address: string, id: string) => {
    try {
        const updateUser = await prisma.user.update({
            where: {
                id: +id
            },
            data: {
                name: name,
                email: email,
                address: address
            },
        })
        return updateUser
    } catch (err) {
        throw (err)
    }
}

export { handleCreateUser, getAllUsers, handleDeleteUser, handleViewUser, handleUpdateUser }