import { prisma } from "config/client"
const getProducts = async () => {
    return await prisma.product.findMany();
}
const getDetailProduct = async (id: number) => {
    return await prisma.product.findFirst({ where: { id } })
}
const showCartDetailById = async (userId: number) => {
    const cart = await prisma.cart.findUnique({ where: { userId } })
    if (cart) {
        const cartDetail = await prisma.cartDetail.findMany(
            {
                where: { cartId: cart.id },
                include: { product: true }
            });
        return cartDetail
    }
    return []
}
const getCart = async (id: string) => {
    const cart = await prisma.cart.findFirst({ where: { userId: +id } })
    return cart?.sum || 0
}
const addProductToCart = async (quantity: number, productId: number, user: Express.User) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id,
        },
    })
    const product = await prisma.product.findUnique({ where: { id: productId } })
    if (cart) {
        await prisma.cart.update({
            where: {
                id: cart.id
            },
            data: {
                sum: {
                    increment: quantity
                }
            }
        })
        const currentCartDetail = await prisma.cartDetail.findFirst({ where: { cartId: cart.id, productId: productId } })
        await prisma.cartDetail.upsert({
            where: {
                id: currentCartDetail?.id ?? 0
            },
            update: {
                quantity: { increment: quantity }
            },
            create: {
                quantity: quantity,
                productId: productId,
                cartId: cart?.id,
                price: product?.price
            }
        })
    } else {
        await prisma.cart.create({
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
    }
}

const deleteProductInCart = async (cartDetailId: number, userId: number, sumCart: number) => {

    await prisma.cartDetail.delete({ where: { id: cartDetailId } })
    if (sumCart === 1) {

        await prisma.cart.delete({ where: { userId } })
    }
    else {
        await prisma.cart.update({
            where: {
                userId: userId,
            },
            data: {
                sum: { decrement: 1 },
            },
        })
    }

}

const updateCartDetailBeforeCheckOut = async (data: { id: string, quantity: string }[]) => {
    data.forEach(async cart => {
        await prisma.cartDetail.update({
            where: {
                id: +cart?.id
            }, data: {
                quantity: +cart?.quantity
            }
        })
    });
}

export { getProducts, getDetailProduct, addProductToCart, getCart, showCartDetailById, deleteProductInCart, updateCartDetailBeforeCheckOut }