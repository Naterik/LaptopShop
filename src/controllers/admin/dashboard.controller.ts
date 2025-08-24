
import { Request, Response } from "express"
import { getAllProduct } from "services/admin/product.services"
import { getAllUsers } from "services/admin/user.services"
const getDashboardPage = (req: Request, res: Response) => {
    res.render("admin/dashboard/show")
}
const getAdminUserPage = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    res.render("admin/user/show", {
        users
    })
}
const getAdminOrderPage = (req: Request, res: Response) => {
    res.render("admin/order/show")
}
const getAdminProductPage = async (req: Request, res: Response) => {
    const products = await getAllProduct();
    res.render("admin/product/show", { products })
}


export { getDashboardPage, getAdminUserPage, getAdminOrderPage, getAdminProductPage }