import { prisma } from "config/client"
const getProducts = async () => {
    return await prisma.product.findMany();
}

const getDetailProduct = async (id: number) => {
    return await prisma.product.findFirst({ where: { id } })
}

const addProductToCart = async (quantity: number, productId: number, user: Express.User) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id,
        },
    })
    const product = await prisma.product.findUnique({ where: { id: productId } })
    if (cart) {
        const updateCart = await prisma.cart.update({
            where: { userId: user.id },
            data: {
                sum: quantity,
            },
        })
        return updateCart
    } else {
        const createCart = await prisma.cart.create({
            data: {
                sum: quantity,
                userId: user.id,
                cartDetails: {
                    create: [
                        {
                            quantity: quantity,
                            price: product?.price,
                            productId: productId,
                        },
                    ]
                }
            },
            include: {
                cartDetails: true,
            },
        })
        return createCart
    }
}

export { getProducts, getDetailProduct, addProductToCart }