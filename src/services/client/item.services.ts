import { prisma } from "config/client"
const getProducts = async (page: number, totalPage: number) => {
    const pageSize = (page - 1) * totalPage
    return await prisma.product.findMany({ skip: pageSize, take: totalPage });
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

    const currentDetail = await prisma.cartDetail.delete({ where: { id: cartDetailId } })
    if (sumCart === 1) {

        await prisma.cart.delete({ where: { userId } })
    }
    else {
        await prisma.cart.update({
            where: {
                userId: userId,
            },
            data: {
                sum: { decrement: currentDetail.quantity },
            },
        })
    }

}
const updateCartDetailBeforeCheckOut = async (data: { id: string, quantity: string }[], cartId: string) => {
    let quantity = 0;
    data.forEach(async cart => {
        quantity += +(cart.quantity)
        await prisma.cartDetail.update({
            where: {
                id: +cart?.id
            }, data: {
                quantity: +cart?.quantity
            }
        })

    });
    await prisma.cart.update({
        where: {
            id: +cartId
        },
        data: {
            sum: quantity
        }
    })
}
const handlePlaceOrder = async (userId: number, receiverName: string, receiverAddress: string, receiverPhone: string, totalPrice: string) => {
    try {
        await prisma.$transaction(async (tx) => {
            const cart = await tx.cart.findUnique({
                where: { userId },
                include: {
                    cartDetails: true
                }
            })
            if (cart) {
                const cartDetail = cart.cartDetails
                const createOrderDetail = cartDetail.map((item) => ({
                    price: item.price,
                    quantity: item.quantity,
                    productId: item.productId,

                })) ?? []
                const order = await tx.order.create({
                    data: {
                        totalPrice: +totalPrice,
                        receiverAddress,
                        receiverName,
                        receiverPhone,
                        paymentMethod: "COD",
                        paymentStatus: "PAYMENT_UNPAID",
                        paymentRef: null,
                        userId,
                        orderDetails: {
                            create: createOrderDetail
                        }
                    }
                })

                await tx.cartDetail.deleteMany({
                    where: { cartId: cart.id }
                })
                await tx.cart.delete({ where: { userId } })

                for (let i = 0; i < cartDetail.length; i++) {
                    const productId = cartDetail[i].productId;
                    const findProduct = await tx.product.findUnique({
                        where: {
                            id: productId
                        }
                    })
                    if (!findProduct || findProduct.quantity < cartDetail[i]?.quantity) {
                        throw new Error(`Product ${findProduct.name} not exist or out of stock  `)
                    }
                    await tx.product.update({
                        where: {
                            id: productId
                        },
                        data: {
                            sold: {
                                increment: cartDetail[i].quantity
                            },
                            quantity: {
                                decrement: cartDetail[i].quantity
                            }
                        }
                    })
                }
            }
        })
        return "";
    } catch (error) {
        return error.message
    }
}
const showHistoryOrderDetail = async (userId: number) => {
    return await prisma.order.findMany({
        where: { userId },
        include: {
            orderDetails:
            {
                include:
                    { product: true }
            }
        }
    })
}
const countTotalProductPageClient = async (pageSize: number) => {
    const totalItems = await prisma.product.count();
    const totalPage = Math.ceil(totalItems / pageSize);
    return totalPage
}


export { getProducts, getDetailProduct, addProductToCart, getCart, showCartDetailById, deleteProductInCart, updateCartDetailBeforeCheckOut, handlePlaceOrder, showHistoryOrderDetail, countTotalProductPageClient }