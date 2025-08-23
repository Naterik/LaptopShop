import { prisma } from "config/client"
<<<<<<< HEAD
import { hashPassword } from "services/user.services";
import { ACCOUNT_TYPE } from "config/constant";
=======
>>>>>>> d8091bccb704530fa930873bca1aa015b2e91812

const initDatabase = async () => {
    const countUser = await prisma.user.count()
    const countRole = await prisma.role.count();
<<<<<<< HEAD
    const defaultPassword = await hashPassword("123456")

    if (countUser === 0) {
        const adminRole = await prisma.role.findFirst({ where: { name: "ADMIN" } })
        if (adminRole) {
            await prisma.user.createMany({
                data: [
                    {
                        username: "khuong@gmail.com",
                        fullName: "Khuong",
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id
                    },
                    {
                        username: "admin@gmail.com",
                        fullName: "Admin",
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id
                    },
                ]
            })
        }

    }
    if (countRole === 0) {
=======
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
>>>>>>> d8091bccb704530fa930873bca1aa015b2e91812
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
<<<<<<< HEAD

    if (countRole !== 0 && countUser !== 0) {
=======
    else {
>>>>>>> d8091bccb704530fa930873bca1aa015b2e91812
        console.log('Already have database')
    }

}

export default initDatabase