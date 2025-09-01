import { Request, Response } from "express"
import { handleGetOrderDetail } from "services/admin/order.services"
const getAdminOrderDetailPage = async (req: Request, res: Response) => {
    const { id } = req.params
    const orderDetails = await handleGetOrderDetail(+id)
    return res.render("admin/order/detail-order", { orderDetails })
}

export { getAdminOrderDetailPage }