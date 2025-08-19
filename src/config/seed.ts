import { prisma } from "config/client"

const initDatabase = async () => {
    const countUser = await prisma.user.count()
    const countRole = await prisma.role.count();
    if (countUser === 0) {
        await prisma.user.createMany({
            data: [
                {
                    username: "khuong",
                    password: "123",
                    accountType: "SYSTEM"
                },
                {
                    username: "khuong123123",
                    password: "111",
                    accountType: "SYSTEM"
                },
            ]
        })
    } else if (countRole === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "Full access rights"
                },
                {
                    name: "USER",
                    description: "Normal user"
                }
            ]
        })
    }
    else {
        console.log('Already have database')
    }

}

export default initDatabase