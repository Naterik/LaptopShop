import express, { Express } from "express"
import 'dotenv/config'
import { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from "controllers/user.controller";
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from "controllers/admin/admin.controller";
import multer from "multer";
import fileUploadMiddleware from "src/middleware/multer";
const upload = multer({ dest: 'uploads/' })
const router = express.Router();
const webRoutes = (app: Express) => {
    router.get("/", getHomePage)

    router.get("/admin", getDashboardPage)
    router.get("/admin/user", getAdminUserPage)
    router.get("/admin/create-user", getCreateUserPage)
    router.post("/admin/create-user", fileUploadMiddleware("avatar"), postCreateUser);
    router.post("/admin/delete-user/:id", postDeleteUser)
    router.get("/admin/detail/:id", getViewUser)
    router.post("/admin/update-user", fileUploadMiddleware("avatar"), postUpdateUser)

    router.get("/admin/order", getAdminOrderPage)
    router.get("/admin/product", getAdminProductPage)
    app.use("/", router);//bắt đầu url với đường link/

}
export default webRoutes


