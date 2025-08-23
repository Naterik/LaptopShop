import express, { Express } from "express"
import 'dotenv/config'
<<<<<<< HEAD
import { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from "controllers/user.controller";
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from "controllers/admin/admin.controller";
import multer from "multer";
import fileUploadMiddleware from "src/middleware/multer";
const upload = multer({ dest: 'uploads/' })
=======
import { getCreateUserPage, getHomePage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from "controllers/user.controller";
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from "controllers/admin/admin.controller";
>>>>>>> d8091bccb704530fa930873bca1aa015b2e91812
const router = express.Router();
const webRoutes = (app: Express) => {
    router.get("/", getHomePage)

<<<<<<< HEAD
    router.get("/admin", getDashboardPage)
    router.get("/admin/user", getAdminUserPage)
    router.get("/admin/create-user", getCreateUserPage)
    router.post("/admin/create-user", fileUploadMiddleware("avatar"), postCreateUser);
    router.post("/admin/delete-user/:id", postDeleteUser)
    router.get("/admin/detail/:id", getViewUser)
    router.post("/admin/update-user", fileUploadMiddleware("avatar"), postUpdateUser)

=======
    router.post("/handle-delete-user/:id", postDeleteUser)
    router.get("/handle-view-user/:id", getViewUser)
    router.post("/handle-update-user", postUpdateUser)

    router.get("/admin", getDashboardPage)
    router.get("/admin/user", getAdminUserPage)
    router.get("/admin/user/create-user", getCreateUserPage)
    router.post("/handle-create-user", postCreateUser);
>>>>>>> d8091bccb704530fa930873bca1aa015b2e91812
    router.get("/admin/order", getAdminOrderPage)
    router.get("/admin/product", getAdminProductPage)
    app.use("/", router);//bắt đầu url với đường link/

}
export default webRoutes


