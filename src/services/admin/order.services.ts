import { prisma } from "config/client"

const getAllOrder = async () => {
    return await prisma.order.findMany({ include: { user: true } });
}

const handleGetOrderDetail = async (orderId: number) => {
    return await prisma.orderDetail.findMany({ where: { orderId }, include: { product: true } })
}

export { getAllOrder, handleGetOrderDetail }