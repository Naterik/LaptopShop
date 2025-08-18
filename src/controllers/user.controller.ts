
import { Request, Response } from "express"
import { getAllUsers, handleCreateUser, handleDeleteUser, handleUpdateUser, handleViewUser } from "services/user.services"
const getHomePage = async (req: Request, res: Response) => {
    const user = await getAllUsers();
    return res.render("home", {
        users: user
    })
}

const getCreateUserPage = (req: Request, res: Response) => {
    return res.render("create-user")
}

const postCreateUser = async (req: Request, res: Response) => {
    const { name, email, address } = req.body;
    await handleCreateUser(name, email, address)
    return res.redirect("/")
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
    const { name, email, address, id } = req.body;
    await handleUpdateUser(name, email, address, id)
    return res.redirect("/")
}


export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser }