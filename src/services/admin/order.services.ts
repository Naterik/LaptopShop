import { prisma } from "config/client"
import { TOTAL_ITEMS_PER_PAGE } from "config/constant";

const getAllOrder = async (page: number) => {
    const totalPage = TOTAL_ITEMS_PER_PAGE
    const pageSize = (page - 1) * totalPage
    return await prisma.order.findMany({
        skip: pageSize,
        take: totalPage,
        include: {
            user: true
        }
    });
}

const countTotalOrderPage = async () => {
    const pageSize = TOTAL_ITEMS_PER_PAGE;
    const totalItems = await prisma.order.count();
    const totalPages = Math.ceil(totalItems / pageSize);
    return totalPages;
}

const handleGetOrderDetail = async (orderId: number) => {
    return await prisma.orderDetail.findMany({ where: { orderId }, include: { product: true } })
}

export { getAllOrder, handleGetOrderDetail, countTotalOrderPage }