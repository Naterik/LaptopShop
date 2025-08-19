
import { Request, Response } from "express"
import { getAllRoles, getAllUsers, handleCreateUser, handleDeleteUser, handleUpdateUser, handleViewUser } from "services/user.services"
const getHomePage = async (req: Request, res: Response) => {
    const user = await getAllUsers();
    return res.render("home", {
        users: user
    })
}

const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRoles();
    return res.render("admin/user/create-user", { roles })
}

const postCreateUser = async (req: Request, res: Response) => {
    const { fullName, username, address, phone, accountType, role } = req.body;
    const avatar = req?.file?.filename ?? null;
    await handleCreateUser(fullName, username, address, avatar, phone, accountType, role)
    return res.redirect("user")
}

const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    await handleDeleteUser(id);
    return res.redirect("/")
}
const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userById = await handleViewUser(id);
    return res.render("view-user", {
        id: +id,
        user: userById
    })
}
const postUpdateUser = async (req: Request, res: Response) => {
    const { fullName, email, address, id } = req.body;
    await handleUpdateUser(fullName, email, address, id)
    return res.redirect("/")
}


export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser }