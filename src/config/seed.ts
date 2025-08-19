import { prisma } from "config/client"
import { hashPassword } from "services/user.services";
import { ACCOUNT_TYPE } from "config/constant";

const initDatabase = async () => {
    const countUser = await prisma.user.count()
    const countRole = await prisma.role.count();
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

    if (countRole !== 0 && countUser !== 0) {
        console.log('Already have database')
    }

}

export default initDatabase