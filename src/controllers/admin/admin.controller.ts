
import { Request, Response } from "express"
import { getAllUsers } from "services/user.services"
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
const getAdminProductPage = (req: Request, res: Response) => {
    res.render("admin/product/show")
}


export { getDashboardPage, getAdminUserPage, getAdminOrderPage, getAdminProductPage }