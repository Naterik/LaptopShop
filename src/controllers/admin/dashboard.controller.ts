
import { Request, Response } from "express"
import { countDashboard } from "services/admin/dashboard.services"
import { countTotalOrderPage, getAllOrder } from "services/admin/order.services"
import { countTotalProductPage, getAllProduct } from "services/admin/product.services"
import { countTotalUserPages, getAllUsers } from "services/admin/user.services"
const getDashboardPage = async (req: Request, res: Response) => {
    const info = await countDashboard()
    res.render("admin/dashboard/show", { info })
}
const getAdminUserPage = async (req: Request, res: Response) => {
    const { page } = req.query
    let currentPage = page ? +page : 1
    if (currentPage <= 0) currentPage = 1
    const users = await getAllUsers(currentPage);
    const totalPages = await countTotalUserPages();
    res.render("admin/user/show", {
        users,
        totalPages: +totalPages,
        page: +currentPage
    })
}
const getAdminOrderPage = async (req: Request, res: Response) => {
    const { page } = req.query;
    let currentPage = page ? +page : 1
    if (currentPage <= 0) currentPage = 1
    const totalPages = await countTotalOrderPage()
    const orders = await getAllOrder(currentPage)
    res.render("admin/order/show", { orders, page: +currentPage, totalPages: +totalPages })
}
const getAdminProductPage = async (req: Request, res: Response) => {
    const { page } = req.query;
    let currentPage = page ? +page : 1
    if (currentPage < 0) currentPage = 1;
    const totalPages = await countTotalProductPage();
    const products = await getAllProduct(currentPage);
    res.render("admin/product/show", {
        products,
        page: currentPage,
        totalPages: +totalPages
    })
}




export { getDashboardPage, getAdminUserPage, getAdminOrderPage, getAdminProductPage }