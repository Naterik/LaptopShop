
import { NextFunction, Request, Response } from "express"
import { handleRegister } from "services/client/auth.services"
import { TUserSchema, UserSchema } from "src/validation/user.schema"

const getLoginPage = (req: Request, res: Response) => {
    const { session } = req as any
    const messages = session?.messages ?? []
    return res.render("client/auth/login", { messages })
}

const postLogout = (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
};

const getRegisterPage = (req: Request, res: Response) => {
    const errors = [];
    const oldData = { fullName: "", username: "", password: "", confirmPassword: "" }
    return res.render("client/auth/register", { errors, oldData })
}

const postRegister = async (req: Request, res: Response) => {
    const { fullName, username, password, confirmPassword } = req.body as TUserSchema
    const validate = await UserSchema.safeParseAsync(req.body);
    if (!validate.success) {
        const errorsZod = validate.error.issues;
        const errors = errorsZod.map(error => `${error.message} (${error.path[0]})`)
        const oldData = { fullName, username, password, confirmPassword }
        return res.render("client/auth/register", { errors, oldData })
    } else {
        await handleRegister(fullName, username, password)
        return res.redirect("/login")
    }
}

const getSuccessRedirectPage = (req: Request, res: Response) => {
    const { user } = req as any
    if (user?.role?.name === "ADMIN") {
        return res.redirect("/admin")
    } else {
        return res.redirect("/")
    }

}

export { getLoginPage, getRegisterPage, postRegister, getSuccessRedirectPage, postLogout }