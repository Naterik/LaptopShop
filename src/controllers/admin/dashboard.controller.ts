
import { Request, Response } from "express"
import { countDashboard } from "services/admin/dashboard.services"
import { getAllOrder } from "services/admin/order.services"
import { getAllProduct } from "services/admin/product.services"
import { getAllUsers } from "services/admin/user.services"
const getDashboardPage = async (req: Request, res: Response) => {
    const info = await countDashboard()
    res.render("admin/dashboard/show", { info })
}
const getAdminUserPage = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    res.render("admin/user/show", {
        users
    })
}
const getAdminOrderPage = async (req: Request, res: Response) => {
    const orders = await getAllOrder()
    res.render("admin/order/show", { orders })
}
const getAdminProductPage = async (req: Request, res: Response) => {
    const products = await getAllProduct();
    res.render("admin/product/show", { products })
}




export { getDashboardPage, getAdminUserPage, getAdminOrderPage, getAdminProductPage }