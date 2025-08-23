
import { Request, Response } from "express"
import { getAllRoles, getAllUsers, handleCreateUser, handleDeleteUser, handleUpdateUser, handleViewUser } from "services/user.services"
const getHomePage = async (req: Request, res: Response) => {
    return res.render("client/home/show")
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
    return res.redirect("user")
}
const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const roles = await getAllRoles();
    const user = await handleViewUser(id);
    return res.render("admin/user/detail", {
        id: +id,
        user,
        roles
    })
}
const postUpdateUser = async (req: Request, res: Response) => {
    const { fullName, address, id, role, phone } = req.body;
    const avatar = req?.file?.filename ?? undefined
    await handleUpdateUser(id, fullName, address, avatar, phone, role)
    return res.redirect("user")

}


export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser }