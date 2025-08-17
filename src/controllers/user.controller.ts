
import { Request, Response } from "express"
import { getAllUsers, handleCreateUser } from "services/user.services"
const getHomePage = async (req: Request, res: Response) => {
    const user = await getAllUsers();
    return res.render("home", {
        users: user
    })
}

const getCreateUserPage = (req: Request, res: Response) => {
    return res.render("create-user")
}

const getTest = (req: Request, res: Response) => {
    return res.render("test")
}

const postCreateUser = async (req: Request, res: Response) => {
    const { name, email, address } = req.body;
    await handleCreateUser(name, email, address)
    return res.redirect("/")
}

export { getHomePage, getCreateUserPage, postCreateUser, getTest }