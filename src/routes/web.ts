import express, { Express } from "express"
import 'dotenv/config'
import { getCreateUserPage, getHomePage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from "controllers/user.controller";
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from "controllers/admin/admin.controller";
const router = express.Router();
const webRoutes = (app: Express) => {
    router.get("/", getHomePage)

    router.post("/handle-delete-user/:id", postDeleteUser)
    router.get("/handle-view-user/:id", getViewUser)
    router.post("/handle-update-user", postUpdateUser)

    router.get("/admin", getDashboardPage)
    router.get("/admin/user", getAdminUserPage)
    router.get("/admin/user/create-user", getCreateUserPage)
    router.post("/handle-create-user", postCreateUser);
    router.get("/admin/order", getAdminOrderPage)
    router.get("/admin/product", getAdminProductPage)
    app.use("/", router);//bắt đầu url với đường link/

}
export default webRoutes


