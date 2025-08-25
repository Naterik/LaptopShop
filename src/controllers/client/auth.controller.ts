
import { Request, Response } from "express"
import { handleRegister } from "services/client/auth.services"
import { TUserSchema, UserSchema } from "src/validation/user.schema"
const getLoginPage = (req: Request, res: Response) => {
    const { session } = req as any
    const messages = session?.messages ?? []
    return res.render("client/home/login", { messages })
}

const getRegisterPage = (req: Request, res: Response) => {
    const errors = [];
    const oldData = { fullName: "", username: "", password: "", confirmPassword: "" }
    return res.render("client/home/register", { errors, oldData })
}

const postRegister = async (req: Request, res: Response) => {
    const { fullName, username, password, confirmPassword } = req.body as TUserSchema
    const validate = await UserSchema.safeParseAsync(req.body);
    if (!validate.success) {
        const errorsZod = validate.error.issues;
        const errors = errorsZod.map(error => `${error.message} (${error.path[0]})`)
        const oldData = { fullName, username, password, confirmPassword }
        return res.render("client/home/register", { errors, oldData })
    } else {
        await handleRegister(fullName, username, password)
        return res.redirect("/login")
    }
}

export { getLoginPage, getRegisterPage, postRegister }