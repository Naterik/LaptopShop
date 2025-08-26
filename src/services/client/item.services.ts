import { prisma } from "config/client"
const getProducts = async () => {
    return await prisma.product.findMany();
}

const getDetailProduct = async (id: number) => {
    return await prisma.product.findFirst({ where: { id } })
}

export { getProducts, getDetailProduct }