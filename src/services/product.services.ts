import { prisma } from 'config/client';

const handleCreateProduct = async (name: string, price: string, detailDesc: string, shortDesc: string, quantity: number, factory: string, target: string, image: string) => {
    try {
        const product = await prisma.product.create({
            data: {
                name,
                price,
                detailDesc,
                shortDesc,
                quantity: +quantity,
                factory,
                target,
                image,
                sold: 1,
            },
        })
        return product;
    } catch (e) {
        throw (e)
    }
}

const getAllProduct = async () => {
    try {
        const product = await prisma.product.findMany()
        return product
    } catch (e) {
        throw (e)
    }
}

export { handleCreateProduct, getAllProduct }